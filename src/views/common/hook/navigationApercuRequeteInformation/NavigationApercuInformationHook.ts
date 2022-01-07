import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import { PATH_APERCU_REQ_INFO } from "../../../router/ReceUrls";
import messageManager from "../../util/messageManager";
import { getUrlWithParam } from "../../util/route/routeUtil";

const MESSAGE_REQ_A_TRAITER =
  "Vous ne pouvez pas visualiser cette requête tant qu'elle n'est pas prise en charge par un agent";

export interface INavigationApercuReqInfoParams {
  requete: IRequeteTableauInformation;
  callback?: () => void;
  urlCourante: string;
}

export function useNavigationApercuInformation(
  params?: INavigationApercuReqInfoParams
) {
  const history = useHistory();

  const redirectionVersApercu = useCallback(() => {
    if (params) {
      const url = `${params.urlCourante}/${PATH_APERCU_REQ_INFO}/:idRequete`;
      history.push(getUrlWithParam(url, params.requete.idRequete));
    }
  }, [params, history]);

  useEffect(() => {
    if (params?.requete) {
      if (params.requete.statut === StatutRequete.A_TRAITER.libelle) {
        messageManager.showErrorAndClose(MESSAGE_REQ_A_TRAITER);
      } else {
        redirectionVersApercu();
      }
      if (params.callback) {
        params.callback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
}
