import { patchProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingProjetActe } from "../../mapping/mappingProjetActe";

export function useModifierProjetActeApiHook(
  acte?: IProjetActe
): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (acte) {
      patchProjetActe(acte)
        .then(result => {
          setResultat(mappingProjetActe(result.body.data));
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de modifier le projet d'acte",
            error
          });
        });
    }
  }, [acte]);
  return resultat;
}
