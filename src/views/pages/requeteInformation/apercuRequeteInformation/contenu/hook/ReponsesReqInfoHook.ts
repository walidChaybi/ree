import { getReponsesReqInfo } from "@api/appels/requeteApi";
import { IReponseRequeteInfo } from "@model/requete/IReponseRequeteInfo";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";

export const useReponsesReqInfoApiHook = () => {
  const [reponsesReqInfo, setReponsesReqInfo] = useState<IReponseRequeteInfo[]>([]);

  useEffect(() => {
    getReponsesReqInfo()
      .then(result => {
        setReponsesReqInfo(result.body.data);
      })
      .catch(erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les réponses des requêtes d'information", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : []
        });
      });
  }, []);
  return {
    reponsesReqInfo
  };
};
