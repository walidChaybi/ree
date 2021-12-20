import { useEffect, useState } from "react";
import { IDonneesComposition } from "../../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { Orientation } from "../../../../../model/composition/enum/Orientation";
import {
  CertificatSituationComposition,
  ICertificatSituationComposition,
  NOM_DOCUMENT_CERTIFICAT_SITUATION
} from "../../../../../model/composition/ICertificatSituationComposition";
import { IDecret } from "../../../../../model/etatcivil/commun/IDecret";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "../../../../../model/requete/ITitulaireRequeteTableau";
import { MimeType } from "../../../../../ressources/MimeType";
import { useCertificatSituationApiHook } from "../../composition/CompositionCertificatSituationHook";
import {
  IStockerDocumentCreerActionMajStatutRequeteParams,
  useStockerDocumentCreerActionMajStatutRequete
} from "../../requete/StockerDocumentCreerActionMajStatutRequete";
import { IResultGenerationUnDocument, RESULTAT_VIDE } from "../generationUtils";
import { specificationDecret } from "./specificationTitreDecretPhrase/specificationDecret";
import { IInfosInscriptions } from "./specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { INbInscriptionsInfos } from "./specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { specificationTitre } from "./specificationTitreDecretPhrase/specificationTitre";

export interface IGenerationCertificatSituationParams {
  requete?: IRequeteTableauDelivrance;
  nbInscriptionsInfos?: INbInscriptionsInfos;
  specificationPhrase?: any;
  infosInscription?: IInfosInscriptions;
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

  const [
    certificatSituationComposition,
    setCertificatSituationComposition
  ] = useState<ICertificatSituationComposition>();

  const [
    stockerDocumentCreerActionMajStatutRequeteParams,
    setStockerDocumentCreerActionMajStatutRequeteParams
  ] = useState<IStockerDocumentCreerActionMajStatutRequeteParams>();

  // 1 - Construction du Certificat de situation
  useEffect(() => {
    if (
      params &&
      params.requete &&
      params.requete.document &&
      (params.nbInscriptionsInfos || params.infosInscription)
    ) {
      if (params?.requete.titulaires && params.requete.titulaires.length > 0) {
        const phrases: IPhrasesJasperCertificatSituation = params.specificationPhrase.getPhrasesJasper(
          params.requete.document, // id du type de document demandé
          params.requete.titulaires[0].sexe,
          params.nbInscriptionsInfos,
          params.infosInscription
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
  const donneesComposition:
    | IDonneesComposition
    | undefined = useCertificatSituationApiHook(certificatSituationComposition);

  // 3 - Création du document réponse (après appel 'useCertificatSituationRmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (donneesComposition && params?.requete) {
      setStockerDocumentCreerActionMajStatutRequeteParams({
        documentReponsePourStockage: {
          contenu: donneesComposition.contenu,
          nom: NOM_DOCUMENT_CERTIFICAT_SITUATION,
          mimeType: MimeType.APPLI_PDF,
          typeDocument: DocumentDelivrance.getKeyForCode(
            "CERTIFICAT_SITUATION"
          ), // UUID du type de document demandé (nomenclature)
          nbPages: donneesComposition.nbPages,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse,
        libelleAction: StatutRequete.A_VALIDER.libelle,
        statutRequete: StatutRequete.A_VALIDER,
        requeteId: params?.requete?.idRequete
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donneesComposition]);

  // 4- Stockage du document réponse une fois celui-ci créé
  const uuidDocumentReponse = useStockerDocumentCreerActionMajStatutRequete(
    stockerDocumentCreerActionMajStatutRequeteParams
  );

  // 5 - Une fois le document stocker, création du résultat
  useEffect(() => {
    if (uuidDocumentReponse && donneesComposition?.contenu) {
      setResultGenerationCertificatSituation({
        //@ts-ignore
        idDocumentReponse: uuidDocumentReponse,
        contenuDocumentReponse: donneesComposition.contenu
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentReponse]);

  return resultGenerationCertificatSituation;
}

function construitCertificatSituation(
  phrasesLiees: string | undefined,
  requete: IRequeteTableauDelivrance,
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
  requete?: IRequeteTableauDelivrance
): ICertificatSituationComposition {
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }
  return CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrasesLiees,
    requete,
    phrasesPiecesJointes,
    titulaire
  );
}
