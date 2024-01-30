import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getPrendreEnChargeRequeteSuivante } from "@api/appels/requeteApi";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IPrendreEnChargeRequeteSuivanteResultat {
  requete: TRequeteTableau;
}

export function usePrendreEnChargeRequeteSuivanteApiHook(
  type: TypeRequete,
  prendreEnCharge: boolean
) {
  const [requeteAPrendreEnCharge, setRequeteAPrendreEnCharge] = useState<
    IPrendreEnChargeRequeteSuivanteResultat | undefined
  >();

  useEffect(() => {
    if (prendreEnCharge && type === TypeRequete.CREATION) {
      getPrendreEnChargeRequeteSuivante()
        .then(response => {
          const requeteResultatCreationMappee =
            mappingUneRequeteTableauCreation(response.body.data, false);
          setRequeteAPrendreEnCharge({
            requete: requeteResultatCreationMappee
          });
        })
        .catch(error => {
          /* istanbul ignore next */
          gererErreur(error, setRequeteAPrendreEnCharge);
        });
    }
  }, [type, prendreEnCharge]);

  return requeteAPrendreEnCharge;
}

/* istanbul ignore next */
export function gererErreur(error: any, setRequetePlusAncienneResultat: any) {
  if (error.response && error.response.status === HTTP_NOT_FOUND) {
    setRequetePlusAncienneResultat({ requete: undefined });
  } else {
    logError({
      messageUtilisateur: "Il n'existe plus de requête disponible",
      error
    });
  }
}
