import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "@hook/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseDelivrer } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { INbInscriptionsInfos } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { useGenerationInscriptionsHook } from "@hook/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { CODE_ATTESTATION_PACS } from "@model/requete/enum/DocumentDelivranceConstante";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { useEffect, useState } from "react";
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
  codeDocumentDemande: string,
  requete?: IRequeteTableauDelivrance,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataRMCAutoActe?: IResultatRMCActe[]
) {
  const [
    resultDelivrerCertificatSituation,
    setResultDelivrerCertificatSituation
  ] = useState<IResultDelivrerCertificatSituation>();

  const [paramsCertificatSituation, setParamsCertificatSituation] =
    useState<IGenerationCertificatSituationParams>();
  const [paramsMajStatut, setParamsMajStatut] =
    useState<ICreationActionEtMiseAjourStatutParams>();

  // 0 - Suppression des eventuels documents générés au préalable
  const isOldDocumentsDeleted = useSupprimerAnciensDocumentsReponseHook(
    requete?.idRequete,
    dataRMCAutoInscription
  );

  const idAction = usePostCreationActionEtMiseAjourStatutApi(paramsMajStatut);

  // 1 - Génération d'une ou des incriptions RC et/ou RCA et/ou PACS
  const resultGenerationInscription = useGenerationInscriptionsHook(
    requete,
    dataRMCAutoInscription,
    isOldDocumentsDeleted
  );

  useEffect(() => {
    if (resultGenerationInscription) {
      if (codeDocumentDemande === CODE_ATTESTATION_PACS) {
        setParamsMajStatut({
          libelleAction: StatutRequete.A_VALIDER.libelle,
          statutRequete: StatutRequete.A_VALIDER,
          requeteId: requete?.idRequete
        });
      } else {
        setParamsCertificatSituation({
          requete,
          nbInscriptionsInfos: {} as INbInscriptionsInfos,
          infosInscription: {
            infosPacs: resultGenerationInscription.pacs || [],
            infosRc: resultGenerationInscription.rc || [],
            infosRca: resultGenerationInscription.rca || []
          },
          specificationPhrase: specificationPhraseDelivrer
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationInscription]);

  // 2 - Génération du certificat de situation
  const resultGenerationCertificatSituation =
    useGenerationCertificatSituationHook(paramsCertificatSituation);

  // 5 - une fois l'action créée, création du résultat
  useEffect(() => {
    if (resultGenerationCertificatSituation) {
      setResultDelivrerCertificatSituation({
        idDocumentReponse: resultGenerationCertificatSituation.idDocumentReponse
      });
    } else if (idAction) {
      setResultDelivrerCertificatSituation({
        idAction
      });
    }
  }, [resultGenerationCertificatSituation, idAction]);

  return resultDelivrerCertificatSituation;
}
