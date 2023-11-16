import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { DomiciliationType } from "@model/requete/DomiciliationType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NationaliteType } from "@model/requete/NationaliteType";
import { getLibelle } from "@util/Utils";
import React from "react";
import Item, { ItemProps } from "./Item";
import { ItemGenerique } from "./ItemGenerique";
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
      <ItemGenerique {...props} />

      {parent2Enfant && (
        <>
          <ItemLigne texte={props.domiciliationParent2} />
        </>
      )}
    </Item>
  );
};

export default ItemParent;
