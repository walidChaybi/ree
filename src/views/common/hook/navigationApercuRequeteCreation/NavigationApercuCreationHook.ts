import { PATH_APERCU_REQ_CREATION, receUrl } from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/routeUtil";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export type NavigationApercuReqCreationParams = {
  idRequete: string;
  urlCourante: string;
};

export const useNavigationApercuCreation = (
  params?: NavigationApercuReqCreationParams
) => {
  const history = useHistory();

  useEffect(() => {
    if (params) {
      const path = `${params.urlCourante}/${PATH_APERCU_REQ_CREATION}/:idRequete`;

      receUrl.push({
        history,
        urlCible: getUrlWithParam(path, params.idRequete)
      });
    }
  }, [params, history]);
};
