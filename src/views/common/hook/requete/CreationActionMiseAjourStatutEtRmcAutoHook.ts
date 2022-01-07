import { useCallback, useEffect, useState } from "react";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "./CreationActionMiseAjourStatutHook";

export interface CreationActionMiseAjourStatutEtRmcAutoHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  urlCourante: string;
  requete?: IRequeteTableauDelivrance;
  pasDeTraitementAuto?: boolean;
}

export function useCreationActionMiseAjourStatutEtRmcAuto(
  params: CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
) {
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();

  const [newsParams, setNewsParams] = useState<
    CreationActionMiseAjourStatutHookParams | undefined
  >();

  useEffect(() => {
    if (params && params.requete) {
      setNewsParams({
        statutRequete: params?.statutRequete,
        libelleAction: params?.libelleAction,
        urlCourante: params?.urlCourante,
        requete: params?.requete,
        pasDeTraitementAuto: params?.pasDeTraitementAuto,
        callback: lancerRMCAuto
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const lancerRMCAuto = useCallback(() => {
    if (params && params.requete) {
      setParamsRMCAuto({
        requete: params.requete,
        urlCourante: params.urlCourante,
        pasDeTraitementAuto: params.pasDeTraitementAuto
      });
    }
  }, [params]);

  useCreationActionMiseAjourStatut(newsParams);

  useNavigationApercuRMCAuto(paramsRMCAuto);
}
