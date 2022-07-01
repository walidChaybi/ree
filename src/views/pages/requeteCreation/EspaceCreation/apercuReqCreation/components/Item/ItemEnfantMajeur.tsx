import React from "react";
import Labels from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";

export interface ItemEnfantMajeurProps {
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
}

const ItemEnfantMajeur: React.FC<ItemEnfantMajeurProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.nationalite.defaut
        }
      />
    </Item>
  );
};

export default ItemEnfantMajeur;
