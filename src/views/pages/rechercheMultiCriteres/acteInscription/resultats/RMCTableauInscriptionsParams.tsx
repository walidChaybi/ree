import { EStatutRcRcaPacs } from "@model/etatcivil/enum/EStatutRcRcaPacs";
import { ETypeInscriptionRc } from "@model/etatcivil/enum/ETypeInscriptionRc";
import { ETypeInscriptionRca } from "@model/etatcivil/enum/ETypeInscriptionRca";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  IColonneCaseACocherParams,
  getColonneCasesACocher
} from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import { TypeRMC } from "./RMCTableauCommun";

export function getColonnesTableauInscriptions<TData, TIdentifiant>(
  typeRMC: TypeRMC,
  colonneCaseACocherInscriptionsParams: IColonneCaseACocherParams<TData, TIdentifiant>,
  conteneurCaseACocherProps: IConteneurElementPropsPartielles<TData, TIdentifiant, TChangeEventSurHTMLInputElement>,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [...columnsTableauRmc, getColonneCasesACocher(colonneCaseACocherInscriptionsParams, undefined, conteneurCaseACocherProps)];
  }
  return columnsTableauRmc;
}

const getCellNumeroRef = (inscription: TResultatRMCInscription): JSX.Element => {
  return (
    <span
      className="TableauFontBody"
      title={inscription.numero}
    >
      {inscription.numero}
    </span>
  );
};

const getNature = (inscription: TResultatRMCInscription): JSX.Element => {
  const nature: string = (() => {
    switch (inscription.categorie) {
      case "PACS":
        return "";
      case "RC":
        return NatureRc.depuisId(inscription.idNature)?.libelle ?? "";
      case "RCA":
        return NatureRca.depuisId(inscription.idNature)?.libelle ?? "";
    }
  })();

  return (
    <span
      className="line-clamp-1"
      title={nature}
    >
      {nature}
    </span>
  );
};

const getType = (inscription: TResultatRMCInscription): JSX.Element => (
  <span className="line-clamp-1">
    {(() => {
      switch (inscription.categorie) {
        case "PACS":
          return "";
        case "RC":
          return ETypeInscriptionRc[inscription.type];
        case "RCA":
          return ETypeInscriptionRca[inscription.type];
      }
    })()}
  </span>
);

const columnsTableauRmc = [
  new TableauTypeColumn({
    keys: ["personne", "nom"],
    title: "Nom"
  }),
  new TableauTypeColumn({
    keys: ["personne", "autresNoms"],
    title: "Autres noms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["personne", "prenoms"],
    title: "Prénoms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["personne", "dateNaissance"],
    style: { width: "150px" },
    title: "Date de naissance"
  }),
  new TableauTypeColumn({
    keys: ["personne", "paysNaissance"],
    style: { width: "150px" },
    title: "Pays de naissance"
  }),
  new TableauTypeColumn({
    keys: ["nature"],
    title: "Nature",
    align: "left",
    getElement: getNature,
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["numeroInscription"],
    title: "N° Réf.",
    getElement: getCellNumeroRef,
    align: "left",
    style: { width: "130px" }
  }),
  new TableauTypeColumn({
    keys: ["typeInscription"],
    title: "Type",
    align: "left",
    style: { width: "100px" },
    getElement: getType
  }),
  new TableauTypeColumn({
    keys: ["statutInscription"],
    title: "Statut fiche",
    style: { width: "50px" },
    align: "left",
    getElement: (inscription: TResultatRMCInscription) => <span>{EStatutRcRcaPacs[inscription.statut]}</span>
  })
];
