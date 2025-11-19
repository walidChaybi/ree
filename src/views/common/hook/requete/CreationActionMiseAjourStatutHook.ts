import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";

export interface ICreationActionMiseAjourStatutHookParams {
  statutRequete: keyof typeof EStatutRequete;
  libelleAction: string;
  requete?:
    | IRequeteTableauInformation
    | IRequeteTableauDelivrance
    | IRequeteTableauCreation
    | RequeteTableauRMC<"DELIVRANCE">
    | RequeteTableauRMC<"CREATION">
    | RequeteTableauRMC<"INFORMATION">;
  callback?: () => void;
}

export function useCreationActionMiseAjourStatut(params?: ICreationActionMiseAjourStatutHookParams) {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [creationActionEtMiseAjourStatutParams, setCreationActionEtMiseAjourStatutParams] =
    useState<ICreationActionEtMiseAjourStatutParams>();

  useEffect(() => {
    if (params) {
      setCreationActionEtMiseAjourStatutParams({
        libelleAction: params.libelleAction,
        statutRequete: params.statutRequete,
        requeteId: params.requete && "idRequete" in params.requete ? params?.requete?.idRequete : params?.requete?.id
      });
    }
  }, [params]);

  const idAction = usePostCreationActionEtMiseAjourStatutApi(creationActionEtMiseAjourStatutParams);

  useEffect(() => {
    if (idAction && params?.requete) {
      // Mise à jour du statut de la requête après l'appel à "usePostCreationActionEtMiseAjourStatutApi"
      params.requete.statut = EStatutRequete[params?.statutRequete];
      // Mise à jour de l'id utilisateur
      params.requete.idUtilisateur = utilisateurConnecte.id;
      params.callback?.();
    }
  }, [idAction, params]);
}
