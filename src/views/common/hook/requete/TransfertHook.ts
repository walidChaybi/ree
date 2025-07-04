import { postTransfertRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { getValeurOuVide } from "@util/Utils";
import { useContext, useEffect, useState } from "react";

interface TransfertParams {
  idService?: string;
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
  idService: string;
  idUtilisateur: string;
}

export function useTransfertApi(params?: TransfertUnitaireParams) {
  const [res, setRes] = useState<string | undefined>();
  useEffect(() => {
    if (params && (params.idService || params.idUtilisateur)) {
      postTransfertRequete(
        params.idRequete,
        getValeurOuVide(params.idService),
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
  const { utilisateurs } = useContext(RECEContextData);

  useEffect(() => {
    if (params && (params.idService || params.idUtilisateur)) {
      Promise.all(
        params.idRequetes.map((idRequete, idx) =>
          postTransfertRequete(
            idRequete,
            params.idService
              ? params.idService
              : (utilisateurs.find(utilisateur => utilisateur.id === params.idUtilisateur)?.idService as string),
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
    messageUtilisateur: "Impossible de mettre à jour le statut de la requête ou de créer une action associée"
  });
};
