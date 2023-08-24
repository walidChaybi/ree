import { estRenseigne, formatLigne } from "@util/Utils";
import React from "react";

interface ItemLigneInfosProps {
  label?: string;
  texte?: string | JSX.Element[] | 0;
  classNameTexte?: string;
  onClickTexte?: () => void;
  visible?: boolean;
  separateur?: string;
  separateurVisible?: boolean;
  separateurDebut?: boolean;
  separateurFin?: boolean;
}

export const ItemLigne: React.FC<ItemLigneInfosProps> = ({
  texte,
  visible = estRenseigne(texte),
  separateur,
  separateurVisible = true,
  separateurDebut = true,
  separateurFin = true,
  ...props
}) => {
  props.classNameTexte = formatLigne(
    ["texte", props.onClickTexte && "link", props.classNameTexte],
    " "
  );

  return visible ? (
    <div className="ligne">
      <span className="separateur">{separateurDebut && separateur}</span>
      {props.label && <div className="titre">{props.label}</div>}

      <div className={props.classNameTexte} onClick={props.onClickTexte}>
        {texte}
      </div>

      <span className="separateur">{separateurFin && separateur}</span>
    </div>
  ) : (
    <></>
  );
};
