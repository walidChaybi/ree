import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IUrlData, receUrl } from "@router/ReceUrls";
import { tousNonNullsNonZeroEtNonVides } from "@util/Utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  INavigationApercuDelivrance,
  useNavigationApercuDelivrance
} from "./NavigationApercuDelivranceHook";
import { IRMCAutoParams, useRMCAutoHook } from "./RMCAutoHook";

export interface INavigationApercuRMCAutoParams {
  requete: IRequeteTableauDelivrance;
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

  const navigation: INavigationApercuDelivrance | undefined =
    useNavigationApercuDelivrance(
      rmcAutoNavigationParams?.urlCourante,
      rmcAutoNavigationParams?.requete
    );

  useEffect(() => {
    if (navigation) {
      if (
        tousNonNullsNonZeroEtNonVides(
          navigation.isRmcAuto,
          rmcAutoNavigationParams
        )
      ) {
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
      if (
        tousNonNullsNonZeroEtNonVides(urlDataToPush, rmcAutoNavigationParams)
      ) {
        if (
          estUrlSaisirOuApercuOuTraitementRequete(
            // @ts-ignore (forcément valué)
            rmcAutoNavigationParams?.urlCourante
          )
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
