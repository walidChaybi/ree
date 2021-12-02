import React from "react";
import { getLibelle } from "../../../../../common/widget/Text";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHookV2";
import "./scss/CompteurRequeteV2.scss";

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
