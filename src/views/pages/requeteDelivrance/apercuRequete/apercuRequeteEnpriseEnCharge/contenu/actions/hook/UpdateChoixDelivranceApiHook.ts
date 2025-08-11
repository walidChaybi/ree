import { updateChoixDelivrance } from "@api/appels/requeteApi";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../../../utils/AfficherMessage";

export interface UpdateChoixDelivranceProps {
  requete: IRequeteDelivrance;
  choixDelivrance?: ChoixDelivrance;
}

interface IUpdateChoixDelivranceResultat {
  idRequete?: string;
}

export function useUpdateChoixDelivrance(params?: UpdateChoixDelivranceProps): IUpdateChoixDelivranceResultat | undefined {
  const [updateChoixDelivranceResultat, setUpdateChoixDelivranceResultat] = useState<IUpdateChoixDelivranceResultat>();

  useEffect(() => {
    if (params?.choixDelivrance) {
      updateChoixDelivrance(
        params.requete.id,
        // On enlève le choix délivrance en cas de "Modification du traitement"
        params.choixDelivrance ? params.choixDelivrance.nom : null
      )
        .then((result: any) => {
          setUpdateChoixDelivranceResultat({ idRequete: result.body.data });
        })
        .catch((erreurs: any) => {
          /* istanbul ignore next */
          AfficherMessage.erreur("Une erreur est survenue lors de la mise à jour de la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);
  return updateChoixDelivranceResultat;
}
