import { CONFIG_POST_MAJ_ACTION_TRANSFERT_VALIDEUR } from "@api/configurations/requete/actions/PostMajActionTransfertValideurConfigApi";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface ITransmettreAValideurParams {
  libelleAction: string;
  texteObservation: string;
  idUtilisateurValideur: string;
  requeteId: string;
}

export const useTransmettreAValideurApiHook = (params?: ITransmettreAValideurParams) => {
  const [idAction, setIdAction] = useState<string | undefined>();
  const { appelApi: appelPostActionTransfertValideur } = useFetchApi(CONFIG_POST_MAJ_ACTION_TRANSFERT_VALIDEUR);

  useEffect(() => {
    if (params) {
      appelPostActionTransfertValideur({
        parametres: {
          body: {
            idRequete: params.requeteId,
            idUtilisateurValideur: params.idUtilisateurValideur,
            libelleAction: params.libelleAction,
            texteObservation: params.texteObservation
          }
        },
        apresSucces: resultat => {
          setIdAction(resultat);
        },
        apresErreur: erreurs => {
          AfficherMessage.erreur("Impossible de transmettre la requête au valideur", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return idAction;
};
