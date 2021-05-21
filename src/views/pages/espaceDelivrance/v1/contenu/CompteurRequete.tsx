import React from "react";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import { getText } from "../../../../common/widget/Text";
import "./scss/CompteurRequete.scss";

interface CompteurRequeteProps {
  reloadCompteur: boolean;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  const { nombreRequetesState } = useCompteurRequeteHook(props.reloadCompteur);

  return (
    <span className={"compteur-requetes"}>
      {getText("pages.delivrance.mesRequetes.totalRequetesASigner", [
        nombreRequetesState
      ])}
    </span>
  );
};
