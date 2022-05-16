import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import { PATH_APERCU_REQ_INFO } from "../../../router/ReceUrls";
import { autorisePrendreEnChargeReqTableauInformation } from "../../util/RequetesUtils";
import { getUrlWithParam } from "../../util/route/routeUtil";
import {
  CreationActionMiseAjourStatutHookParams,
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
    CreationActionMiseAjourStatutHookParams | undefined
  >();

  const history = useHistory();

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const redirectionVersApercu = useCallback(() => {
    if (params) {
      const url = `${params.urlCourante}/${PATH_APERCU_REQ_INFO}/:idRequete`;
      history.push(getUrlWithParam(url, params.requete.idRequete));
    }
  }, [params, history]);

  useEffect(() => {
    if (params?.requete) {
      if (autorisePrendreEnChargeReqTableauInformation(params.requete)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
}
