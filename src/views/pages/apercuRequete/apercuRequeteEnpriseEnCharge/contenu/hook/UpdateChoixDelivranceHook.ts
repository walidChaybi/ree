import { useEffect, useState } from "react";
import { updateChoixDelivrance } from "../../../../../../api/appels/requeteApi";
import { ChoixDelivrance } from "../../../../../../model/requete/v2/enum/ChoixDelivrance";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { logError } from "../../../../../common/util/LogManager";

export interface UpdateChoixDelivranceProps {
  requete: IRequeteDelivrance;
  choixDelivrance?: ChoixDelivrance;
}

export function useUpdateChoixDelivrance(params?: UpdateChoixDelivranceProps) {
  const [idRequete, setIdRequete] = useState<string | undefined>();

  useEffect(() => {
    if (params && params.choixDelivrance) {
      updateChoixDelivrance(params.requete.id, params.choixDelivrance.nom)
        .then((result: any) => {
          setIdRequete(result.body.data);
        })
        .catch((error: any) => {
          handleLogError(error);
        });
    } else if (params) {
      updateChoixDelivrance(params.requete.id, null)
        .then((result: any) => {
          setIdRequete(result.body.data);
        })
        .catch((error: any) => {
          handleLogError(error);
        });
    }
  }, [params]);
  return idRequete;
}

function handleLogError(error: any) {
  logError({
    messageUtilisateur:
      "Une erreur est survenu lors de la mise à jour de la requête",
    error
  });
}
