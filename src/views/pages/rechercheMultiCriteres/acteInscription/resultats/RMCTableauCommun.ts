import { HeaderTableauRMC } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v1/TableauRece";

export type TypeRMC = "Classique" | "Auto";

export const commonHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Nom],
    title: "Nom"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.AutresNoms],
    title: "Autres noms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Prenoms],
    title: "Prénoms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.DateNaissance],
    title: "Date de naissance"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.PaysNaissance],
    title: "Pays de naissance"
  })
];

export const natureHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Nature],
    title: "Nature",
    className: "ColOverflow"
  })
];

export function goToLinkRMC(link: string): string {
  let range = "";
  if (link.indexOf("range") > 0) {
    let params = [];
    params = link.split("rmc?")[1].split("&");
    range = params[0].split("=")[1];
  }
  return range;
}
