import { Residence } from "@model/requete/enum/Residence";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { estRenseigne } from "@util/Utils";
import React from "react";
import Labels from "../../Labels";
import { formatLigneNationalites } from "../Formatages";
import { DateCoordonneesType, IdentiteType, NationaliteType } from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import ItemParent, { ItemParentProps } from "./ItemParent";
import { LigneDateNaissanceAdresse } from "./ItemTitulaire/LigneDateNaissanceAdresse";
import { LigneFrancisationIdentification } from "./ItemTitulaire/LigneFrancisationIdentification";
import { LigneNomPrenomActuel } from "./ItemTitulaire/LigneNomPrenomActuel";

export interface ItemEffetCollectifProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  statut?: string;
  residence?: Residence;
  domiciliation?: string;
  parent?: ItemParentProps;
  retenueSdanf?: IRetenueSdanf;
}

const VALIDE = "Validé";

const ItemEffetCollectif: React.FC<
  ItemEffetCollectifProps & ItemProps
> = props => {
  const idDeuxiemeParent = 2;

  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />

      <LigneNomPrenomActuel
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
        afficherNomActuel={false}
      />

      <LigneFrancisationIdentification
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
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

      {props.statut === VALIDE && (
        <ItemLigne label={Labels.resume.effetCollectif} texte={props.statut} />
      )}

      {props.parent && (
        <ItemParent
          {...props.parent}
          titre={Labels.resume.parent}
          numeroItem={idDeuxiemeParent}
          retenueSdanf={props.parent.retenueSdanf}
          parent2Enfant={true}
        />
      )}
    </Item>
  );
};

export default ItemEffetCollectif;
