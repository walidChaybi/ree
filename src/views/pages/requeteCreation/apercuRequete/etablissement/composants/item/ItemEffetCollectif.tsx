import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { Residence } from "@model/requete/enum/Residence";
import { IdentiteType } from "@model/requete/IdentiteType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { NationaliteType } from "@model/requete/NationaliteType";
import {
  estRenseigne,
  formatLigne,
  formatMajusculesMinusculesMotCompose,
  getLibelle
} from "@util/Utils";
import React from "react";
import Labels from "../../../../commun/Labels";
import { formatagePrenoms } from "../../mappingIRequeteCreationVersResumeRequeteCreationProps";
import { formatLigneNationalites } from "../Formatages";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { ItemLigneSdanf } from "./ItemLigneSdanf";
import ItemParent, { ItemParentProps } from "./ItemParent";
import { LigneDateNaissanceAdresse } from "./itemTitulaire/LigneDateNaissanceAdresse";
import { LigneFrancisationIdentification } from "./itemTitulaire/LigneFrancisationIdentification";
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

      <div className="itemLigneEffetCollectif">
        <ItemLigneSdanf
          separateur={""}
          texteSdanf={
            props.retenueSdanf?.nomNaissance
              ? `${props.retenueSdanf?.nomNaissance}`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.naissance
              ? `${props.identite.noms.naissance}`
              : undefined
          }
        />

        <ItemLigneSdanf
          texteSdanf={
            props.retenueSdanf?.nomUsage
              ? `(${getLibelle("Usage :")}${props.retenueSdanf?.nomUsage})`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.usage
              ? `(${getLibelle("Usage :")}${props.identite.noms.usage})`
              : undefined
          }
          separateurVisible={false}
        />
      </div>

      <div>
        <ItemLigneSdanf
          texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
          texteSdanf={formatLigne(
            formatagePrenoms(props.retenueSdanf?.prenomsRetenu)
          )}
          separateurVisible={false}
        />
      </div>

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
          formatMajusculesMinusculesMotCompose(
            formatLigneNationalites(props.nationalites)
          ) ?? Labels.resume.nationalite.defaut
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
