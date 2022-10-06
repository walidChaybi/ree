import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import React from "react";
import Labels, { INFOS } from "../../../Labels";
import {
  formatLigne,
  formatLigneAdresse,
  formatLigneNationalites
} from "../../Formatages";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "../../Types";
import Item, { ItemProps } from "../Item";
import { ItemLigne } from "../ItemLigne";
import ItemParent, { ItemParentProps } from "../ItemParent";
import { LigneDateNaissanceAdresse } from "./LigneDateNaissanceAdresse";
import { LigneFrancisationIdentification } from "./LigneFrancisationIdentification";
import { LigneNomPrenomActuel } from "./LigneNomPrenomActuel";

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
  const texteContacts = formatLigne(
    [props.contacts.mail, props.contacts.telephone],
    " "
  );

  return (
    <Item {...props}>
      <LigneNomPrenomActuel
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
        afficherNomUsage={false}
      />

      <LigneFrancisationIdentification
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
      />

      <LigneDateNaissanceAdresse
        naissance={props.naissance}
        retenueSdanf={props.retenueSdanf}
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
        <ItemLigne
          texte={
            formatLigneNationalites(props.nationalites) ??
            Labels.resume.nationalite.defaut
          }
        />
        {props.domiciliation.lignes.map((ligne, id) => (
          <ItemLigne key={`ligne${id}`} texte={ligne} />
        ))}
        <ItemLigne texte={formatLigneAdresse(props.domiciliation)} />
        <ItemLigne texte={texteContacts} />
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
