import { getPrendreEnChargeRequeteSuivante } from "@api/appels/requeteApi";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IPrendreEnChargeRequeteSuivanteResultat {
  requete?: TRequeteTableau;
}

export function usePrendreEnChargeRequeteSuivanteApiHook(
  type: TypeRequete,
  prendreEnCharge: boolean
): IPrendreEnChargeRequeteSuivanteResultat | undefined {
  const [requeteAPrendreEnCharge, setRequeteAPrendreEnCharge] = useState<
    IPrendreEnChargeRequeteSuivanteResultat | undefined
  >();

  useEffect(() => {
    if (prendreEnCharge && TypeRequete.estCreation(type)) {
      getPrendreEnChargeRequeteSuivante()
        .then(response => {
          const requeteResultatCreationMappee =
            mappingUneRequeteTableauCreation(response.body.data, false);
          setRequeteAPrendreEnCharge({
            requete: requeteResultatCreationMappee
          });
        })
        .catch(error => {
          setRequeteAPrendreEnCharge({ requete: undefined });
          logError({
            messageUtilisateur:
              "Impossible de prendre en charge la requête suivante",
            error
          });
        });
    }
  }, [type, prendreEnCharge]);

  return requeteAPrendreEnCharge;
}
