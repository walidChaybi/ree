import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { useCallback, useEffect, useState } from "react";
import { ICreationActionMiseAjourStatutHookParams, useCreationActionMiseAjourStatut } from "./CreationActionMiseAjourStatutHook";

export interface ICreationActionMiseAjourStatutEtRedirectionParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  urlCourante: string;
  requete?: IRequeteTableauDelivrance | IRequeteTableauCreation;
  typeRequete: TypeRequete;
  handleTraitementTermine?: () => void;
  autoriserTraitementAutoRDCS?: boolean;
}

export function useCreationActionMiseAjourStatutEtRedirectionHook(params: ICreationActionMiseAjourStatutEtRedirectionParams | undefined) {
  const [paramsMiseAjourStatut, setParamsMiseAjourStatut] = useState<ICreationActionMiseAjourStatutHookParams | undefined>();
  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);
  const [paramsCreation, setParamsCreation] = useState<NavigationApercuReqCreationParams | undefined>();

  // 1)
  useCreationActionMiseAjourStatut(paramsMiseAjourStatut);

  // 2) Seul l'un des deux hook ci-dessous est appelé
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);
  useNavigationApercuCreation(paramsCreation);

  useEffect(() => {
    if (params?.requete) {
      setParamsMiseAjourStatut({
        ...params,
        callback
      });
    }
  }, [params]);

  const callback = useCallback(() => {
    if (params?.requete) {
      const sousType = SousTypeCreation.getEnumFromLibelleCourt(params.requete?.sousType);
      const statut = StatutRequete.getEnumFromLibelle(params?.requete?.statut);
      if (params.typeRequete === TypeRequete.CREATION) {
        setParamsCreation({
          idRequete: params.requete.idRequete,
          sousType,
          statut,
          idUtilisateur: params.requete.idUtilisateur,
          handleTraitementTermine: params.handleTraitementTermine
        });
      } else {
        setNavigationApercuDelivranceParams({
          requete: params.requete as IRequeteTableauDelivrance,
          urlCourante: params.urlCourante,
          autoriserTraitementAutoRDCS: params.autoriserTraitementAutoRDCS
        });
      }
    }
  }, [params]);
}
