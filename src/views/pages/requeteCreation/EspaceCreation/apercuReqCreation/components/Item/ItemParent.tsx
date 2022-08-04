import React from "react";
import { estRenseigne } from "../../../../../../common/util/Utils";
import Labels from "../../Labels";
import {
  formatLigneAdresse,
  formatLigneDateCoordonnees,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";

export interface ItemParentProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  domiciliation: DomiciliationType;
}

const ItemParent: React.FC<ItemParentProps & ItemProps> = props => {
  return (
    <Item className={{ title: "bg-clair" }} {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.resume.nationalite.defaut
        }
      />
      {props.domiciliation.lignes.map((ligne, id) => (
        <ItemLigne key={`ligne${id}`} texte={ligne} />
      ))}
      <ItemLigne texte={formatLigneAdresse(props.domiciliation)} />
    </Item>
  );
};

export default ItemParent;
