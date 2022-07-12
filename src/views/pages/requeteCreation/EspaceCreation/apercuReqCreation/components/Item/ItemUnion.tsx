import React from "react";
import { estRenseigne } from "../../../../../../common/util/Utils";
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
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros?.requeteLiee}`}
        visible={estRenseigne(props.numeros?.requeteLiee)}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.resume.nationalite.defaut
        }
      />
      <ItemLigne
        label={Labels.resume.union.mariage}
        texte={formatLigneDateCoordonnees(props.mariage)}
      />
      <ItemLigne
        label={Labels.resume.union.PACS}
        texte={formatLigneDateCoordonnees(props.PACS)}
      />
      <ItemLigne
        label={UNION}
        texte={formatLigneDateCoordonnees(props.union)}
      />
      <ItemLigne
        label={Labels.resume.union.dissolution}
        texte={formatLigneDateCoordonnees(props.dissolution)}
      />
      <ItemLigne
        label={Labels.resume.union.deces}
        texte={formatLigneDateCoordonnees(props.deces)}
      />
    </Item>
  );
};

export default ItemUnion;
