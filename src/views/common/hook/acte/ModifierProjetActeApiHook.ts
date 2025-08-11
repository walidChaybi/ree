import { patchProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { mappingProjetActe } from "../../mapping/mappingProjetActe";

export function useModifierProjetActeApiHook(acte?: IProjetActe): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (acte) {
      patchProjetActe(acte)
        .then(result => {
          setResultat(mappingProjetActe(result.body.data));
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de modifier le projet d'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [acte]);
  return resultat;
}
