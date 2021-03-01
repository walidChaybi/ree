import React from "react";
import "./sass/Fieldset.scss";

interface FieldsetProps {
  titre: string;
}
export const Fieldset: React.FC<FieldsetProps> = props => {
  return (
    <div className="Fieldset">
      <div className="Titre">
        <span>{props.titre}</span>
      </div>
      {props.children}
    </div>
  );
};
