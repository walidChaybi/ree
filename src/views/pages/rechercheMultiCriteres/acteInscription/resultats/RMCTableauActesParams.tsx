import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import {
  getColonneCasesACocher,
  IColonneCaseACocherParams
} from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { commonHeadersTableauRMC, TypeRMC } from "./RMCTableauCommun";

const columnsTableauRmc = [
  ...commonHeadersTableauRMC,
  new TableauTypeColumn({
    keys: ["nature"],
    title: "Nature",
    align: "left",
    getElement: (acte: ResultatRMCActe) => <span>{ENatureActe[acte.nature]}</span>,
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["dateEvenement"],
    title: "Date d'événement",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["referenceRece"],
    title: "Réf. RECE",
    className: "ColOverflow",
    style: { width: "200px" }
  }),
  new TableauTypeColumn({
    keys: ["referenceRegistre"],
    title: "Réf. registre",
    className: "ColOverflow",
    style: { width: "200px" }
  })
];

export function getColonnesTableauActes<TData, TIdentifiant>(
  typeRMC: TypeRMC,
  colonneCaseACocherParamsActes: IColonneCaseACocherParams<TData, TIdentifiant>,
  conteneurCaseACocherPropsPartielle: IConteneurElementPropsPartielles<TData, TIdentifiant, TChangeEventSurHTMLInputElement>,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [...columnsTableauRmc, getColonneCasesACocher(colonneCaseACocherParamsActes, undefined, conteneurCaseACocherPropsPartielle)];
  }
  return columnsTableauRmc;
}
