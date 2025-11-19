import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { ICreationActionParams } from "./ActionHook";
import { usePostCreationActionApi } from "./CreationActionHook";

export interface CreationActionHookParams {
  libelleAction: string;
  requete?: IRequeteTableauInformation | IRequeteTableauDelivrance;
  callback?: () => void;
}

export function useCreationAction(params: CreationActionHookParams | undefined) {
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
      if (params.callback) {
        params.callback();
      }
    }
  }, [idAction, params, navigation]);
}
