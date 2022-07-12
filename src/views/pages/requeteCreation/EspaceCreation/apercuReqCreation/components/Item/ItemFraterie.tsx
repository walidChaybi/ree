import React from "react";
import Labels from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import Item, { ItemProps } from "./Item";
import { ItemEnfantMajeurProps as ItemFraterieProps } from "./ItemEnfantMajeur";
import { ItemLigne } from "./ItemLigne";

const ItemFraterie: React.FC<ItemFraterieProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.resume.nationalite.defaut
        }
      />
    </Item>
  );
};

export default ItemFraterie;
