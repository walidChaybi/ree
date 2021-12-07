import React from "react";
import { getLibelle } from "../../../../common/util/Utils";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import "./scss/CompteurRequete.scss";

interface CompteurRequeteProps {
  reloadCompteur: boolean;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  const { nombreRequetesState } = useCompteurRequeteHook(props.reloadCompteur);

  return (
    <span className={"compteur-requetes"}>
      {`${getLibelle("Total de requêtes à signer : ")} ${nombreRequetesState}`}
    </span>
  );
};
