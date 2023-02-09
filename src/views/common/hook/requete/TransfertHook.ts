import { postTransfertRequete } from "@api/appels/requeteApi";
import { getEntiteParUtilisateurId } from "@model/agent/IUtilisateur";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { getValeurOuVide } from "@util/Utils";
import { useEffect, useState } from "react";

export interface TransfertParams {
  idEntite?: string;
  idUtilisateur?: string;
  libelleAction: string;
  estTransfert: boolean;
}

export interface TransfertUnitaireParams extends TransfertParams {
  idRequete: string;
  statutRequete: StatutRequete;
}

export interface TransfertParLotParams extends TransfertParams {
  idRequetes: string[];
  statutRequete: StatutRequete[];
  idEntite: string;
  idUtilisateur: string;
}

export function useTransfertApi(params?: TransfertUnitaireParams) {
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
        .catch(errorFct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}

export function useTransfertsApi(params?: TransfertParLotParams) {
  const [res, setRes] = useState<string[] | undefined>();
  useEffect(() => {
    if (params && (params.idEntite || params.idUtilisateur)) {
      Promise.all(
        params.idRequetes.map((idRequete, idx) =>
          postTransfertRequete(
            idRequete,
            params.idEntite
              ? params.idEntite
              : (getEntiteParUtilisateurId(params.idUtilisateur)
                  ?.idEntite as string),
            params.idUtilisateur,
            params.libelleAction,
            params.statutRequete[idx],
            params.estTransfert
          )
        )
      )
        .then(results => {
          setRes(results.map(result => result.body.data));
        })
        .catch(errorFct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return res;
}

const errorFct = (error: any) => {
  logError({
    error,
    messageUtilisateur:
      "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
  });
};