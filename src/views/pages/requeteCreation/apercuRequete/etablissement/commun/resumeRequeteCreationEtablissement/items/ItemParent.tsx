import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { DomiciliationType } from "@model/requete/DomiciliationType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NationaliteType } from "@model/requete/NationaliteType";
import {
  estRenseigne,
  formatMajusculesMinusculesMotCompose,
  getLibelle
} from "@util/Utils";
import React from "react";
import Labels from "../../../../../commun/Labels";
import { formatLigneNationalites } from "../formatages";
import { LigneDateNaissanceAdresse } from "../lignes/LigneDateNaissanceAdresse";
import { LignesNomPrenoms } from "../lignes/LignesNomPrenom";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";

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
  const estPereOuMere = (parent?: IdentiteType) => {
    switch (Sexe.getEnumFromLibelle(parent?.genre?.libelle)) {
      case Sexe.MASCULIN:
        return getLibelle(`Père (Parent ${props.numeroItem})`);
      case Sexe.FEMININ:
        return getLibelle(`Mère (Parent ${props.numeroItem})`);
      default:
        return props.titre;
    }
  };

  const titreParent = estPereOuMere(props.identite);

  return (
    <Item className={{ title: "bg-clair" }} {...props} titre={titreParent}>
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

      {parent2Enfant && (
        <>
          <ItemLigne texte={props.domiciliationParent2} />
        </>
      )}
    </Item>
  );
};

export default ItemParent;
