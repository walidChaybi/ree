import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  CertificatSituationComposition,
  ICertificatSituationComposition,
  NOM_DOCUMENT_CERTIFICAT_SITUATION
} from "../../../../../../model/composition/ICertificatSituationComposition";
import { IDecret } from "../../../../../../model/etatcivil/commun/IDecret";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCertificatSituationApiHook } from "../../composition/CompositionCertificatSituationHook";
import { usePostDocumentsReponseApi } from "../../DocumentReponseHook";
import { IResultGenerationUnDocument, RESULTAT_VIDE } from "../generationUtils";
import { specificationDecret } from "./specificationTitreDecretPhrase/specificationDecret";
import { specificationTitre } from "./specificationTitreDecretPhrase/specificationTitre";

export interface IGenerationCertificatSituationParams {
  requete?: IRequeteTableau;
  dataRMCAutoInscription?: IResultatRMCInscription[];
  dataRMCAutoActe?: IResultatRMCActe[];
  specificationPhrase?: any;
}
export interface IPhrasesJasperCertificatSituation {
  phrasesLiees?: string;
  phrasesPiecesJointes?: string;
}

export function useGenerationCertificatSituationHook(
  params?: IGenerationCertificatSituationParams
) {
  const [
    resultGenerationCertificatSituation,
    setResultGenerationCertificatSituation
  ] = useState<IResultGenerationUnDocument>();

  const [certificatSituationComposition, setCertificatSituationComposition] =
    useState<ICertificatSituationComposition>();

  const [documentsReponsePourStockage, setDocumentsReponsePourStockage] =
    useState<IDocumentReponse[] | undefined>();

  // 1 - Construction du Certificat de situation
  useEffect(() => {
    if (
      params &&
      params.requete &&
      params.requete.document &&
      params.dataRMCAutoInscription &&
      params.dataRMCAutoActe
    ) {
      if (params?.requete.titulaires && params.requete.titulaires.length > 0) {
        const phrases: IPhrasesJasperCertificatSituation =
          params.specificationPhrase.getPhrasesJasper(
            params.requete.document, // id du type de document demandé
            params.requete.titulaires[0].sexe,
            params.dataRMCAutoActe,
            params.dataRMCAutoInscription
          );
        construitCertificatSituation(
          phrases.phrasesLiees,
          params.requete,
          setCertificatSituationComposition,
          setResultGenerationCertificatSituation,
          phrases.phrasesPiecesJointes
        );
      } else {
        setResultGenerationCertificatSituation(RESULTAT_VIDE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // 2 - Création du certificat de situation: appel api composition
  // récupération du document en base64
  const contenuComposition: string | undefined = useCertificatSituationApiHook(
    certificatSituationComposition
  );

  // 3 - Création du document réponse (après appel 'useCertificatSituationRmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (contenuComposition && params?.requete) {
      setDocumentsReponsePourStockage([
        {
          contenu: contenuComposition,
          nom: NOM_DOCUMENT_CERTIFICAT_SITUATION,
          mimeType: MimeType.APPLI_PDF,
          typeDocument: DocumentDelivrance.getKeyForCode(
            "CERTIFICAT_SITUATION"
          ), // UUID du type de document demandé (nomenclature)
          nbPages: 1,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contenuComposition]);

  // 4- Stockage du document réponse une fois celui-ci créé
  const uuidDocumentsReponse = usePostDocumentsReponseApi(
    params?.requete?.idRequete,
    documentsReponsePourStockage
  );

  // 5 - Une fois le document stocker, création du résultat
  useEffect(() => {
    if (uuidDocumentsReponse && contenuComposition) {
      setResultGenerationCertificatSituation({
        //@ts-ignore
        idDocumentReponse: uuidDocumentsReponse[0],
        contenuDocumentReponse: contenuComposition
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponse]);

  return resultGenerationCertificatSituation;
}

async function construitCertificatSituation(
  phrasesLiees: string | undefined,
  requete: IRequeteTableau,
  setCertificatSituationComposition: any,
  setResultGenerationCertificatSituation: any,
  phrasesPiecesJointes: string | undefined
) {
  if (phrasesLiees && requete && requete.document) {
    const titre = getTitre(requete.document ? requete.document : "");
    const decrets = getDecrets(requete.document);

    const composition = creerCertificatSituationComposition(
      titre,
      decrets,
      phrasesLiees,
      phrasesPiecesJointes,
      requete
    );
    setCertificatSituationComposition(composition);
  } else {
    setResultGenerationCertificatSituation(RESULTAT_VIDE);
  }
}

function getTitre(idDocumentDemande: string): string {
  return specificationTitre.getTitre(idDocumentDemande);
}

function getDecrets(idDocumentDemande: string): IDecret[] {
  return specificationDecret.getDecret(idDocumentDemande);
}

function creerCertificatSituationComposition(
  titre: string,
  decrets: IDecret[],
  phrasesLiees: string,
  phrasesPiecesJointes?: string,
  requete?: IRequeteTableau
): ICertificatSituationComposition {
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }
  return CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrasesLiees,
    requete?.canal,
    phrasesPiecesJointes,
    requete?.requerant,
    titulaire
  );
}
