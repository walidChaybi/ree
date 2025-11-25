import { getProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { mappingProjetActe } from "../../mapping/mappingProjetActe";

export const useRecupererProjetActeApiHook = (idActe?: string): IProjetActe | undefined => {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (idActe) {
      getProjetActe(idActe)
        .then(result => {
          setResultat(mappingProjetActe(result.body.data));
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer le projet d'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [idActe]);

  return resultat;
};
