import { CONFIG_POST_MAJ_ACTION_TRANSFERT } from "@api/configurations/requete/actions/PostMajActionTransfertConfigApi";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useContext, useEffect, useMemo, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

interface TransfertParams {
  idService?: string;
  idUtilisateurAAssigner?: string;
  libelleAction: string;
  estTransfert: boolean;
}

export interface TransfertUnitaireParams extends TransfertParams {
  idRequete: string;
  statutRequete: keyof typeof EStatutRequete;
}

export interface TransfertParLotParams extends TransfertParams {
  idRequetes: string[];
  statutRequete: (keyof typeof EStatutRequete)[];
  idService: string;
  idUtilisateurAAssigner: string;
}

export function useTransfertApi(params?: TransfertUnitaireParams) {
  const [res, setRes] = useState<string | undefined>();
  const { appelApi: appelPostActionTransfert } = useFetchApi(CONFIG_POST_MAJ_ACTION_TRANSFERT);

  useEffect(() => {
    if (params && (params.idService || params.idUtilisateurAAssigner)) {
      appelPostActionTransfert({
        parametres: {
          query: {
            idRequete: params.idRequete,
            idService: params.idService ?? "",
            idUtilisateurAAssigner: params.idUtilisateurAAssigner ?? "",
            libelleAction: params.libelleAction,
            statutRequete: params.statutRequete,
            attribuer: !params.estTransfert
          }
        },
        apresSucces: resultat => {
          setRes(resultat);
        },
        apresErreur: erreurs => {
          AfficherMessage.erreur("Impossible de mettre à jour le statut de la requête ou de créer une action associée", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        }
      });
    }
  }, [params]);
  return res;
}

export function useTransfertsApi(params?: TransfertParLotParams) {
  const [res, setRes] = useState<string[] | undefined>();
  const { utilisateurs } = useContext(RECEContextData);
  const { appelApi: appelPostActionTransfert } = useFetchApi(CONFIG_POST_MAJ_ACTION_TRANSFERT);

  const statutCleList = useMemo(() => {
    if (!params?.statutRequete) return [];

    return params.statutRequete.map(statut => {
      return statut in EStatutRequete ? statut : "BROUILLON";
    });
  }, [params?.statutRequete]);

  useEffect(() => {
    if (params && (params.idService || params.idUtilisateurAAssigner)) {
      const appels = params.idRequetes.map((idRequete, idx) => {
        return new Promise<string>((resolve, reject) => {
          appelPostActionTransfert({
            parametres: {
              query: {
                idRequete,
                idService:
                  (params.idService || utilisateurs.find(utilisateur => utilisateur.id === params.idUtilisateurAAssigner)?.idService) ?? "",
                idUtilisateurAAssigner: params.idUtilisateurAAssigner ?? "",
                libelleAction: params.libelleAction,
                statutRequete: statutCleList[idx],
                attribuer: !params.estTransfert
              }
            },
            apresSucces: data => resolve(data),
            apresErreur: erreurs => reject(erreurs)
          });
        });
      });

      Promise.all(appels)
        .then(results => setRes(results))
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de mettre à jour le statut de la requête ou de créer une action associée", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);

  return res;
}
