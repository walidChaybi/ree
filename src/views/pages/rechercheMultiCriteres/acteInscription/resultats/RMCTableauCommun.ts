import { HeaderTableauRMC } from "@model/rmc/headerTableau/HeaderTableauRMC";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

export type TypeRMC = "Classique" | "Auto";

export const commonHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.NOM.nom],
    title: HeaderTableauRMC.NOM.libelle
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.AUTRES_NOMS.nom],
    title: HeaderTableauRMC.AUTRES_NOMS.libelle,
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.PRENOMS.nom],
    title: HeaderTableauRMC.PRENOMS.libelle,
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.DATE_NAISSANCE.nom],
    title: HeaderTableauRMC.DATE_NAISSANCE.libelle
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.PAYS_NAISSANCE.nom],
    title: HeaderTableauRMC.PAYS_NAISSANCE.libelle
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.NATURE.nom],
    title: HeaderTableauRMC.NATURE.libelle,
    className: "ColOverflow"
  })
];

export function goToLinkRMC(link: string): string {
  let range = "";
  if (link.indexOf("range") > 0) {
    const params: string[] = link.split(/rmc\?|rmcauto\?/)[1].split("&");
    range = params[0].split("=")[1];
  }
  return range;
}
