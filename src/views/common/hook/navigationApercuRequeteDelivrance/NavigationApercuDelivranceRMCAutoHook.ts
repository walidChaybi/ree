import { IUrlData, receUrl } from "@router/ReceUrls";
import { tousRenseignes } from "@util/Utils";
import { replaceUrl } from "@util/route/UrlUtil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRMCAutoParams, useRMCAutoHook } from "../rmcAuto/RMCAutoHook";
import { INavigationApercuDelivrance, useNavigationApercuDelivrance } from "./NavigationApercuDelivranceHook";

export const useNavigationApercuRMCAutoDelivrance = (rmcAutoParams?: IRMCAutoParams) => {
  const navigate = useNavigate();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<IRMCAutoParams | undefined>();
  const [urlDataToPush, setUrlDataToPush] = useState<IUrlData | undefined>();

  const rmcAutoUrlData: IUrlData | undefined = useRMCAutoHook(paramsRMCAuto);

  const navigation: INavigationApercuDelivrance | undefined = useNavigationApercuDelivrance(
    rmcAutoParams?.urlCourante,
    rmcAutoParams?.requete
  );

  useEffect(() => {
    if (navigation) {
      if (tousRenseignes(navigation.isRmcAuto, rmcAutoParams)) {
        setParamsRMCAuto(rmcAutoParams);
      } else if (navigation.url) {
        setUrlDataToPush({ url: navigation.url });
      }
    }
  }, [navigation, rmcAutoParams]);

  useEffect(() => {
    if (rmcAutoUrlData) {
      setUrlDataToPush(rmcAutoUrlData);
    }
  }, [rmcAutoUrlData]);

  useEffect(
    () => {
      if (tousRenseignes(urlDataToPush, rmcAutoParams)) {
        estUrlSaisirOuApercuOuTraitementRequete(rmcAutoParams?.urlCourante ?? "")
          ? replaceUrl(navigate, urlDataToPush?.url ?? "", urlDataToPush?.data)
          : navigate(urlDataToPush?.url ?? "", urlDataToPush?.data);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlDataToPush]
  );
};

const estUrlSaisirOuApercuOuTraitementRequete = (url: string) =>
  receUrl.estUrlApercuRequete(url) ||
  receUrl.estUrlApercuTraitementRequete(url) ||
  receUrl.estUrlSaisirCourrier(url) ||
  receUrl.estUrlEdition(url);
