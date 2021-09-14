import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IUrlData, receUrl } from "../../../../router/ReceUrls";
import { tousNonVides } from "../../../util/Utils";
import { INavigationApercu, useNavigationApercu } from "./NavigationApercuHook";
import { IRMCAutoParams, useRMCAutoHook } from "./RMCAutoHook";

export interface INavigationApercuRMCAutoParams {
  requete: IRequeteTableau;
  dataRequetes: any[];
  urlCourante: string;
  pasDeTraitementAuto?: boolean;
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
      if (tousNonVides(navigation.isRmcAuto, rmcAutoNavigationParams)) {
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
      if (tousNonVides(urlDataToPush, rmcAutoNavigationParams)) {
        if (
          // @ts-ignore (forcément valué)
          estUrlApercuOuTraitementRequete(rmcAutoNavigationParams?.urlCourante)
        ) {
          // @ts-ignore (forcément valué)
          receUrl.replaceUrl(history, urlDataToPush.url, urlDataToPush.data);
        } else {
          // @ts-ignore (forcément valué)
          history.push(urlDataToPush.url, urlDataToPush.data);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlDataToPush, rmcAutoNavigationParams?.dataRequetes]
  );
}
function estUrlApercuOuTraitementRequete(url: string) {
  return (
    receUrl.estUrlApercuRequete(url) ||
    receUrl.estUrlApercuTraitementRequete(url)
  );
}
