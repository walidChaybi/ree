import { useEffect, useState } from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IResultGenerationCertificatSituation,
  useGenerationCertificatSituation
} from "../../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseRMCAutoVide } from "../../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { useRMCAutoActeApiHook } from "../../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActeApiHook";
import {
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "../../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import { useRMCAutoInscriptionApiHook } from "../../../../pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoInscriptionApiHook";
import { IUrlData } from "../../../../router/ReceUrls";
import { IParamsTableau } from "../../../util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL } from "../../../widget/tableau/TableUtils";
import { getLibelle } from "../../../widget/Text";

const INFO_CS_RMC_AUTO_VIDE = getLibelle(
  "La recherche multi-critères sur les actes/ RC / RCA et PACS n'ayant donné aucun résultat, il vous est proposé de délivrer le certificat ci-dessous."
);
export interface IRMCAutoParams {
  requete: IRequeteTableau;
  dataRequetes: any[];
  urlCourante: string;
}

export function useRMCAutoHook(params?: IRMCAutoParams): IUrlData | undefined {
  const [urlDataRMCAuto, setUrlDataRMCAuto] = useState<IUrlData | undefined>();

  const { dataRMCAutoActe, dataTableauRMCAutoActe } = useRMCAutoActeApiHook(
    params?.requete,
    params?.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  const {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  } = useRMCAutoInscriptionApiHook(
    params?.requete,
    params?.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  const resultGenerationCertificatSituationRMCAutoVide = useGenerationCertificatSituation(
    params?.requete,
    dataRMCAutoInscription,
    dataRMCAutoActe,
    specificationPhraseRMCAutoVide
  );

  useEffect(() => {
    if (
      estNonVide(
        params,
        dataRMCAutoActe,
        dataTableauRMCAutoActe,
        dataRMCAutoInscription,
        dataTableauRMCAutoInscription,
        resultGenerationCertificatSituationRMCAutoVide
      )
    ) {
      const data = {
        dataRequetes: params?.dataRequetes,
        dataRMCAutoActe,
        dataTableauRMCAutoActe,
        dataRMCAutoInscription,
        dataTableauRMCAutoInscription,
        info: ""
      };
      if (
        //@ts-ignore
        resultGenerationCertificatSituationRMCAutoVide.idDocumentReponse
      ) {
        data.info = INFO_CS_RMC_AUTO_VIDE;
        setUrlDataRMCAuto({
          url: redirectionRMCAutoApercuTraitement(
            //@ts-ignore
            params.requete.idRequete,
            //@ts-ignore
            params.urlCourante
          ),
          data
        });
      } else {
        setUrlDataRMCAuto({
          url: redirectionRMCAuto(
            //@ts-ignore
            params.requete.idRequete,
            //@ts-ignore
            params.urlCourante,
            [dataRMCAutoActe, dataTableauRMCAutoActe],
            [dataRMCAutoInscription, dataTableauRMCAutoInscription]
          ),
          data
        });
      }
    }
  }, [
    params,
    dataRMCAutoActe,
    dataTableauRMCAutoActe,
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription,
    resultGenerationCertificatSituationRMCAutoVide
  ]);

  return urlDataRMCAuto;
}
function estNonVide(
  params?: IRMCAutoParams,
  dataRMCAutoActe?: IResultatRMCActe[],
  dataTableauRMCAutoActe?: IParamsTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataTableauRMCAutoInscription?: IParamsTableau,
  resultGenerationCertificatSituationRMCAutoVide?: IResultGenerationCertificatSituation
) {
  return (
    params?.requete &&
    params?.urlCourante &&
    dataRMCAutoActe &&
    dataTableauRMCAutoActe &&
    dataRMCAutoInscription &&
    dataTableauRMCAutoInscription &&
    resultGenerationCertificatSituationRMCAutoVide
  );
}
