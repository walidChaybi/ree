import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { useEffect, useState } from "react";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "../navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "../navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { ICreationActionMiseAjourStatutHookParams, useCreationActionMiseAjourStatut } from "./CreationActionMiseAjourStatutHook";

export interface ICreationActionMiseAjourStatutEtRedirectionParams {
  statutRequete: keyof typeof EStatutRequete;
  libelleAction: string;
  requete?: IRequeteTableauDelivrance | IRequeteTableauCreation | RequeteTableauRMC<"DELIVRANCE"> | RequeteTableauRMC<"CREATION">;
  typeRequete: keyof typeof ETypeRequete;
  handleTraitementTermine?: () => void;
  autoriserTraitementAutoRDCS?: boolean;
}

export const useCreationActionMiseAjourStatutEtRedirectionHook = (
  params: ICreationActionMiseAjourStatutEtRedirectionParams | undefined
) => {
  const [paramsMiseAjourStatut, setParamsMiseAjourStatut] = useState<ICreationActionMiseAjourStatutHookParams | undefined>();
  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);
  const [paramsCreation, setParamsCreation] = useState<NavigationApercuReqCreationParams | undefined>();

  // 1)
  useCreationActionMiseAjourStatut(paramsMiseAjourStatut);

  // 2) Seul l'un des deux hook ci-dessous est appelé
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);
  useNavigationApercuCreation(paramsCreation);

  useEffect(() => {
    if (!params?.requete) return;

    setParamsMiseAjourStatut({
      ...params,
      callback: () => {
        if (!params?.requete) return;

        if (params.typeRequete === "CREATION") {
          setParamsCreation({
            idRequete: "idRequete" in params.requete ? params.requete.idRequete : params.requete.id,
            sousType:
              "idRequete" in params.requete ? SousTypeCreation.getEnumFromLibelleCourt(params.requete?.sousType) : params.requete?.sousType,
            statut: "idRequete" in params.requete ? StatutRequete.getEnumFromLibelle(params?.requete?.statut) : params?.requete?.statut,
            idUtilisateur: params.requete.idUtilisateur ?? undefined,
            handleTraitementTermine: params.handleTraitementTermine
          });
        } else {
          setNavigationApercuDelivranceParams({
            requete: params.requete as IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">,
            autoriserTraitementAutoRDCS: params.autoriserTraitementAutoRDCS
          });
        }
      }
    });
  }, [params]);
};
