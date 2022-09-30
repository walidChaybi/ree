import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { estRenseigne } from "@util/Utils";
import React from "react";
import Labels from "../../Labels";
import { formatLigneNationalites } from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { LigneDateNaissanceAdresse } from "./ItemTitulaire/LigneDateNaissanceAdresse";
import { LigneNomPrenomActuel } from "./ItemTitulaire/LigneNomPrenomActuel";

export interface ItemParentProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  domiciliation?: string;
  retenueSdanf?: IRetenueSdanf;
}

const ItemParent: React.FC<ItemParentProps & ItemProps> = props => {
  return (
    <Item className={{ title: "bg-clair" }} {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />

      <LigneNomPrenomActuel
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
        afficherNomActuel={false}
        afficherNomUsage={false}
      />

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

      <ItemLigne texte={props.domiciliation} />
    </Item>
  );
};

export default ItemParent;
