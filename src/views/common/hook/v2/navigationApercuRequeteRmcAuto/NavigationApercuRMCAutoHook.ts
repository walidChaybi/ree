import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IUrlData, receUrl } from "../../../../router/ReceUrls";
import { INavigationApercu, useNavigationApercu } from "./NavigationApercuHook";
import { IRMCAutoParams, useRMCAutoHook } from "./RMCAutoHook";

export interface INavigationApercuRMCAutoParams {
  requete: IRequeteTableau;
  dataRequetes: any[];
  urlCourante: string;
}

export function useNavigationApercuRMCAuto(
  rmcAutoNavigationParams?: INavigationApercuRMCAutoParams
) {
  const history = useHistory();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    IRMCAutoParams | undefined
  >();
  const [urlDataToPush, setUrlDataToPush] = useState<IUrlData | undefined>();

  const rmcAutoUrlData: IUrlData | undefined = useRMCAutoHook(paramsRMCAuto);

  const navigation: INavigationApercu | undefined = useNavigationApercu(
    rmcAutoNavigationParams?.urlCourante,
    rmcAutoNavigationParams?.requete
  );

  useEffect(() => {
    if (navigation) {
      if (navigation.isRmcAuto && rmcAutoNavigationParams) {
        setParamsRMCAuto(rmcAutoNavigationParams);
      } else if (navigation.url) {
        setUrlDataToPush({ url: navigation.url });
      }
    }
  }, [navigation, rmcAutoNavigationParams]);

  useEffect(() => {
    if (rmcAutoUrlData) {
      setUrlDataToPush(rmcAutoUrlData);
    }
  }, [rmcAutoUrlData]);

  useEffect(
    () => {
      if (urlDataToPush && rmcAutoNavigationParams) {
        if (receUrl.estUrlApercuRequete(rmcAutoNavigationParams?.urlCourante)) {
          receUrl.replaceUrl(history, urlDataToPush.url, urlDataToPush.data);
        } else {
          history.push(urlDataToPush.url, urlDataToPush.data);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlDataToPush, rmcAutoNavigationParams?.dataRequetes]
  );
}
