import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import {
  formatLigne,
  formatMajusculesMinusculesMotCompose,
  getLibelle
} from "@util/Utils";
import React from "react";
import { LienEmail } from "../../../../../../../common/widget/contact/LienEmail";
import Labels, { INFOS } from "../../../../../commun/Labels";
import { formatagePrenoms } from "../../../mappingIRequeteCreationVersResumeRequeteCreationProps";
import { formatLigneAdresse, formatLigneNationalites } from "../../Formatages";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "../../Types";
import Item, { ItemProps } from "../Item";
import { ItemLigne } from "../ItemLigne";
import { ItemLigneSdanf } from "../ItemLigneSdanf";
import ItemParent, { ItemParentProps } from "../ItemParent";
import { LigneDateNaissanceAdresse } from "./LigneDateNaissanceAdresse";
import { LigneFrancisationIdentification } from "./LigneFrancisationIdentification";

export interface ItemTitulaireProps {
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nbUnionsAnterieurs: number;
  situationFamiliale?: SituationFamiliale;
  nbMineurs?: number;
  nationalites: NationaliteType[];
  domiciliation: DomiciliationType;
  retenueSdanf?: IRetenueSdanf;
  contacts: {
    mail?: string;
    telephone?: string;
  };
  parents: (ItemParentProps | undefined)[];
}

const ItemTitulaire: React.FC<ItemTitulaireProps & ItemProps> = props => {
  return (
    <Item {...props}>
      <div className="itemLigneTitulaire">
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
            props.retenueSdanf?.nomActuel
              ? `(${getLibelle("Actuel : ")}${props.retenueSdanf?.nomActuel})`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.actuel
              ? `(${getLibelle("Actuel : ")}${props.identite.noms.actuel})`
              : undefined
          }
          separateurVisible={false}
        />
      </div>

      <div className="itemLigneTitulaire">
        <ItemLigneSdanf
          separateurVisible={false}
          texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
          texteSdanf={formatLigne(
            formatagePrenoms(props.retenueSdanf?.prenomsRetenu)
          )}
        />
      </div>

      <LigneFrancisationIdentification
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

      <Item titre={INFOS} className={{ title: "bg-clair" }} etendu={false}>
        <ItemLigne
          label={Labels.resume.union.anterieurs}
          texte={props.nbUnionsAnterieurs.toString()}
        />
        <ItemLigne texte={props.situationFamiliale?.libelle} />
        <ItemLigne
          label={Labels.resume.enfant.mineurs}
          texte={props.nbMineurs?.toString()}
        />
        {props.domiciliation.lignes.map((ligne, id) => (
          <ItemLigne key={`ligne${id}`} texte={ligne} />
        ))}
        <ItemLigne texte={formatLigneAdresse(props.domiciliation)} />

        <div className="contact">
          <LienEmail email={props.contacts.mail} />
          <ItemLigne texte={props.contacts.telephone} />
        </div>
      </Item>
      {props.parents.map(
        (parent, id) =>
          parent && (
            <ItemParent
              {...parent}
              key={Labels.resume.parent + String(id + 1)}
              titre={Labels.resume.parent}
              numeroItem={id + 1}
              totalItems={props.parents.length}
            />
          )
      )}
    </Item>
  );
};

export default ItemTitulaire;
