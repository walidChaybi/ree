import { postProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useEnregistrerProjetActeApiHook(
  acte?: IProjetActe
): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (acte) {
      postProjetActe(acte)
        .then(result => {
          setResultat(result.body.data);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible d'enregistrer le projet d'acte",
            error
          });
        });
    }
  }, [acte]);

  return resultat;
}
