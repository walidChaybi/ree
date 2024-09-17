import React from "react";
import "./scss/SousFormulaire.scss";

interface SousFormulaireProps {
  titre?: string;
}
export const SousFormulaire: React.FC<
  React.PropsWithChildren<SousFormulaireProps>
> = ({ titre, children }) => {
  return (
    <div className="SousFormulaire">
      {titre && (
        <div className="Titre">
          <span>{titre}</span>
        </div>
      )}
      <div className="ElementForm"> {children}</div>
    </div>
  );
};
