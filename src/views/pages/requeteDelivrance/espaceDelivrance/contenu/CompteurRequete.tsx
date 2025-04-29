import { StatutRequete } from "@model/requete/enum/StatutRequete";
import React from "react";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import "./scss/CompteurRequete.scss";

interface CompteurRequeteProps {
  reloadCompteur: boolean;
}

const STATUT_REQUETE_A_SIGNER = [StatutRequete.A_SIGNER.nom];

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  // TODO : replace useCompteurRequeteHook by useFetchApi(CONFIG_GET_NOMBRE_REQUETE);
  const { nombreRequetesState } = useCompteurRequeteHook(props.reloadCompteur, STATUT_REQUETE_A_SIGNER);

  return <span className={"compteur-requetes"}>{`${"Total de requêtes à signer : "} ${nombreRequetesState}`}</span>;
};
