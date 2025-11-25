import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

export type TypeRMC = "Classique" | "Auto";

export const commonHeadersTableauRMC = [
  new TableauTypeColumn({
    keys: ["nom"],
    title: "Nom"
  }),
  new TableauTypeColumn({
    keys: ["autresNoms"],
    title: "Autres noms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["prenoms"],
    title: "Prénoms",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: ["dateNaissance"],
    title: "Date de naissance"
  }),
  new TableauTypeColumn({
    keys: ["paysNaissance"],
    title: "Pays de naissance"
  })
];

export const goToLinkRMC = (link: string): string => {
  let range = "";
  if (link.indexOf("range") > 0) {
    const params: string[] = link.split(/rmc\?|rmcauto\?/)[1].split("&");
    range = params[0].split("=")[1];
  }
  return range;
};
