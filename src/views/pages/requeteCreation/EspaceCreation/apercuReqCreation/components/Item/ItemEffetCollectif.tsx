import React from "react";
import { estRenseigne } from "../../../../../../common/util/Utils";
import Labels from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneFrancisationIdentification,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
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
  domiciliation?: string;
  parent?: ItemParentProps;
}

const ItemEffetCollectif: React.FC<
  ItemEffetCollectifProps & ItemProps
> = props => {
  const idDeuxiemeParent = 2;

  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne
        texte={formatLigneFrancisationIdentification(props.identite)}
      />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <ItemLigne
        texte={
          formatLigneNationalites(props.nationalites) ??
          Labels.resume.nationalite.defaut
        }
      />
      <ItemLigne label={Labels.resume.effetCollectif} texte={props.statut} />
      <ItemLigne label={Labels.resume.residence} texte={props.residence} />
      <ItemLigne texte={props.domiciliation} />
      {props.parent && (
        <ItemParent
          {...props.parent}
          titre={Labels.resume.parent}
          numeroItem={idDeuxiemeParent}
        />
      )}
    </Item>
  );
};

export default ItemEffetCollectif;
