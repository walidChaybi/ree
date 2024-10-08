import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { PATH_APERCU_REQ_INFO } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauInformation } from "@util/RequetesUtils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../requete/CreationActionMiseAjourStatutHook";

export interface INavigationApercuReqInfoParams {
  requete: IRequeteTableauInformation;
  callback?: () => void;
  urlCourante: string;
}

export function useNavigationApercuInformation(
  params?: INavigationApercuReqInfoParams
) {
  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<
    ICreationActionMiseAjourStatutHookParams | undefined
  >();

  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const redirectionVersApercu = useCallback(() => {
    if (params) {
      const url = `${params.urlCourante}/${PATH_APERCU_REQ_INFO}/:idRequete`;
      navigate(getUrlWithParam(url, params.requete.idRequete));
    }
  }, [params, navigate]);

  useEffect(() => {
    if (params?.requete) {
      if (
        autorisePrendreEnChargeReqTableauInformation(
          utilisateurConnecte,
          params.requete
        )
      ) {
        setParamsMAJReqInfo({
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          requete: params.requete,
          callback: () => {
            redirectionVersApercu();
          }
        });
      } else {
        redirectionVersApercu();
      }
    }
  }, [params]);
}
