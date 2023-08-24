import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NationaliteType } from "@model/requete/NationaliteType";
import { formatMajusculesMinusculesMotCompose } from "@util/Utils";
import React from "react";
import Labels from "../../../../../commun/Labels";
import { formatLigneNationalites } from "../formatages";
import { LigneDateNaissanceAdresse } from "../lignes/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "../lignes/LignesNomPrenom";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
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

export default ItemEnfantMajeur;
