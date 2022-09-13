import { getCellTitulaires } from "@util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

export enum HeaderTableauRequetesAssociees {
  Titulaires = "titulaires",
  SousType = "sousType",
  DateCreation = "dateCreation",
  Statut = "statut"
}

export const columnsTableauRequeteAssociees = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesAssociees.Titulaires],
    title: "Titulaire(s)",
    align: "center",
    dataIsArray: true,
    getElement: getCellTitulaires
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesAssociees.SousType],
    title: "Sous-Type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesAssociees.DateCreation],
    title: "Date requête",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesAssociees.Statut],
    title: "Statut",
    align: "center"
  })
];
