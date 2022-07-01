import React from "react";
import { DEUX } from "../../../../../../common/util/Utils";
import Labels from "../../Labels";
import {
  formatLigneAdresse,
  formatLigneDateCoordonnees,
  formatLigneFrancisationIdentification,
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
import ItemParent, { ItemParentProps } from "./ItemParent";

export interface ItemEffetCollectifProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  statut?: string;
  residence?: string;
  domiciliation: DomiciliationType;
  parent?: ItemParentProps;
}

const ItemEffetCollectif: React.FC<
  ItemEffetCollectifProps & ItemProps
> = props => {
  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={props.numeros.requeteLiee !== undefined}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne
        texte={formatLigneFrancisationIdentification(props.identite)}
      />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.nationalite.defaut
        }
      />
      <ItemLigne label={Labels.effetCollectif} texte={props.statut} />
      <ItemLigne label={Labels.residence} texte={props.residence} />
      {props.domiciliation.lignes.map((ligne, id) => (
        <ItemLigne key={`ligne${id}`} texte={ligne} />
      ))}
      <ItemLigne texte={formatLigneAdresse(props.domiciliation)} />
      {props.parent && (
        <ItemParent
          {...props.parent}
          titre={Labels.parent}
          numeroItem={DEUX}
          etendu={false}
        />
      )}
    </Item>
  );
};

export default ItemEffetCollectif;
