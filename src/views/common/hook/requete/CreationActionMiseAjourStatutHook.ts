import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../common/hook/requete/ActionHook";
import { storeRece } from "../../../common/util/storeRece";

export interface CreationActionMiseAjourStatutHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  requete?: IRequeteTableauInformation | IRequeteTableauDelivrance;
  pasDeTraitementAuto?: boolean;
  callback?: () => void;
}

export function useCreationActionMiseAjourStatut(
  params: CreationActionMiseAjourStatutHookParams | undefined
) {
  const history = useHistory();
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams | undefined>();

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
    if (idAction && params && params.requete) {
      // Mise à jour du statut de la requête après l'appel à "usePostCreationActionEtMiseAjourStatutApi"
      params.requete.statut = params?.statutRequete.libelle;
      // Mise à jour de l'id utilisateur
      params.requete.idUtilisateur =
        storeRece.utilisateurCourant?.idUtilisateur;
      if (params.callback) {
        params.callback();
      }
    }
  }, [idAction, params, history]);
}
