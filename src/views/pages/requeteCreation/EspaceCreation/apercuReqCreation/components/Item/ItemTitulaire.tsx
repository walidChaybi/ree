import React from "react";
import Labels, { INFOS } from "../../Labels";
import {
  formatLigne,
  formatLigneAdresse,
  formatLigneDateCoordonnees,
  formatLigneFrancisationIdentification,
  formatLigneNationalites,
  formatLigneNomsPrenomsGenre
} from "../Formatages";
import {
  DateCoordonneesType,
  DomiciliationType,
  IdentiteType,
  NationaliteType
} from "../Types";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import ItemParent, { ItemParentProps } from "./ItemParent";

export interface ItemTitulaireProps {
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nbUnionsAnterieurs: number;
  situationFamiliale?: string;
  nbMineurs?: number;
  nationalites: NationaliteType[];
  domiciliation: DomiciliationType;
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
      <ItemLigne texte={formatLigneNomsPrenomsGenre(props.identite)} />
      <ItemLigne
        texte={formatLigneFrancisationIdentification(props.identite)}
      />
      <ItemLigne texte={formatLigneDateCoordonnees(props.naissance)} />
      <Item titre={INFOS} className={{ title: "bg-clair" }} etendu={false}>
        <ItemLigne
          label={Labels.resume.union.anterieurs}
          texte={props.nbUnionsAnterieurs.toString()}
        />
        <ItemLigne texte={props.situationFamiliale} />
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
