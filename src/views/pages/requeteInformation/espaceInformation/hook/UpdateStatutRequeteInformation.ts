import { useEffect, useState } from "react";
import { updateStatutRequeteInformation } from "../../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { logError } from "../../../../common/util/LogManager";

export function useUpdateStatutRequeteInformation(
  requeteId: string | undefined,
  statut: StatutRequete
) {
  const [idRequete, setIdRequete] = useState<string>();

  useEffect(() => {
    if (requeteId && statut) {
      updateStatutRequeteInformation(requeteId, statut)
        .then(result => {
          setIdRequete(result?.body?.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête d'information",
            error
          });
        });
    }
  }, [requeteId, statut]);

  return idRequete;
}
