import React from "react";
import "./scss/StaticField.scss";

interface StaticFieldProps {
  libelle: string;
  valeur: string;
}

export const StaticField: React.FC<StaticFieldProps> = props => {
  return (
    <div className="StaticField">
      <div className="Libelle">{props.libelle}</div>
      <div>{props.valeur}</div>
    </div>
  );
};
