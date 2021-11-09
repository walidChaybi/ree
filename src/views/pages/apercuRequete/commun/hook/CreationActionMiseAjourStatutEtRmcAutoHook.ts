import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../../common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuRMCAutoHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../common/hook/v2/requete/ActionHook";
import { storeRece } from "../../../../common/util/storeRece";

export interface CreationActionMiseAjourStatutEtRmcAutoHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  urlCourante: string;
  requete?: IRequeteTableauDelivrance;
  pasDeTraitementAuto?: boolean;
}

export function useCreationActionMiseAjourStatutEtRmcAuto(
  params: CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
) {
  const [paramsRMCAuto, setParamsRMCAuto] =
    useState<INavigationApercuRMCAutoParams | undefined>();

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
      setParamsRMCAuto({
        requete: params.requete,
        urlCourante: params.urlCourante,
        pasDeTraitementAuto: params.pasDeTraitementAuto
      });
    }
  }, [idAction, params]);

  useNavigationApercuRMCAuto(paramsRMCAuto);
}
