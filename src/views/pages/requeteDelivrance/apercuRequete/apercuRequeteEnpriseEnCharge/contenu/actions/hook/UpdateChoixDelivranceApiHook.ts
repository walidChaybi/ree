import { updateChoixDelivrance } from "@api/appels/requeteApi";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface UpdateChoixDelivranceProps {
  requete: IRequeteDelivrance;
  choixDelivrance?: ChoixDelivrance;
}

export interface IUpdateChoixDelivranceResultat {
  idRequete?: string;
}

export function useUpdateChoixDelivrance(
  params?: UpdateChoixDelivranceProps
): IUpdateChoixDelivranceResultat | undefined {
  const [updateChoixDelivranceResultat, setUpdateChoixDelivranceResultat] =
    useState<IUpdateChoixDelivranceResultat>();

  useEffect(() => {
    if (params && params.choixDelivrance) {
      updateChoixDelivrance(
        params.requete.id,
        // On enlève le choix délivrance en cas de "Modification du traitement"
        params.choixDelivrance ? params.choixDelivrance.nom : null
      )
        .then((result: any) => {
          setUpdateChoixDelivranceResultat({ idRequete: result.body.data });
        })
        .catch((error: any) => {
          /* istanbul ignore next */
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la mise à jour de la requête",
            error
          });
        });
    }
  }, [params]);
  return updateChoixDelivranceResultat;
}
