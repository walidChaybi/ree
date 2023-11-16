import {
  estRenseigne,
  formatMajusculesMinusculesMotCompose
} from "@util/Utils";
import React from "react";
import Labels from "../../../../../commun/Labels";
import { formatLigneNationalites } from "../formatages";
import { LigneDateNaissanceAdresse } from "../lignes/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "../lignes/LignesNomPrenom";
import { ItemProps } from "./Item";
import { ItemEnfantMajeurProps } from "./ItemEnfantMajeur";
import { ItemLigne } from "./ItemLigne";
import { ItemParentProps } from "./ItemParent";

export type ItemGenericProps = ItemParentProps | ItemEnfantMajeurProps;

export const ItemGenerique: React.FC<ItemGenericProps & ItemProps> = props => {
  return (
    <>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />
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
    </>
  );
};
