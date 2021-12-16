import { useEffect, useState } from "react";
import { IRequeteTableauDelivrance } from "../../../../../../../../model/requete/IRequeteTableauDelivrance";
import { IResultatRMCActe } from "../../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "../../../../../../../common/hook/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseDelivrer } from "../../../../../../../common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { INbInscriptionsInfos } from "../../../../../../../common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { useGenerationInscriptionsHook } from "../../../../../../../common/hook/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import { useSupprimerAnciensDocumentsReponseHook } from "./SupprimerAnciensDocumentsReponseHook";

export interface IResultDelivrerCertificatSituation {
  idDocumentReponse?: string;
  contenuDocumentReponse?: string;
}

export interface IPhrasesJasperCertificatSituation {
  phrasesLiees?: string;
  phrasesPiecesJointes?: string;
}

export function useDelivrerCertificatSituationHook(
  requete?: IRequeteTableauDelivrance,
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
        nbInscriptionsInfos: {} as INbInscriptionsInfos,
        infosInscription: {
          infosPacs: resultGenerationInscription.pacs || [],
          infosRc: resultGenerationInscription.rc || [],
          infosRca: resultGenerationInscription.rca || []
        },
        specificationPhrase: specificationPhraseDelivrer
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationInscription]);

  // 2 - Génération du certificat de situation
  const resultGenerationCertificatSituation = useGenerationCertificatSituationHook(
    paramsCertificatSituation
  );

  // 5 - une fois l'action créée, création du résultat
  useEffect(() => {
    if (resultGenerationCertificatSituation) {
      setResultDelivrerCertificatSituation({
        idDocumentReponse: resultGenerationCertificatSituation.idDocumentReponse
      });
    }
  }, [resultGenerationCertificatSituation]);

  return resultDelivrerCertificatSituation;
}
