import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  CertificatSituationComposition,
  ICertificatSituationComposition,
  NOM_DOCUMENT_CERTIFICAT_SITUATION
} from "../../../../../../model/composition/ICertificatSituationComposition";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCertificatSituationApiHook } from "../../../../../common/hook/v2/composition/CompositionCertificatSituationHook";
import { useStockerDocumentCreerActionMajStatutRequete } from "../../../../../common/hook/v2/requete/StockerDocumentCreerActionMajStatutRequete";
import { specificationDecret } from "./specificationTitreDecretPhrase/specificationDecret";
import { specificationTitre } from "./specificationTitreDecretPhrase/specificationTitre";

const RESULTAT_VIDE = {};

export interface IResultGenerationCertificatSituation {
  idDocumentReponse?: string;
  idAction?: string;
  contenuDocumentReponse?: string;
}

export interface IPhrasesJasperCertificatSituation {
  phrasesLiees?: string;
  phrasesPiecesJointes?: string;
}

export function useGenerationCertificatSituation(
  requete?: IRequeteTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataRMCAutoActe?: IResultatRMCActe[],
  specificationPhrase?: any
) {
  const [
    resultGenerationCertificatSituation,
    setResultGenerationCertificatSituation
  ] = useState<IResultGenerationCertificatSituation>();

  const [
    certificatSituationComposition,
    setCertificatSituationComposition
  ] = useState<ICertificatSituationComposition>();

  const [
    documentsReponsePourStockage,
    setDocumentsReponsePourStockage
  ] = useState<IDocumentReponse[] | undefined>();

  useEffect(() => {
    if (
      requete &&
      requete.document &&
      dataRMCAutoInscription &&
      dataRMCAutoActe
    ) {
      if (requete.titulaires && requete.titulaires.length > 0) {
        specificationPhrase
          .getPhrasesJasper(
            requete.document, // id du type de document demandé
            requete.titulaires[0].sexe,
            dataRMCAutoActe,
            dataRMCAutoInscription
          )
          .then((phrases: IPhrasesJasperCertificatSituation) => {
            construitCertificatSituation(
              phrases.phrasesLiees,
              requete,
              setCertificatSituationComposition,
              setResultGenerationCertificatSituation,
              phrases.phrasesPiecesJointes
            );
          });
      } else {
        setResultGenerationCertificatSituation(RESULTAT_VIDE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRMCAutoInscription, dataRMCAutoActe]);

  // 1- création du certificat de situation: appel api composition
  // récupération du document en base64
  const contenuComposition: string | undefined = useCertificatSituationApiHook(
    certificatSituationComposition
  );

  // 2- Création du document réponse (après appel 'useCertificatSituationRmcAutoVideApi') pour stockage dans la BDD et Swift
  useEffect(
    () => {
      if (contenuComposition && requete) {
        setDocumentsReponsePourStockage([
          {
            contenu: contenuComposition,
            nom: NOM_DOCUMENT_CERTIFICAT_SITUATION,
            mimeType: MimeType.APPLI_PDF,
            typeDocument: requete.document, // UUID du type de document demandé (nomenclature)
            nbPages: 1,
            orientation: Orientation.PORTRAIT
          } as IDocumentReponse
        ]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contenuComposition]
  );

  // 3- Stockage du document réponse une fois celui-ci créé
  // 4- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 5- Mise à jour du status de la requête + création d'une action
  const {
    idAction,
    uuidDocumentsReponse
  } = useStockerDocumentCreerActionMajStatutRequete(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    documentsReponsePourStockage,
    requete?.idRequete
  );

  // 6- une fois l'action créée, création du résultat
  useEffect(
    () => {
      if (estNonVide(idAction, uuidDocumentsReponse, contenuComposition)) {
        setResultGenerationCertificatSituation({
          //@ts-ignore
          idDocumentReponse: uuidDocumentsReponse[0],
          idAction,
          contenuDocumentReponse: contenuComposition
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idAction]
  );

  return resultGenerationCertificatSituation;
}

function construitCertificatSituation(
  phrasesLiees: string | undefined,
  requete: IRequeteTableau,
  setCertificatSituationComposition: any,
  setResultGenerationCertificatSituation: any,
  phrasesPiecesJointes: string | undefined
) {
  if (phrasesLiees && requete && requete.document) {
    getTitre(requete.document ? requete.document : "").then(titre => {
      //@ts-ignore
      getDecrets(requete.document).then(decrets => {
        creerCertificatSituationComposition(
          titre,
          decrets,
          phrasesLiees,
          phrasesPiecesJointes,
          requete
        ).then(composition => {
          setCertificatSituationComposition(composition);
        });
      });
    });
  } else {
    setResultGenerationCertificatSituation(RESULTAT_VIDE);
  }
}

function estNonVide(
  idAction: string | undefined,
  uuidDocumentsReponse: string[] | undefined,
  contenuComposition: string | undefined
) {
  return (
    idAction &&
    uuidDocumentsReponse &&
    uuidDocumentsReponse.length > 0 &&
    contenuComposition
  );
}

async function getTitre(idDocumentDemande: string): Promise<string> {
  return specificationTitre.getTitre(idDocumentDemande);
}

async function getDecrets(idDocumentDemande: string): Promise<string[]> {
  return specificationDecret.getDecret(idDocumentDemande);
}

async function creerCertificatSituationComposition(
  titre: string,
  decrets: string[],
  phrasesLiees: string,
  phrasesPiecesJointes?: string,
  requete?: IRequeteTableau
): Promise<ICertificatSituationComposition> {
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }
  return CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrasesLiees,
    phrasesPiecesJointes,
    requete?.requerant,
    titulaire
  );
}
