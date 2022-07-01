import React from "react";
import Labels from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import { AccordeonInfos, ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";

export interface ItemParentProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
}

const ItemParent: React.FC<ItemParentProps & ItemProps> = props => {
  return (
    <AccordeonInfos {...props}>
      <ItemLigne
        label={Labels.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={props.numeros.requeteLiee !== undefined}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.nationalite.defaut
        }
      />
    </AccordeonInfos>
  );
};

export default ItemParent;
