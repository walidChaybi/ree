import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
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
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "./CreationActionMiseAjourStatutHook";

export interface ICreationActionMiseAjourStatutEtRmcAutoHookParams {
  statutRequete: StatutRequete;
  libelleAction: string;
  urlCourante: string;
  requete?: IRequeteTableauDelivrance | IRequeteTableauCreation;
  pasDeTraitementAuto?: boolean;
  typeRequete: TypeRequete;
}

export function useCreationActionMiseAjourStatutEtRmcAuto(
  params: ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
) {
  const [paramsMiseAjourStatut, setParamsMiseAjourStatut] = useState<
    CreationActionMiseAjourStatutHookParams | undefined
  >();
  const [paramsRMCAutoDelivrance, setParamsRMCAutoDelivrance] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  const [paramsCreation, setParamsCreation] = useState<
    NavigationApercuReqCreationParams | undefined
  >();

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
      switch (params.typeRequete) {
        case TypeRequete.CREATION:
          setParamsCreation({
            idRequete: params.requete.idRequete,
            urlCourante: params.urlCourante
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

  useCreationActionMiseAjourStatut(paramsMiseAjourStatut);

  useNavigationApercuRMCAutoDelivrance(paramsRMCAutoDelivrance);
  useNavigationApercuCreation(paramsCreation);
}
