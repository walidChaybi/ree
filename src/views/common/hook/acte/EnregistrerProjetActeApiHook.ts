import { postProjetActe } from "@api/appels/etatcivilApi";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useEnregistrerProjetActeApiHook(acte?: IProjetActe): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (acte) {
      postProjetActe(acte)
        .then(result => {
          setResultat(result.body.data);
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible d'enregistrer le projet d'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [acte]);

  return resultat;
}
