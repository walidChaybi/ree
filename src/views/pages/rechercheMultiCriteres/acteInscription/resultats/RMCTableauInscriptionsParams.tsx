import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { HeaderTableauRMCInscription } from "@model/rmc/headerTableau/HeaderTableauRMCInscription";
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
    keys: [HeaderTableauRMCInscription.NUMERO_REF.nom],
    title: HeaderTableauRMCInscription.NUMERO_REF.libelle,
    getElement: getCellNumeroRef,
    align: "left",
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.TYPE.nom],
    title: HeaderTableauRMCInscription.TYPE.libelle
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.STATUT.nom],
    title: HeaderTableauRMCInscription.STATUT.libelle,
    style: { width: "50px" }
  })
];

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

function getCellNumeroRef(data: IResultatRMCInscription): JSX.Element {
  const numeroRef = `${data?.categorie?.toUpperCase()} - ${data?.anneeInscription} - ${data?.numeroInscription}`;
  return (
    <div
      className="TableauFontBody ColOverflow"
      title={numeroRef}
    >
      {numeroRef}
    </div>
  );
}
