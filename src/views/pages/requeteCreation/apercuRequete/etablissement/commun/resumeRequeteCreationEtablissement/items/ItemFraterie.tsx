import { formatMajusculesMinusculesMotCompose } from "@util/Utils";
import React from "react";
import Labels from "../../../../../commun/Labels";
import { formatLigneNationalites } from "../formatages";
import { LigneDateNaissanceAdresse } from "../lignes/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "../lignes/LignesNomPrenom";
import Item, { ItemProps } from "./Item";
import { ItemEnfantMajeurProps as ItemFraterieProps } from "./ItemEnfantMajeur";
import { ItemLigne } from "./ItemLigne";

const ItemFraterie: React.FC<ItemFraterieProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <LignesNomPrenoms
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
      />

      <ItemLigne texte={props.identite.genre?.libelle} />

      <LigneDateNaissanceAdresse
        naissance={props.naissance}
        retenueSdanf={props.retenueSdanf}
      />

      <ItemLigne
        texte={
          formatMajusculesMinusculesMotCompose(
            formatLigneNationalites(props.nationalites)
          ) ?? Labels.resume.nationalite.defaut
        }
      />
    </Item>
  );
};

export default ItemFraterie;
