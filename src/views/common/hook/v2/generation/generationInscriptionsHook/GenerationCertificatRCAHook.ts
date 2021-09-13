import { useEffect, useState } from "react";
import {
  CertificatRCAComposition,
  ICertificatRCAComposition,
  NOM_DOCUMENT_CERTIFICAT_RCA
} from "../../../../../../model/composition/ICertificatRCAComposition";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { useCertificatRCAApiHook } from "../../composition/CompositionCertificatRCAHook";
import { usePostDocumentsReponseApi } from "../../DocumentReponseHook";
import { useInformationsRepertoireApiHook } from "../../repertoires/RepertoireApiHook";
import {
  IResultGenerationPlusieursDocument,
  RESULTAT_VIDE
} from "../generationUtils";
import {
  creationDocumentReponseInscription,
  sauvegardeContenuInscriptionSuivante,
  setResultGenerationCertificatInscription
} from "./GenerationInscriptionsUtils";
import { specificationRCA } from "./specificationInscriptions/specificationRCA";

export interface IElementsJasperCertificatRCA {
  anneeInscription?: string;
  numeroInscription?: string;
  decisionRecue?: string;
  interesseDecision?: string;
  paragrapheFin?: string;
  decisionExequatur?: string;
}

export function useGenerationCertificatRCAHook(
  requete?: IRequeteTableau,
  listeRCA?: IResultatRMCInscription[]
) {
  const [rca, setRca] = useState<IResultatRMCInscription>();

  const [
    certificatRCAComposition,
    setCertificatRCAComposition
  ] = useState<ICertificatRCAComposition>();

  const [
    documentsReponsePourStockage,
    setDocumentsReponsePourStockage
  ] = useState<IDocumentReponse[] | undefined>();

  const [
    contenuDocumentsComposition,
    setContenuDocumentsComposition
  ] = useState<string[]>([]);

  const [
    resultGenerationCertificatRCA,
    setResultGenerationCertificatRCA
  ] = useState<IResultGenerationPlusieursDocument>();

  useEffect(() => {
    if (requete && listeRCA && listeRCA.length > 0) {
      setRca(listeRCA[listeRCA.length - 1]);
    } else if (listeRCA && listeRCA.length === 0) {
      setResultGenerationCertificatRCA(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeRCA]);

  const informationsRCA = useInformationsRepertoireApiHook(
    TypeFiche.RCA,
    rca?.idInscription
  ) as IFicheRcRca;

  useEffect(() => {
    if (
      requete &&
      requete.titulaires &&
      requete.titulaires.length > 0 &&
      informationsRCA
    ) {
      const elementsJasper: IElementsJasperCertificatRCA = specificationRCA.getElementsJasper(
        informationsRCA
      );
      construitCertificatRCA(
        requete,
        setCertificatRCAComposition,
        setResultGenerationCertificatRCA,
        elementsJasper
      );
    } else if (informationsRCA !== undefined) {
      setResultGenerationCertificatRCA(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationsRCA]);

  // 1- création du certificat de situation: appel api composition
  // récupération du document en base64
  const contenuComposition: string | undefined = useCertificatRCAApiHook(
    certificatRCAComposition
  );

  useEffect(() => {
    sauvegardeContenuInscriptionSuivante(
      contenuComposition,
      listeRCA,
      [...contenuDocumentsComposition],
      setContenuDocumentsComposition,
      setRca
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 2- Création du document réponse (après appel 'useCertificatRCARmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    creationDocumentReponseInscription(
      contenuDocumentsComposition,
      listeRCA,
      requete,
      setDocumentsReponsePourStockage,
      NOM_DOCUMENT_CERTIFICAT_RCA,
      DocumentDelivrance.getKeyForNom("CERTIFICAT_INSCRIPTION_RCA")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuDocumentsComposition]);

  // 3- Stockage du ou des documents réponse une fois créé
  const uuidDocumentsReponse = usePostDocumentsReponseApi(
    requete?.idRequete,
    documentsReponsePourStockage
  );

  useEffect(() => {
    setResultGenerationCertificatInscription(
      uuidDocumentsReponse,
      contenuDocumentsComposition,
      setResultGenerationCertificatRCA
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponse]);

  return resultGenerationCertificatRCA;
}

function construitCertificatRCA(
  requete: IRequeteTableau,
  setCertificatRCAComposition: any,
  setResultGenerationCertificatRCA: any,
  elementsJasper: IElementsJasperCertificatRCA
) {
  if (estRenseigne(elementsJasper, requete)) {
    creerCertificatRCAComposition(elementsJasper, requete).then(composition => {
      setCertificatRCAComposition(composition);
    });
  } else {
    setResultGenerationCertificatRCA(RESULTAT_VIDE);
  }
}

async function creerCertificatRCAComposition(
  elementsJasper: IElementsJasperCertificatRCA,
  requete?: IRequeteTableau
): Promise<ICertificatRCAComposition> {
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }
  return CertificatRCAComposition.creerCertificatRCA(
    elementsJasper,
    requete?.canal,
    requete?.requerant,
    titulaire
  );
}

function estRenseigne(
  elementsJasper: IElementsJasperCertificatRCA | undefined,
  requete: IRequeteTableau | undefined
) {
  return (
    elementsJasper &&
    elementsJasper.anneeInscription !== "" &&
    elementsJasper.numeroInscription !== "" &&
    elementsJasper.decisionRecue !== "" &&
    elementsJasper.interesseDecision !== "" &&
    elementsJasper.paragrapheFin !== "" &&
    requete &&
    requete.document !== ""
  );
}
