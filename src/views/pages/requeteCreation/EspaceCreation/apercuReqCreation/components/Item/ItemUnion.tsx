import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { estRenseigne } from "@util/Utils";
import React from "react";
import Labels, { UNION } from "../../Labels";
import {
  formatLigneDateCoordonnees,
  formatLigneNationalites
} from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { LigneDateNaissanceAdresse } from "./ItemTitulaire/LigneDateNaissanceAdresse";
import { LigneNomPrenomActuel } from "./ItemTitulaire/LigneNomPrenomActuel";

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
  retenueSdanf?: IRetenueSdanf;
}

const ItemUnion: React.FC<ItemUnionProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros?.requeteLiee}`}
        visible={estRenseigne(props.numeros?.requeteLiee)}
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
