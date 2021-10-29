import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../../model/composition/enum/Orientation";
import { TypeCertificatComposition } from "../../../../../../../model/composition/type/TypeCertificatCompoistion";
import { TypePacsRcRca } from "../../../../../../../model/etatcivil/enum/TypePacsRcRca";
import { IFichePacs } from "../../../../../../../model/etatcivil/pacs/IFichePacs";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IDocumentReponse } from "../../../../../../../model/requete/v2/IDocumentReponse";
import { IRequeteTableauDelivrance } from "../../../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MimeType } from "../../../../../../../ressources/MimeType";
import { useCertificatPacsRcRcaApiHook } from "../../../composition/CompositionCertificatPacsRcRca";
import { usePostDocumentsReponseApi } from "../../../DocumentReponseHook";
import { useInformationsRepertoireApiHook } from "../../../repertoires/RepertoireApiHook";
import {
  IResultGenerationPlusieursDocument,
  RESULTAT_VIDE
} from "../../generationUtils";
import { useGestionCertificatCourant as useGestionPacsRcRcaCourant } from "./GenerationCertificatGestionPacsRcRcaCourantHook";
import {
  construitCertificatPacsRcRca,
  getNomDocument,
  getTypeDocument,
  getTypeFiche
} from "./GenerationCertificatGestionTypeCertificat";

export function useGenerationCertificatPACSOuRCOuRCAHook(
  typeCertificat: TypePacsRcRca,
  requete?: IRequeteTableauDelivrance,
  listePacsRcRca?: IResultatRMCInscription[]
): IResultGenerationPlusieursDocument | undefined {
  const [certificatComposition, setCertificatComposition] =
    useState<TypeCertificatComposition>();
  const [listePacsRcRcaATraiter, setListePacsRcRcaATraiter] =
    useState<IResultatRMCInscription[]>();
  const [documentsReponsePourStockage, setDocumentsReponsePourStockage] =
    useState<IDocumentReponse[]>(); // Ne contiendra qu'un seul IDocumentReponse (on stock les doc un par un)

  const [uuidDocumentsGeneres, setUuidDocumentsGeneres] = useState<string[]>(
    []
  );

  // Résultat du hook
  const [resultGenerationCertificat, setResultGenerationCertificat] =
    useState<IResultGenerationPlusieursDocument>();

  // 0- récupération du pacs, rc ou rca à traiter
  const { pacsRcRcaCourant } = useGestionPacsRcRcaCourant(
    setListePacsRcRcaATraiter,
    setResultGenerationCertificat,
    listePacsRcRcaATraiter,
    requete,
    listePacsRcRca,
    uuidDocumentsGeneres
  );

  // 1- Récupération des informations sur le PACS courant
  const informationsPacsRcRca = useInformationsRepertoireApiHook(
    getTypeFiche(typeCertificat),
    pacsRcRcaCourant?.idInscription
  ) as IFichePacs | IFicheRcRca;

  useEffect(() => {
    if (
      requete &&
      requete.titulaires &&
      requete.titulaires.length > 0 &&
      informationsPacsRcRca
    ) {
      setCertificatComposition(
        construitCertificatPacsRcRca(
          typeCertificat,
          requete,
          informationsPacsRcRca
        )
      );
    } else if (informationsPacsRcRca !== undefined) {
      setResultGenerationCertificat(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationsPacsRcRca]);

  // 2- Création du certificat de situation: appel api composition
  //    (récupération du document en base64)
  const contenuComposition = useCertificatPacsRcRcaApiHook(
    typeCertificat,
    certificatComposition
  );

  // 3- Création de l'objet paramètre pour l'api de stockage du document
  useEffect(() => {
    if (contenuComposition) {
      setDocumentsReponsePourStockage([
        {
          contenu: contenuComposition,
          nom: getNomDocument(typeCertificat),
          mimeType: MimeType.APPLI_PDF,
          typeDocument: getTypeDocument(typeCertificat),
          nbPages: 1,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 4- Stockage du document réponse une fois créé (le résultat est un tableau d'uuid qui ne doit contenir qu'un seul élément)
  const uuidDocumentsReponseStockes = usePostDocumentsReponseApi(
    requete?.idRequete,
    documentsReponsePourStockage
  );

  // 5- Maj des uuid des documents générés pour le renvoi du résultat
  //    "Dépilement" du premier élément de liste des PACs/RCs/RCAs à traiter
  useEffect(() => {
    if (uuidDocumentsReponseStockes && uuidDocumentsReponseStockes.length > 0) {
      setUuidDocumentsGeneres([
        ...uuidDocumentsGeneres,
        ...uuidDocumentsReponseStockes
      ]);
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
