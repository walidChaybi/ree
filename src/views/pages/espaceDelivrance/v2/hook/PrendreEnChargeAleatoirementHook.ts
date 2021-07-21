import { useEffect, useState } from "react";
import { HTTP_NOT_FOUND } from "../../../../../api/ApiManager";
import { getRequeteAleatoire } from "../../../../../api/appels/requeteApi";
import {
  IRequeteTableau,
  mappingUneRequeteTableau
} from "../../../../../model/requete/v2/IRequeteTableau";
import { logError } from "../../../../common/util/LogManager";

export interface IRequeteAleatoireResultat {
  requete?: IRequeteTableau;
}

export function useGetRequeteAleatoire(prendreEnCharge: boolean) {
  const [requeteAleatoireResultat, setRequeteAleatoireResultat] = useState<
    IRequeteAleatoireResultat | undefined
  >();
  useEffect(() => {
    async function fetchRequeteAleatoire() {
      try {
        if (prendreEnCharge) {
          const resultat = await getRequeteAleatoire();
          const requeteResultatMappee = mappingUneRequeteTableau(
            resultat.body.data,
            true
          );
          setRequeteAleatoireResultat({ requete: requeteResultatMappee });
        }
      } catch (error) {
        gereErreur(error, setRequeteAleatoireResultat);
      }
    }

    fetchRequeteAleatoire();
  }, [prendreEnCharge]);

  return requeteAleatoireResultat;
}

export function gereErreur(error: any, setRequeteAleatoireResultat: any) {
  if (error.response && error.response.status === HTTP_NOT_FOUND) {
    setRequeteAleatoireResultat({ requete: undefined });
  } else {
    logError({
      messageUtilisateur:
        "Impossible de prendre en charge aléatoirement une requête",
      error
    });
  }
}
