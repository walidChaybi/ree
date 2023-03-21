import { estRenseigne } from "@util/Utils";
import React from "react";

interface ItemLigneInfosProps {
  label?: string;
  texte?: string;
  ariaLabel?: string;
  visible?: boolean;
}

export const LigneAccordion: React.FC<ItemLigneInfosProps> = ({
  texte,
  visible = estRenseigne(texte),
  ...props
}) => {
  return visible ? (
    <div className="LigneAccordion">
      {props.label && <div className="labelAccordion">{props.label}</div>}

      <div
        className="texteAccordion"
        title={texte}
        aria-label={props.ariaLabel}
      >
        {texte}
      </div>
    </div>
  ) : (
    <></>
  );
};
