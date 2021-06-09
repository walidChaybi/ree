import { getCellTitulaires } from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";

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
    title: "Date création",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesAssociees.Statut],
    title: "Statut",
    align: "center"
  })
];
