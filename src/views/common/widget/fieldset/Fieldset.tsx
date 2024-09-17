import React from "react";
import "./scss/Fieldset.scss";

interface FieldsetProps {
  titre: string;
}
export const Fieldset: React.FC<React.PropsWithChildren<FieldsetProps>> = ({
  titre,
  children
}) => {
  return (
    <div className="Fieldset">
      <div className="Titre">
        <span>{titre}</span>
      </div>
      {children}
    </div>
  );
};
