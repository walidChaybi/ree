import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import React from "react";
import Labels from "../../Labels";
import { formatLigneNationalites } from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { LigneDateNaissanceAdresse } from "./ItemTitulaire/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "./ItemTitulaire/LignesNomPrenom";

export interface ItemEnfantMajeurProps {
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  retenueSdanf?: IRetenueSdanf;
}

const ItemEnfantMajeur: React.FC<ItemEnfantMajeurProps & ItemProps> = props => {
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

export default ItemEnfantMajeur;
