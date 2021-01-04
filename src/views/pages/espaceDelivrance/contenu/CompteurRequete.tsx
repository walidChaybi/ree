import React from "react";
import { useCompteurRequeteHook } from "../hook/CompteurRequeteHook";
import { getText } from "../../../common/widget/Text";
import "./sass/CompteurRequete.scss";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

interface CompteurRequeteProps {
  officier: IOfficierSSOApi;
  reloadCompteur?: boolean;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  const { nombreRequetesState } = useCompteurRequeteHook(
    props.officier,
    props.reloadCompteur
  );

  return (
    <span className={"compteur-requetes"}>
      {getText("pages.delivrance.mesRequetes.totalRequetesASigner", [
        nombreRequetesState
      ])}
    </span>
  );
};
