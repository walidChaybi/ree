import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { HeaderTableauRMCActe } from "@model/rmc/acteInscription/HeaderTableauRMCActeInscription";
import { getColonneCheckbox } from "@widget/tableau/TableauRece/colonneInput/checkbox/ColonneCheckbox";
import { IColonneInputParams } from "@widget/tableau/TableauRece/colonneInput/InputParams";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  TypeRMC
} from "./RMCTableauCommun";

const columnsTableauRmc = [
  ...commonHeadersTableauRMC,
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCActe.DateEvenement],
    title: "Date d'événement",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCActe.Registre],
    title: "Réf. acte",
    className: "ColOverflow",
    style: { width: "200px" }
  })
];

export function getColonnesTableauActes(
  typeRMC: TypeRMC,
  colonneCheckboxParamsActes: IColonneInputParams,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [
      ...columnsTableauRmc,
      getColonneCheckbox(colonneCheckboxParamsActes)
    ];
  }
  return columnsTableauRmc;
}
