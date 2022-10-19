import { estRenseigne, formatLigne } from "@util/Utils";
import React from "react";

interface ItemLigneInfosProps {
  label?: string;
  texte?: string | JSX.Element[] | 0;
  classNameLabel?: string;
  classNameTexte?: string;
  onClickTexte?: () => void;
  visible?: boolean;
}

export const ItemLibelle: React.FC<ItemLigneInfosProps> = ({
  texte,
  visible = true,
  ...props
}) => {
  props.classNameLabel = formatLigne(["titre", props.classNameLabel], " ");
  props.classNameTexte = formatLigne(["texte", props.classNameTexte], " ");

  return visible && estRenseigne(texte) ? (
    <div className="ligne">
      {props.label && <div className={props.classNameLabel}>{props.label}</div>}

      <div className={props.classNameTexte} onClick={props.onClickTexte}>
        {texte}
      </div>
    </div>
  ) : null;
};
