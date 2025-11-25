import { CONFIG_POST_MAJ_STATUT_ET_ACTION } from "@api/configurations/requete/actions/PostMajStatutEtActionConfigApi";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

export interface ICreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: keyof typeof EStatutRequete;
  requeteId?: string;
  callback?: () => void;
}

export const usePostCreationActionEtMiseAjourStatutApi = (params?: ICreationActionEtMiseAjourStatutParams | null) => {
  const [idAction, setIdAction] = useState<string | undefined>();

  const { appelApi: postMiseAJourStatutRequete } = useFetchApi(CONFIG_POST_MAJ_STATUT_ET_ACTION);

  useEffect(() => {
    if (!params?.requeteId || !params.libelleAction || !params.statutRequete) return;

    postMiseAJourStatutRequete({
      parametres: { query: { idRequete: params.requeteId, libelleAction: params.libelleAction, statutRequete: params.statutRequete } },
      apresSucces: idAction => {
        setIdAction(idAction);
        params.callback?.();
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de mettre à jour le statut de la requête ou de créer une action associée", {
          erreurs
        })
    });
  }, [params]);
  return idAction;
};
