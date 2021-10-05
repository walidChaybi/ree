import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableau } from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "../../../../../common/hook/v2/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseDelivrer } from "../../../../../common/hook/v2/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { useGenerationInscriptionsHook } from "../../../../../common/hook/v2/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import {
  IActionStatutRequete,
  useCreerActionMajStatutRequete
} from "../../../../../common/hook/v2/requete/CreerActionMajStatutRequete";
import { useSupprimerAnciensDocumentsReponseHook } from "./SupprimerAnciensDocumentsReponseHook";

export interface IResultDelivrerCertificatSituation {
  idDocumentReponse?: string;
  idAction?: string;
  contenuDocumentReponse?: string;
}

export interface IPhrasesJasperCertificatSituation {
  phrasesLiees?: string;
  phrasesPiecesJointes?: string;
}

export function useDelivrerCertificatSituationHook(
  requete?: IRequeteTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataRMCAutoActe?: IResultatRMCActe[]
) {
  const [
    resultDelivrerCertificatSituation,
    setResultDelivrerCertificatSituation
  ] = useState<IResultDelivrerCertificatSituation>();

  const [
    paramsCertificatSituation,
    setParamsCertificatSituation
  ] = useState<IGenerationCertificatSituationParams>();

  const [
    actionStatutRequete,
    setActionStatutRequete
  ] = useState<IActionStatutRequete>();

  // 0 - Suppression des eventuels documents générés au préalable
  const isOldDocumentsDeleted = useSupprimerAnciensDocumentsReponseHook(
    requete?.idRequete,
    dataRMCAutoInscription
  );

  // 1 - Génération d'une ou des incriptions RC et/ou RCA et/ou PACS
  const resultGenerationInscription = useGenerationInscriptionsHook(
    requete,
    dataRMCAutoInscription,
    isOldDocumentsDeleted
  );

  useEffect(() => {
    if (resultGenerationInscription) {
      setParamsCertificatSituation({
        requete,
        dataRMCAutoInscription,
        dataRMCAutoActe,
        specificationPhrase: specificationPhraseDelivrer
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationInscription]);

  // 2 - Génération du certificat de situation
  const resultGenerationCertificatSituation = useGenerationCertificatSituationHook(
    paramsCertificatSituation
  );

  // 3 - Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(() => {
    if (resultGenerationCertificatSituation) {
      setActionStatutRequete({
        libelleAction: StatutRequete.A_VALIDER.libelle,
        statutRequete: StatutRequete.A_VALIDER,
        requeteId: requete?.idRequete
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatSituation]);

  // 4 - Mise à jour du status de la requête + création d'une action
  const { idAction } = useCreerActionMajStatutRequete(actionStatutRequete);

  // 5 - une fois l'action créée, création du résultat
  useEffect(() => {
    const uuidDocumentsReponse =
      resultGenerationCertificatSituation?.idDocumentReponse;
    const contenuComposition =
      resultGenerationCertificatSituation?.contenuDocumentReponse;

    if (
      resultGenerationCertificatSituation &&
      estNonVide(idAction, uuidDocumentsReponse, contenuComposition)
    ) {
      setResultDelivrerCertificatSituation({
        //@ts-ignore
        idDocumentReponse: uuidDocumentsReponse[0],
        idAction,
        contenuDocumentReponse: contenuComposition
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  return resultDelivrerCertificatSituation;
}

function estNonVide(
  idAction: string | undefined,
  uuidDocumentsReponse: string | undefined,
  contenuComposition: string | undefined
) {
  return idAction && uuidDocumentsReponse && contenuComposition;
}
