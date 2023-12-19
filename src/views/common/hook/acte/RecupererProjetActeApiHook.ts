import { getProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingProjetActe } from "../../mapping/mappingProjetActe";

export function useRecupererProjetActeApiHook(
  idActe?: string
): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (idActe) {
      getProjetActe(idActe)
        .then(result => {
          setResultat(mappingProjetActe(result.body.data));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible de récupérer le projet d'acte",
            error
          });
        });
    }
  }, [idActe]);

  return resultat;
}
