import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { useCallback, useEffect, useState } from "react";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "../navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "./CreationActionMiseAjourStatutHook";

export interface ICreationActionMiseAjourStatutEtRmcAutoHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  urlCourante: string;
  requete?: IRequeteTableauDelivrance | IRequeteTableauCreation;
  pasDeTraitementAuto?: boolean;
  typeRequete: TypeRequete;
  handleTraitementTermine?: () => void;
}

export function useCreationActionMiseAjourStatutEtRmcAuto(
  params: ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
) {
  const [paramsMiseAjourStatut, setParamsMiseAjourStatut] = useState<
    ICreationActionMiseAjourStatutHookParams | undefined
  >();
  const [paramsRMCAutoDelivrance, setParamsRMCAutoDelivrance] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  const [paramsCreation, setParamsCreation] = useState<
    NavigationApercuReqCreationParams | undefined
  >();

  // 1)
  useCreationActionMiseAjourStatut(paramsMiseAjourStatut);

  // 2) Seul l'un des deux hook ci-dessous est appelé
  useNavigationApercuRMCAutoDelivrance(paramsRMCAutoDelivrance);
  useNavigationApercuCreation(paramsCreation);

  useEffect(() => {
    if (params && params.requete) {
      setParamsMiseAjourStatut({
        ...params,
        callback
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const callback = useCallback(() => {
    if (params && params.requete) {
      const sousType = SousTypeCreation.getEnumFromLibelleCourt(
        params?.requete?.sousType
      );
      const statut = StatutRequete.getEnumFromLibelle(
        params?.requete?.sousType
      );
      switch (params.typeRequete) {
        case TypeRequete.CREATION:
          setParamsCreation({
            idRequete: params.requete.idRequete,
            sousType,
            statut,
            handleTraitementTermine: params.handleTraitementTermine
          });
          break;
        default:
          setParamsRMCAutoDelivrance({
            requete: params.requete as IRequeteTableauDelivrance,
            urlCourante: params.urlCourante,
            pasDeTraitementAuto: params.pasDeTraitementAuto
          });
          break;
      }
    }
  }, [params]);
}
