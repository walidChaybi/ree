import { NavigationApercuReqCreationParams } from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";

export function setParamsUseApercuCreation(
  idRequete: string,
  setParamsCreation: (params: NavigationApercuReqCreationParams) => void,
  sousType: string,
  statut?: string,
  idUtilisateur?: string
) {
  const sousTypeRequete = SousTypeCreation.getEnumFromLibelleCourt(sousType);
  const statutRequete = StatutRequete.getEnumFromLibelle(statut);
  return setParamsCreation({
    idRequete: idRequete,
    sousType: sousTypeRequete,
    statut: statutRequete,
    idUtilisateur: idUtilisateur
  });
}

export interface OngletProps {
  titre: string;
  index: number;
  component: JSX.Element;
}
