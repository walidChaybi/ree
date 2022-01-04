import { useEffect, useState } from "react";
import { getNbReqInfo } from "../../../../api/appels/requeteApi";
import { logError } from "../../../common/util/LogManager";

export function useNbReqInfoHook(statuts: string) {
  const [nbReqInfo, setNbReqInfo] = useState<number | undefined>();

  useEffect(() => {
    async function fetchNbReqInfo() {
      try {
        const res = await getNbReqInfo(statuts);
        setNbReqInfo(res.body.data);
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer le nombre de requête information",
          error
        });
      }
    }
    fetchNbReqInfo();
  }, [statuts]);

  return nbReqInfo;
}
