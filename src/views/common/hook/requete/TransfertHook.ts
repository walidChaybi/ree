import { postTransfertRequete } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { getValeurOuVide } from "@util/Utils";
import { useEffect, useState } from "react";

export interface TransfertParams {
  idRequete: string;
  idEntite?: string;
  idUtilisateur?: string;
  statutRequete: StatutRequete;
  libelleAction: string;
  estTransfert: boolean;
}

export function useTransfertApi(params?: TransfertParams) {
  const [res, setRes] = useState<string | undefined>();
  useEffect(() => {
    if (params && (params.idEntite || params.idUtilisateur)) {
      postTransfertRequete(
        params.idRequete,
        getValeurOuVide(params.idEntite),
        getValeurOuVide(params.idUtilisateur),
        params.libelleAction,
        params.statutRequete,
        params.estTransfert
      )
        .then(result => {
          setRes(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}
