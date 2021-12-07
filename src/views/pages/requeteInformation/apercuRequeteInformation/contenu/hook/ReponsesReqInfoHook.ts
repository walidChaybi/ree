import { useEffect, useState } from "react";
import { getReponsesReqInfo } from "../../../../../../api/appels/requeteApi";
import { IReponseRequeteInfo } from "../../../../../../model/requete/IReponseRequeteInfo";
import { logError } from "../../../../../common/util/LogManager";

export function useReponsesReqInfoApiHook() {
  const [reponsesReqInfo, setReponsesReqInfo] = useState<IReponseRequeteInfo[]>(
    []
  );

  useEffect(() => {
    getReponsesReqInfo()
      .then(result => {
        setReponsesReqInfo(result.body.data);
      })
      .catch(error => {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les réponses des requêtes d'information",
          error
        });
      });
  }, []);
  return {
    reponsesReqInfo
  };
}
