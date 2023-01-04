import React from "react";
import Labels from "../../Labels";
import { formatLigneNationalites } from "../Formatages";
import Item, { ItemProps } from "./Item";
import { ItemEnfantMajeurProps as ItemFraterieProps } from "./ItemEnfantMajeur";
import { ItemLigne } from "./ItemLigne";
import { LigneDateNaissanceAdresse } from "./ItemTitulaire/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "./ItemTitulaire/LignesNomPrenom";

const ItemFraterie: React.FC<ItemFraterieProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <LignesNomPrenoms
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
      />

      <ItemLigne texte={props.identite.genre.libelle} />

      <LigneDateNaissanceAdresse
        naissance={props.naissance}
        retenueSdanf={props.retenueSdanf}
      />

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
