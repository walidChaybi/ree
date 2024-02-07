import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { HeaderTableauRMCActe } from "@model/rmc/headerTableau/HeaderTableauRMCActe";
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
    keys: [HeaderTableauRMCActe.DATE_EVENEMENT.nom],
    title: HeaderTableauRMCActe.DATE_EVENEMENT.libelle,
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCActe.REGISTRE_ELECTRONIQUE.nom],
    title: HeaderTableauRMCActe.REGISTRE_ELECTRONIQUE.libelle,
    className: "ColOverflow",
    style: { width: "200px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCActe.REGISTRE_PAPIER.nom],
    title: HeaderTableauRMCActe.REGISTRE_PAPIER.libelle,
    className: "ColOverflow",
    style: { width: "200px" }
  })
];

export function getColonnesTableauActes<TData, TIdentifiant>(
  typeRMC: TypeRMC,
  colonneCaseACocherParamsActes: IColonneCaseACocherParams<TData, TIdentifiant>,
  conteneurCaseACocherPropsPartielle: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TChangeEventSurHTMLInputElement
  >,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [
      ...columnsTableauRmc,
      getColonneCasesACocher(
        colonneCaseACocherParamsActes,
        undefined,
        conteneurCaseACocherPropsPartielle
      )
    ];
  }
  return columnsTableauRmc;
}
