import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  CertificatRCAComposition,
  ICertificatRCAComposition,
  NOM_DOCUMENT_CERTIFICAT_RCA
} from "../../../../../../model/composition/ICertificatRCAComposition";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCertificatRCAApiHook } from "../../composition/CompositionCertificatRCAHook";
import { usePostDocumentsReponseApi } from "../../DocumentReponseHook";
import { useInformationsRepertoireApiHook } from "../../repertoires/RepertoireApiHook";
import {
  IResultGenerationPlusieursDocument,
  RESULTAT_VIDE
} from "../generationUtils";
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
    certificatSituationComposition,
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
    certificatSituationComposition
  );

  useEffect(() => {
    if (contenuComposition && listeRCA && listeRCA.length > 0) {
      const contenuDocuments = [...contenuDocumentsComposition];
      contenuDocuments.push(contenuComposition);
      setContenuDocumentsComposition(contenuDocuments);
      listeRCA.pop();
      if (listeRCA && listeRCA.length > 0) {
        setRca(listeRCA[listeRCA.length - 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 2- Création du document réponse (après appel 'useCertificatRCARmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (
      contenuDocumentsComposition &&
      contenuDocumentsComposition.length > 0 &&
      listeRCA &&
      listeRCA.length === 0 &&
      requete
    ) {
      const documents: IDocumentReponse[] = [];
      contenuDocumentsComposition.forEach((contenu: string) => {
        documents.push({
          contenu,
          nom: NOM_DOCUMENT_CERTIFICAT_RCA,
          mimeType: MimeType.APPLI_PDF,
          // TODO typeDocument: DocumentDelivrance.getKeyForNom(
          //   "CERTIFICAT_SITUATION_RCA"
          // ), // UUID CERTIFICAT_SITUATION_RCA (nomenclature)
          typeDocument: requete.document, // UUID du type de document demandé (nomenclature)
          nbPages: 1,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse);
      });
      setDocumentsReponsePourStockage(documents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuDocumentsComposition]);

  // 3- Stockage du ou des documents réponse une fois créé
  const uuidDocumentsReponse = usePostDocumentsReponseApi(
    requete?.idRequete,
    documentsReponsePourStockage
  );

  useEffect(() => {
    if (
      uuidDocumentsReponse &&
      uuidDocumentsReponse.length > 0 &&
      contenuDocumentsComposition &&
      contenuDocumentsComposition.length > 0
    ) {
      setResultGenerationCertificatRCA({
        idDocumentsReponse: uuidDocumentsReponse,
        contenuDocumentsReponse: contenuDocumentsComposition
      });
    }
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
