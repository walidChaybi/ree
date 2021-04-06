import React from "react";
import "./scss/SousFormulaire.scss";

interface SousFormulaireProps {
  titre?: string;
}
export const SousFormulaire: React.FC<SousFormulaireProps> = props => {
  return (
    <div className="SousFormulaire">
      <div className="Titre">
        <span>{props.titre ? props.titre : ""}</span>
      </div>
      <div className="ElementForm"> {props.children}</div>
    </div>
  );
};
