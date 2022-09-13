import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { getLibelle } from "@util/Utils";
import React from "react";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import "./scss/CompteurRequete.scss";

interface CompteurRequeteProps {
  reloadCompteur: boolean;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  const { nombreRequetesState } = useCompteurRequeteHook(props.reloadCompteur, [
    StatutRequete.A_SIGNER.nom
  ]);

  return (
    <span className={"compteur-requetes"}>
      {`${getLibelle("Total de requêtes à signer : ")} ${nombreRequetesState}`}
    </span>
  );
};
