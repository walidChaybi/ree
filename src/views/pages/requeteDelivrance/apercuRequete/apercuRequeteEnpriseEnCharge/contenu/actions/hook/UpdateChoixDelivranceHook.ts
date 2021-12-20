import { useEffect, useState } from "react";
import { updateChoixDelivrance } from "../../../../../../../../api/appels/requeteApi";
import { ChoixDelivrance } from "../../../../../../../../model/requete/enum/ChoixDelivrance";
import { IRequeteDelivrance } from "../../../../../../../../model/requete/IRequeteDelivrance";
import { logError } from "../../../../../../../common/util/LogManager";

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
  const [
    updateChoixDelivranceResultat,
    setUpdateChoixDelivranceResultat
  ] = useState<IUpdateChoixDelivranceResultat>();

  useEffect(() => {
    if (params && params.choixDelivrance) {
      updateChoixDelivrance(params.requete.id, params.choixDelivrance.nom)
        .then((result: any) => {
          setUpdateChoixDelivranceResultat({ idRequete: result.body.data });
        })
        .catch((error: any) => {
          handleLogError(error);
        });
    } else if (params) {
      updateChoixDelivrance(params.requete.id, null)
        .then((result: any) => {
          setUpdateChoixDelivranceResultat({ idRequete: result.body.data });
        })
        .catch((error: any) => {
          handleLogError(error);
        });
    }
  }, [params]);
  return updateChoixDelivranceResultat;
}

function handleLogError(error: any) {
  logError({
    messageUtilisateur:
      "Une erreur est survenu lors de la mise à jour de la requête",
    error
  });
}
