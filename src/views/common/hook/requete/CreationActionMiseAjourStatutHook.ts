import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { useContext, useEffect, useState } from "react";

export interface ICreationActionMiseAjourStatutHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  requete?:
    | IRequeteTableauInformation
    | IRequeteTableauDelivrance
    | IRequeteTableauCreation;
  pasDeTraitementAuto?: boolean;
  callback?: () => void;
}

export function useCreationActionMiseAjourStatut(
  params?: ICreationActionMiseAjourStatutHookParams
) {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<ICreationActionEtMiseAjourStatutParams>();

  useEffect(() => {
    if (params) {
      setCreationActionEtMiseAjourStatutParams({
        libelleAction: params?.libelleAction,
        statutRequete: params?.statutRequete,
        requeteId: params?.requete?.idRequete
      });
    }
  }, [params]);

  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  useEffect(() => {
    if (idAction && params?.requete) {
      // Mise à jour du statut de la requête après l'appel à "usePostCreationActionEtMiseAjourStatutApi"
      params.requete.statut = params?.statutRequete.libelle;
      // Mise à jour de l'id utilisateur
      params.requete.idUtilisateur = utilisateurConnecte?.idUtilisateur;
      if (params.callback) {
        params.callback();
      }
    }
  }, [idAction, params]);
}
