import { NB_LIGNES_PAR_APPEL } from "../../../../common/widget/tableau/TableUtils";
import { IUrlData } from "../../../../router/ReceUrls";
import { useRMCAutoActeApiHook } from "./RMCAutoActeApiHook";
import { useRMCAutoInscriptionApiHook } from "./RMCAutoInscriptionApiHook";
import { redirectionRMCAuto } from "./RMCAutoUtils";

export interface IRMCAutoParams {
  idRequete: string;
  dataRequetes: any[];
  urlWithParam: string;
}

export function useRMCAutoHook(params: IRMCAutoParams): IUrlData {
  const urlDataRMCAuto = {} as IUrlData;

  const { dataRMCAutoActe, dataTableauRMCAutoActe } = useRMCAutoActeApiHook(
    params.idRequete,
    params.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  const {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  } = useRMCAutoInscriptionApiHook(
    params.idRequete,
    params.dataRequetes,
    `0-${NB_LIGNES_PAR_APPEL}`
  );

  if (
    params.idRequete &&
    params.urlWithParam &&
    dataRMCAutoActe &&
    dataTableauRMCAutoActe &&
    dataRMCAutoInscription &&
    dataTableauRMCAutoInscription
  ) {
    urlDataRMCAuto.url = redirectionRMCAuto(
      params.idRequete,
      params.urlWithParam,
      [dataRMCAutoActe, dataTableauRMCAutoActe],
      [dataRMCAutoInscription, dataTableauRMCAutoInscription]
    );

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
