import { useEffect, useState } from "react";
import {
  CertificatRCComposition,
  ICertificatRCComposition,
  NOM_DOCUMENT_CERTIFICAT_RC
} from "../../../../../../model/composition/ICertificatRCComposition";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { useCertificatRCApiHook } from "../../composition/CompositionCertificatRCHook";
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
import { specificationRC } from "./specificationInscriptions/specificationRC";

export interface IElementsJasperCertificatRC {
  anneeInscription?: string;
  numeroInscription?: string;
  decisionRecue1?: string;
  decisionRecue2?: string;
  interesseDecision?: string;
  regime?: string;
  renouvellementModification?: string;
  decisionExequatur?: string;
  duree?: string;
  paragrapheFin?: string;
}

export function useGenerationCertificatRCHook(
  requete?: IRequeteTableau,
  listeRC?: IResultatRMCInscription[]
) {
  const [rc, setRc] = useState<IResultatRMCInscription>();

  const [
    certificatRCComposition,
    setCertificatRCComposition
  ] = useState<ICertificatRCComposition>();

  const [
    documentsReponsePourStockage,
    setDocumentsReponsePourStockage
  ] = useState<IDocumentReponse[] | undefined>();

  const [
    contenuDocumentsComposition,
    setContenuDocumentsComposition
  ] = useState<string[]>([]);

  const [
    resultGenerationCertificatRC,
    setResultGenerationCertificatRC
  ] = useState<IResultGenerationPlusieursDocument>();

  useEffect(() => {
    if (requete && listeRC && listeRC.length > 0) {
      setRc(listeRC[listeRC.length - 1]);
    } else if (listeRC && listeRC.length === 0) {
      setResultGenerationCertificatRC(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeRC]);

  const informationsRC = useInformationsRepertoireApiHook(
    TypeFiche.RC,
    rc?.idInscription
  ) as IFicheRcRca;

  useEffect(() => {
    if (
      requete &&
      requete.titulaires &&
      requete.titulaires.length > 0 &&
      informationsRC
    ) {
      const elementsJasper: IElementsJasperCertificatRC = specificationRC.getElementsJasper(
        informationsRC
      );
      construitCertificatRC(
        requete,
        setCertificatRCComposition,
        setResultGenerationCertificatRC,
        elementsJasper
      );
    } else if (informationsRC !== undefined) {
      setResultGenerationCertificatRC(RESULTAT_VIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationsRC]);

  // 1- création du certificat de situation: appel api composition
  // récupération du document en base64
  const contenuComposition: string | undefined = useCertificatRCApiHook(
    certificatRCComposition
  );

  useEffect(() => {
    sauvegardeContenuInscriptionSuivante(
      contenuComposition,
      listeRC,
      [...contenuDocumentsComposition],
      setContenuDocumentsComposition,
      setRc
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 2- Création du document réponse (après appel 'useCertificatRCRmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    creationDocumentReponseInscription(
      contenuDocumentsComposition,
      listeRC,
      requete,
      setDocumentsReponsePourStockage,
      NOM_DOCUMENT_CERTIFICAT_RC
    );
    // TODO ajouter le typeDocument: DocumentDelivrance.getKeyForNom(
    //   "CERTIFICAT_SITUATION_RC"
    // ), // UUID CERTIFICAT_SITUATION_RC (nomenclature)
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
      setResultGenerationCertificatRC
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponse]);

  return resultGenerationCertificatRC;
}

function construitCertificatRC(
  requete: IRequeteTableau,
  setCertificatRCComposition: any,
  setResultGenerationCertificatRC: any,
  elementsJasper: IElementsJasperCertificatRC
) {
  if (estRenseigne(elementsJasper, requete)) {
    creerCertificatRCComposition(elementsJasper, requete).then(composition => {
      setCertificatRCComposition(composition);
    });
  } else {
    setResultGenerationCertificatRC(RESULTAT_VIDE);
  }
}

async function creerCertificatRCComposition(
  elementsJasper: IElementsJasperCertificatRC,
  requete?: IRequeteTableau
): Promise<ICertificatRCComposition> {
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }
  return CertificatRCComposition.creerCertificatRC(
    elementsJasper,
    requete?.requerant,
    titulaire
  );
}

function estRenseigne(
  elementsJasper: IElementsJasperCertificatRC | undefined,
  requete: IRequeteTableau | undefined
) {
  return (
    elementsJasper &&
    elementsJasper.anneeInscription !== "" &&
    elementsJasper.numeroInscription !== "" &&
    elementsJasper.decisionRecue1 !== "" &&
    elementsJasper.interesseDecision !== "" &&
    elementsJasper.paragrapheFin !== "" &&
    requete &&
    requete.document !== ""
  );
}
