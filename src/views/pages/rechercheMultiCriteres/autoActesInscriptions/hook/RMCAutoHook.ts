import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL } from "../../../../common/widget/tableau/TableUtils";
import { IUrlData } from "../../../../router/ReceUrls";
import {
  IResultGenerationCertificatSituationRMCAutoVide,
  useGenerationCertificatSituationRMCAutoVide
} from "./generationCertificatSituationRMCAutoVideHook/GenerationCertificatSituationRMCAutoVideHook";
import { useRMCAutoActeApiHook } from "./RMCAutoActeApiHook";
import {
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "./RMCAutoActesInscriptionsUtils";
import { useRMCAutoInscriptionApiHook } from "./RMCAutoInscriptionApiHook";

export interface IRMCAutoParams {
  requete: IRequeteTableau;
  dataRequetes: any[];
  urlCourante: string;
}

export function useRMCAutoHook(params: IRMCAutoParams): IUrlData {
  const urlDataRMCAuto = {} as IUrlData; // FIXME USESTATE ?

  const { dataRMCAutoActe, dataTableauRMCAutoActe } = useRMCAutoActeApiHook(
    params.requete,
    params.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  const {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  } = useRMCAutoInscriptionApiHook(
    params.requete,
    params.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  const resultGenerationCertificatSituationRMCAutoVide = useGenerationCertificatSituationRMCAutoVide(
    params.requete,
    dataRMCAutoInscription,
    dataRMCAutoActe
  );

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
    //@ts-ignore
    if (resultGenerationCertificatSituationRMCAutoVide.idDocumentReponse) {
      urlDataRMCAuto.url = redirectionRMCAutoApercuTraitement(
        params.requete.idRequete,
        params.urlCourante
      );
    } else {
      urlDataRMCAuto.url = redirectionRMCAuto(
        params.requete.idRequete,
        params.urlCourante,
        [dataRMCAutoActe, dataTableauRMCAutoActe],
        [dataRMCAutoInscription, dataTableauRMCAutoInscription]
      );
    }

    urlDataRMCAuto.data = {
      dataRequetes: params.dataRequetes,
      dataRMCAutoActe,
      dataTableauRMCAutoActe,
      dataRMCAutoInscription,
      dataTableauRMCAutoInscription
    };
  }
  return urlDataRMCAuto;
}
function estNonVide(
  params: IRMCAutoParams,
  dataRMCAutoActe?: IResultatRMCActe[],
  dataTableauRMCAutoActe?: IParamsTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  dataTableauRMCAutoInscription?: IParamsTableau,
  resultGenerationCertificatSituationRMCAutoVide?: IResultGenerationCertificatSituationRMCAutoVide
) {
  return (
    params.requete &&
    params.urlCourante &&
    dataRMCAutoActe &&
    dataTableauRMCAutoActe &&
    dataRMCAutoInscription &&
    dataTableauRMCAutoInscription &&
    resultGenerationCertificatSituationRMCAutoVide
  );
}
