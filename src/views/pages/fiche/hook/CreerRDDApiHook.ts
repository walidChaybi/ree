import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ICreationRequeteDelivranceParams {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
}

interface ICreationRequeteDelivranceResultat {
  idRequete: string;
}

export const useCreationRequeteDelivranceRDD = (
  params?: ICreationRequeteDelivranceParams
): ICreationRequeteDelivranceResultat | undefined => {
  const [resultat, setResultat] = useState<ICreationRequeteDelivranceResultat>();

  useEffect(() => {
    if (params) {
      const { requete, futurStatut } = params;

      creationRequeteDelivrance({
        requete,
        futurStatut
      })
        .then((result: any) => {
          setResultat({ idRequete: result.idRequete });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de la création de la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);

  return resultat;
};
