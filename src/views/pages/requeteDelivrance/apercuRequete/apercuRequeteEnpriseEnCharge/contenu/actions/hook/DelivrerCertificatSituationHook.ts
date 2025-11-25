import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "@views/common/hook/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseDelivrer } from "@views/common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { INbInscriptionsInfos } from "@views/common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { useGenerationInscriptionsHook } from "@views/common/hook/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import { useEffect, useState } from "react";
import { useSupprimerAnciensDocumentsReponseHook } from "./SupprimerAnciensDocumentsReponseHook";

interface IResultDelivrerCertificatSituation {
  idDocumentReponse?: string;
  idAction?: string;
  contenuDocumentReponse?: string;
}

export const useDelivrerCertificatSituationHook = (
  codeDocumentDemande: string,
  requete?: IRequeteTableauDelivrance,
  dataRMCAutoInscription?: TResultatRMCInscription[],
  inscriptionsRcRadiation?: IInscriptionRc
) => {
  const [resultDelivrerCertificatSituation, setResultDelivrerCertificatSituation] = useState<IResultDelivrerCertificatSituation>();

  const [paramsCertificatSituation, setParamsCertificatSituation] = useState<IGenerationCertificatSituationParams>();
  const [paramsMajStatut, setParamsMajStatut] = useState<ICreationActionEtMiseAjourStatutParams>();

  // 0 - Suppression des eventuels documents générés au préalable
  const isOldDocumentsDeleted = useSupprimerAnciensDocumentsReponseHook(requete?.idRequete, dataRMCAutoInscription);

  const idAction = usePostCreationActionEtMiseAjourStatutApi(paramsMajStatut);

  // 1 - Génération d'une ou des incriptions RC et/ou RCA et/ou PACS
  const resultGenerationInscription = useGenerationInscriptionsHook(
    requete,
    dataRMCAutoInscription,
    isOldDocumentsDeleted,
    inscriptionsRcRadiation
  );

  useEffect(() => {
    if (resultGenerationInscription) {
      if (codeDocumentDemande === ECodeDocumentDelivrance.CODE_ATTESTATION_PACS) {
        setParamsMajStatut({
          libelleAction: EStatutRequete.A_VALIDER,
          statutRequete: "A_VALIDER",
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
  const resultGenerationCertificatSituation = useGenerationCertificatSituationHook(paramsCertificatSituation);

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
};
