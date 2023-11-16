import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NationaliteType } from "@model/requete/NationaliteType";
import React from "react";
import Item, { ItemProps } from "./Item";
import { ItemGenerique } from "./ItemGenerique";
export interface ItemEnfantMajeurProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  retenueSdanf?: IRetenueSdanf;
}

const ItemEnfantMajeur: React.FC<ItemEnfantMajeurProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <ItemGenerique {...props} />
    </Item>
  );
};

export default ItemEnfantMajeur;
