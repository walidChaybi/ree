import {
  getCellDatesNaissancesTitulaires,
  getCellTitulaires,
  getIconPrioriteRequete,
  getObservationsNumeroRequete
} from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "../../../../common/widget/tableau/TableauRece/TableauTypeColumn";

export enum HeaderTableauRequete {
  Observations = "observations",
  Numero = "numero",
  NumeroTeledossier = "numeroTeledossier",
  IdSagaDila = "idSagaDila",
  Type = "type",
  SousType = "sousType",
  Provenance = "provenance",
  Titulaires = "titulaires",
  DatesNaissancesTitulaires = "datesNaissancesTitulaires",
  Requerant = "nomCompletRequerant",
  AttribueA = "attribueA",
  DateCreation = "dateCreation",
  DateDerniereMaj = "dateDerniereMaj",
  Statut = "statut",
  Priorite = "priorite"
}

export const columnsTableauRequete = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Observations],
    title: "",
    align: "center",
    getElement: getObservationsNumeroRequete,
    style: { width: "16px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Numero],
    title: "N°",
    align: "center",
    style: { width: "70px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NumeroTeledossier],
    title: "N° télédossier",
    align: "center",
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Type],
    title: "Type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.SousType],
    title: "Sous-Type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Provenance],
    title: "Provenance",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Titulaires],
    title: "Titulaire(s)",
    align: "center",
    dataIsArray: true,
    getElement: getCellTitulaires,
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DatesNaissancesTitulaires],
    title: "Date(s) naissance(s)",
    align: "center",
    dataIsArray: true,
    getElement: getCellDatesNaissancesTitulaires
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Requerant],
    title: "Requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueA],
    title: "Attribuée à",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    title: "Date requête",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateDerniereMaj],
    title: "Date dernière action",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    title: "Statut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Priorite],
    title: "Priorité",
    align: "center",
    getElement: getIconPrioriteRequete,
    style: { width: "100px" }
  })
];
