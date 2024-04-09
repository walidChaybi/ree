import { abandonnerMiseAjourActe } from "@api/appels/etatcivilApi";
import { IEtatTraitementApi } from "@model/requete/IEtatTraitementApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useAbandonnerMajMentionsApiHook(idActe: string | undefined) {
  const [resultat, setResultat] = useState<IEtatTraitementApi>({
    termine: false
  });

  useEffect(() => {
    if (idActe) {
      abandonnerMiseAjourActe(idActe)
        .then(() => {
          setResultat({ termine: true });
        })
        .catch(error => {
          setResultat({ termine: true, erreur: error });
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de l'abandon de la mise a jour des mentions",
            error
          });
        });
    }
  }, [idActe]);

  return resultat;
}
