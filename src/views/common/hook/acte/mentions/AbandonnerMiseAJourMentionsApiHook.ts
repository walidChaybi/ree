import { abandonnerMiseAjourActe } from "@api/appels/etatcivilApi";
import { IEtatTraitementApi } from "@model/requete/IEtatTraitementApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IAbandonnerMajMentionsParams {
  idActe: string;
}

export const useAbandonnerMajMentionsApiHook = (
  params?: IAbandonnerMajMentionsParams
) => {
  const [resultat, setResultat] = useState<IEtatTraitementApi>({
    termine: false
  });

  useEffect(() => {
    if (params) {
      abandonnerMiseAjourActe(params.idActe)
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
  }, [params]);

  return resultat;
};
