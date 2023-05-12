import { updateRequeteCreation } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { ISaisieRequeteAEnvoyer } from "./CreationRequeteCreationApiHook";

export interface IUpdateRequeteCreationParams {
  requete?: ISaisieRequeteAEnvoyer;
}

export function useUpdateRequeteCreation(
  idRequete?: string,
  params?: IUpdateRequeteCreationParams
): string | undefined {
  const [resultat, setResultat] = useState<string>();

  useEffect(() => {
    if (params?.requete && idRequete) {
      updateRequeteCreation(idRequete, params.requete)
        .then((result: any) => {
          setResultat(result.body.data.id);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la modification de la requête",
            error
          });
        });
    }
  }, [params, idRequete]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return resultat;
}
