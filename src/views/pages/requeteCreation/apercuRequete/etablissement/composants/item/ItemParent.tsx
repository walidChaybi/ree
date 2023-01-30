import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import {
  estRenseigne,
  formatMajusculesMinusculesMotCompose
} from "@util/Utils";
import React from "react";
import Labels from "../../../../commun/Labels";
import { formatLigneNationalites } from "../Formatages";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { LigneDateNaissanceAdresse } from "./itemTitulaire/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "./itemTitulaire/LignesNomPrenom";

export interface ItemParentProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  domiciliation?: DomiciliationType;
  domiciliationParent2?: string;
  position: number;
  retenueSdanf?: IRetenueSdanf;
}

const ItemParent: React.FC<ItemParentProps & ItemProps> = ({
  parent2Enfant = false,
  ...props
}) => {
  return (
    <Item className={{ title: "bg-clair" }} {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />

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
          formatMajusculesMinusculesMotCompose(
            formatLigneNationalites(props.nationalites)
          ) ?? Labels.resume.nationalite.defaut
        }
      />

      {parent2Enfant && (
        <>
          <ItemLigne texte={props.domiciliationParent2} />
        </>
      )}
    </Item>
  );
};

export default ItemParent;
