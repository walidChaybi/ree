import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { ICreationActionParams, usePostCreationActionApi } from "./CreationActionHook";

export interface ICreationActionHookParams {
  libelleAction: string;
  requete?: IRequeteTableauDelivrance;
  callback?: () => void;
}

export const useCreationAction = (params: ICreationActionHookParams | undefined) => {
  const navigation = useNavigation();
  const [creationActionParams, setCreationActionParams] = useState<ICreationActionParams | undefined>();

  const { utilisateurConnecte } = useContext(RECEContextData);

  useEffect(() => {
    if (params) {
      setCreationActionParams({
        libelleAction: params?.libelleAction,
        requeteId: params?.requete?.idRequete
      });
    }
  }, [params]);

  const idAction = usePostCreationActionApi(creationActionParams);

  useEffect(() => {
    if (idAction && params?.requete) {
      // Mise à jour de l'id utilisateur
      params.requete.idUtilisateur = utilisateurConnecte.id;
      params.callback?.();
    }
  }, [idAction, params, navigation]);
};
