import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece";
import { HeaderTableauRMC } from "../../../../model/rmc/HeaderTableauRMC";

export const commonHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Nom],
    colLibelle: "Nom"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.AutresNoms],
    colLibelle: "Autres noms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Prenoms],
    colLibelle: "Prénoms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.DateNaissance],
    colLibelle: "Date de naissance"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.PaysNaissance],
    colLibelle: "Pays de naissance"
  })
];

export const natureHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: [HeaderTableauRMC.Nature],
    colLibelle: "Nature",
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
