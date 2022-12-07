import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";

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
  const [resultat, setResultat] =
    useState<ICreationRequeteDelivranceResultat>();

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
        .catch((error: any) => {
          logError({
            messageUtilisateur: getLibelle(
              "Une erreur est survenue lors de la création de la requête"
            ),
            error
          });
        });
    }
  }, [params]);

  return resultat;
};
