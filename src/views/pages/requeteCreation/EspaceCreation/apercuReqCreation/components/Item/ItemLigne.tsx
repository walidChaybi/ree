import { estRenseigne } from "@util/Utils";
import React from "react";
import { formatLigne } from "../Formatages";

interface ItemLigneInfosProps {
  label?: string;
  texte?: string | JSX.Element[] | 0;
  classNameTexte?: string;
  onClickTexte?: () => void;
  visible?: boolean;
}

export const ItemLigne: React.FC<ItemLigneInfosProps> = ({
  texte,
  visible = estRenseigne(texte),
  ...props
}) => {
  props.classNameTexte = formatLigne(
    ["texte", props.onClickTexte && "link", props.classNameTexte],
    " "
  );

  return visible ? (
    <div className="ligne">
      {props.label && <div className="titre">{props.label}</div>}

      <div className={props.classNameTexte} onClick={props.onClickTexte}>
        {texte}
      </div>
    </div>
  ) : (
    <></>
  );
};
