import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IUrlData, receUrl } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { tousRenseignes } from "@util/Utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRMCAutoParams, useRMCAutoHook } from "../rmcAuto/RMCAutoHook";
import {
  INavigationApercuDelivrance,
  useNavigationApercuDelivrance
} from "./NavigationApercuDelivranceHook";

export interface INavigationApercuRMCAutoParams {
  requete: IRequeteTableauDelivrance;
  urlCourante: string;
  pasDeTraitementAuto?: boolean;
}

export function useNavigationApercuRMCAutoDelivrance(
  rmcAutoNavigationParams?: INavigationApercuRMCAutoParams
) {
  const history = useHistory();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    IRMCAutoParams | undefined
  >();
  const [urlDataToPush, setUrlDataToPush] = useState<IUrlData | undefined>();

  const rmcAutoUrlData: IUrlData | undefined = useRMCAutoHook(paramsRMCAuto);

  const navigation: INavigationApercuDelivrance | undefined =
    useNavigationApercuDelivrance(
      rmcAutoNavigationParams?.urlCourante,
      rmcAutoNavigationParams?.requete
    );

  useEffect(() => {
    if (navigation) {
      if (tousRenseignes(navigation.isRmcAuto, rmcAutoNavigationParams)) {
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
      if (tousRenseignes(urlDataToPush, rmcAutoNavigationParams)) {
        if (
          estUrlSaisirOuApercuOuTraitementRequete(
            // @ts-ignore (forcément valué)
            rmcAutoNavigationParams?.urlCourante
          )
        ) {
          // @ts-ignore (forcément valué)
          replaceUrl(history, urlDataToPush.url, urlDataToPush.data);
        } else {
          // @ts-ignore (forcément valué)
          history.push(urlDataToPush.url, urlDataToPush.data);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlDataToPush]
  );
}
function estUrlSaisirOuApercuOuTraitementRequete(url: string) {
  return (
    receUrl.estUrlApercuRequete(url) ||
    receUrl.estUrlApercuTraitementRequete(url) ||
    receUrl.estUrlSaisirCourrier(url) ||
    receUrl.estUrlEdition(url)
  );
}
