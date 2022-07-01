import React from "react";
import Labels, { UNION } from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";

export interface ItemUnionProps {
  numeros?: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  mariage?: DateCoordonneesType;
  PACS?: DateCoordonneesType;
  union?: DateCoordonneesType;
  dissolution?: DateCoordonneesType;
  deces?: DateCoordonneesType;
}

const ItemUnion: React.FC<ItemUnionProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.requete.liee}
        texte={`N° ${props.numeros?.requeteLiee}`}
        visible={props.numeros?.requeteLiee !== undefined}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.nationalite.defaut
        }
      />
      <ItemLigne
        label={Labels.union.mariage}
        texte={formatLigneDateCoordonnees(props.mariage)}
      />
      <ItemLigne
        label={Labels.union.PACS}
        texte={formatLigneDateCoordonnees(props.PACS)}
      />
      <ItemLigne
        label={UNION}
        texte={formatLigneDateCoordonnees(props.union)}
      />
      <ItemLigne
        label={Labels.union.dissolution}
        texte={formatLigneDateCoordonnees(props.dissolution)}
      />
      <ItemLigne
        label={Labels.union.deces}
        texte={formatLigneDateCoordonnees(props.deces)}
      />
    </Item>
  );
};

export default ItemUnion;
