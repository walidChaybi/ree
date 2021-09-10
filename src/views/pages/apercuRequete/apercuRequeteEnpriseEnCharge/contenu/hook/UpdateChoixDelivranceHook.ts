import { useEffect, useState } from "react";
import { updateChoixDelivrance } from "../../../../../../api/appels/requeteApi";
import { ChoixDelivrance } from "../../../../../../model/requete/v2/enum/ChoixDelivrance";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { logError } from "../../../../../common/util/LogManager";

export interface UpdateChoixDelivrancePops {
  requete: IRequeteDelivrance;
  choixDelivrance?: ChoixDelivrance;
}

export function useUpdateChoixDelivrance(params?: UpdateChoixDelivrancePops) {
  const [idRequete, setIdRequete] = useState<string | undefined>();

  useEffect(() => {
    if (params && params.choixDelivrance) {
      updateChoixDelivrance(params.requete.id, params.choixDelivrance.nom)
        .then((result: any) => {
          setIdRequete(result.body.data);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la mise à jour de la requête",
            error
          });
        });
    }
  }, [params]);
  return idRequete;
}
