import React from "react";
import { IOfficierSSOApi } from "../../../core/login/LoginHook";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import { getText } from "../../../common/widget/Text";
import "./sass/CompteurRequete.scss";

interface CompteurRequeteProps {
  officier: IOfficierSSOApi;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = (props) => {
  const { nombreRequetesState } = useCompteurRequeteHook(props.officier);

  return (
    <span className={"compteur-requetes"}>
      {getText("pages.delivrance.mesRequetes.totalRequetesASigner", [
        nombreRequetesState
      ])}
    </span>
  );
};
