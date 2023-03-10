import { getToutesLesEntitesFilles } from "@api/appels/agentApi";
import { IEntite } from "@model/agent/IEntiteRattachement";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IGetEntitesFillesParams {
  idEntiteMere?: string;
}

export interface IGetEntitesFillesResultat {
    entitesFilles: IEntite[];
}
export function useGetEntitesFillesRecurivementHookApi(
  params?: IGetEntitesFillesParams
) {
  const [resultat, setResultat] = useState<IGetEntitesFillesResultat>();

  useEffect(() => {
    if (params?.idEntiteMere) {
      getToutesLesEntitesFilles(params.idEntiteMere)
        .then(res => {
          setResultat({ entitesFilles: mapEntites(res.body.data) });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la récupération des entités",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
function mapEntites(entites: any): IEntite[] {
  return entites.sort((entite1: IEntite, entite2: IEntite) =>
    entite1.libelleEntite.localeCompare(entite2.libelleEntite)
  ) as IEntite[];
}

