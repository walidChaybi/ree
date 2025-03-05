import { CONFIG_GET_INFORMATIONS_FICHES_REPERTOIRE } from "@api/configurations/etatCivil/repertoireCivil/GetInformationsFicheRepertoire";
import { Orientation } from "@model/composition/enum/Orientation";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { TypePacsRcRca } from "@model/etatcivil/enum/TypePacsRcRca";
import { FichePacs, IFichePacsDto } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca, IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import { MimeType } from "../../../../../../ressources/MimeType";
import { usePostDocumentsReponseApi } from "../../../DocumentReponseHook";
import { useCertificatPacsRcRcaApiHook } from "../../../composition/CompositionCertificatPacsRcRca";
import { TFiche, mapRcRca } from "../../../repertoires/MappingRepertoires";
import { IResultGenerationInscriptions, RESULTAT_VIDE } from "../../generationUtils";
import { useGestionCertificatCourant as useGestionPacsRcRcaCourant } from "./GenerationCertificatGestionPacsRcRcaCourantHook";
import {
  getNomDocument,
  getTypeDocument,
  getTypeFiche,
  useConstructionCertificatPacsRcRca
} from "./GenerationCertificatGestionTypeCertificat";

export function useGenerationCertificatPACSOuRCOuRCAHook(
  typeCertificat: TypePacsRcRca,
  requete?: IRequeteTableauDelivrance,
  listePacsRcRca?: IResultatRMCInscription[],
  inscriptionsRcRadiation?: IInscriptionRc
): IResultGenerationInscriptions | undefined {
  const [certificatComposition, setCertificatComposition] = useState<TypeCertificatComposition>();
  const [listePacsRcRcaATraiter, setListePacsRcRcaATraiter] = useState<IResultatRMCInscription[]>();
  const [documentsReponsePourStockage, setDocumentsReponsePourStockage] = useState<IDocumentReponse[]>(); // Ne contiendra qu'un seul IDocumentReponse (on stock les doc un par un)

  const [fichePacsRcRcaTraiter, setFichePacsRcRcaTraiter] = useState<TFiche[]>([]);

  const [uuidDocumentsGeneres, setUuidDocumentsGeneres] = useState<string[]>([]);

  const [informationsPacsRcRca, setInformationsPacsRcRca] = useState<FichePacs | FicheRcRca>();

  // Résultat du hook
  const [resultGenerationCertificat, setResultGenerationCertificat] = useState<IResultGenerationInscriptions>();

  // 0- récupération du pacs, rc ou rca à traiter
  const { pacsRcRcaCourant } = useGestionPacsRcRcaCourant(
    setListePacsRcRcaATraiter,
    setResultGenerationCertificat,
    listePacsRcRcaATraiter,
    requete,
    listePacsRcRca,
    uuidDocumentsGeneres,
    fichePacsRcRcaTraiter
  );

  // 1- Récupération des informations sur le PACS/RC/RCA courant
  const { appelApi } = useFetchApi(CONFIG_GET_INFORMATIONS_FICHES_REPERTOIRE);
  useEffect(() => {
    if (!(typeCertificat && pacsRcRcaCourant?.idInscription)) return;

    appelApi({
      parametres: { path: { typeFiche: getTypeFiche(typeCertificat)?.toLowerCase() ?? "", idFiche: pacsRcRcaCourant?.idInscription } },
      apresSucces: informationsFicheRepertoire => {
        let ficheRepertoire: FichePacs | FicheRcRca | null = null;
        switch (getTypeFiche(typeCertificat)) {
          case TypeFiche.RC:
            ficheRepertoire = mapRcRca(informationsFicheRepertoire as IFicheRcDto);
            break;
          case TypeFiche.RCA:
            ficheRepertoire = mapRcRca(informationsFicheRepertoire as IFicheRcaDto);
            break;
          case TypeFiche.PACS:
            ficheRepertoire = FichePacs.depuisDto(informationsFicheRepertoire as IFichePacsDto);
            break;
        }
        if (ficheRepertoire === null) {
          console.error("Certaines données obligatoires de la fiche RC/RCA/PACS sont absentes ou invalides.");
        } else {
          setInformationsPacsRcRca(ficheRepertoire);
        }
      },
      apresErreur: (error: any) => {
        logError({
          messageUtilisateur: "Impossible de récupérer les informations du répertoire",
          error
        });
      }
    });
  }, [typeCertificat, pacsRcRcaCourant?.idInscription]);

  const certificatPacsRcRca = useConstructionCertificatPacsRcRca(typeCertificat, informationsPacsRcRca, requete, inscriptionsRcRadiation);

  useEffect(() => {
    if (requete?.titulaires && requete.titulaires?.length > 0 && informationsPacsRcRca) {
      setCertificatComposition(certificatPacsRcRca);
    } else if (informationsPacsRcRca !== undefined) {
      setResultGenerationCertificat(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationsPacsRcRca]);

  // 2- Création du certificat de situation: appel api composition
  //    (récupération du document en base64)
  const compositionData = useCertificatPacsRcRcaApiHook(typeCertificat, certificatComposition);

  // 3- Création de l'objet paramètre pour l'api de stockage du document
  useEffect(() => {
    if (compositionData) {
      setDocumentsReponsePourStockage([
        {
          contenu: compositionData.contenu,
          nom: getNomDocument(typeCertificat),
          mimeType: MimeType.APPLI_PDF,
          typeDocument: getTypeDocument(typeCertificat),
          nbPages: compositionData.nbPages,
          orientation: Orientation.PORTRAIT,
          idPacs: recupererIdByTypeRcRcaPacs(TypePacsRcRca.PACS, pacsRcRcaCourant),
          idRc: recupererIdByTypeRcRcaPacs(TypePacsRcRca.RC, pacsRcRcaCourant),
          idRca: recupererIdByTypeRcRcaPacs(TypePacsRcRca.RCA, pacsRcRcaCourant)
        } as IDocumentReponse
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compositionData]);

  // 4- Stockage du document réponse une fois créé (le résultat est un tableau d'uuid qui ne doit contenir qu'un seul élément)
  const uuidDocumentsReponseStockes = usePostDocumentsReponseApi(requete?.idRequete, documentsReponsePourStockage);

  // 5- Maj des uuid des documents générés pour le renvoi du résultat
  //    "Dépilement" du premier élément de liste des PACs/RCs/RCAs à traiter
  useEffect(() => {
    if (informationsPacsRcRca && uuidDocumentsReponseStockes && uuidDocumentsReponseStockes.length > 0) {
      setUuidDocumentsGeneres([...uuidDocumentsGeneres, ...uuidDocumentsReponseStockes]);
      const fiches = fichePacsRcRcaTraiter;
      fiches.push(informationsPacsRcRca);
      setFichePacsRcRcaTraiter(fiches);
    }
    if (listePacsRcRcaATraiter) {
      // "Dépilement" du premier élément pour traiter le prochain PACS/RC/RCA
      listePacsRcRcaATraiter.shift();
      setListePacsRcRcaATraiter([...listePacsRcRcaATraiter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponseStockes]);

  return resultGenerationCertificat;
}

function recupererIdByTypeRcRcaPacs(type: TypePacsRcRca, pacsRcRcaCourant?: IResultatRMCInscription | undefined) {
  return pacsRcRcaCourant?.categorie?.toUpperCase() === type ? pacsRcRcaCourant.idInscription : null;
}
