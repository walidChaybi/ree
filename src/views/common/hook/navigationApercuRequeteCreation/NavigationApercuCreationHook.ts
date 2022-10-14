import { PATH_APERCU_REQ_CREATION } from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/routeUtil";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export type NavigationApercuReqCreationParams = {
  idRequete: string;
  urlCourante: string;
  handleTraitementTermine?: () => void;
};

export const useNavigationApercuCreation = (
  params?: NavigationApercuReqCreationParams
) => {
  const history = useHistory();

  useEffect(() => {
    if (params) {
      const path = `${params.urlCourante}/${PATH_APERCU_REQ_CREATION}/:idRequete`;
      history.push(getUrlWithParam(path, params.idRequete));

      if (params.handleTraitementTermine) {
        params.handleTraitementTermine();
      }
    }
  }, [params, history]);
};
