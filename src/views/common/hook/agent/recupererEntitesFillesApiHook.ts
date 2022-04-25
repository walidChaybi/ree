import { useEffect, useState } from "react";
import { getToutesLesEntitesFilles } from "../../../../api/appels/agentApi";
import { IEntite } from "../../../../model/agent/IEntiteRattachement";
import { logError } from "../../util/LogManager";

export interface IRecupEntitesFilles {
  idEntite: string;
}

export function useRecupEntitesFilles(parameters?: IRecupEntitesFilles) {
  const [entitesFilles, setEntitesFilles] = useState<IEntite[]>();
  useEffect(() => {
    if (parameters) {
      getToutesLesEntitesFilles(parameters.idEntite)
        .then((result: any) => {
          const entites = mapEntites(result?.body?.data);
          setEntitesFilles(entites);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de recupérer les entités filles de l'utilisateur",
            error
          });
        });
    }
  }, [parameters]);
  return entitesFilles;
}

function mapEntites(data: any) {
  const res = [];
  for (const entite of data) {
    res.push(entite);
  }
  return res;
}
