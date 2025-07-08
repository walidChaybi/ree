import {
  RenderCellDatesNaissancesTitulaires,
  RenderCellRequerant,
  RenderCellSousType,
  RenderCellStatut,
  RenderCellTitulaires,
  RenderCellType,
  RenderIconePrioriteRequeteRMC,
  RenderObservationsNumeroRequete
} from "@util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

enum HeaderTableauRequete {
  Observations = "observations",
  Numero = "numero",
  numeroTeledossier = "numeroTeledossier",
  IdSagaDila = "idSagaDila",
  Type = "type",
  SousType = "sousType",
  Priorisation = "tagPriorisation",
  Provenance = "provenance",
  Titulaires = "titulaires",
  DatesNaissancesTitulaires = "datesNaissancesTitulaires",
  Requerant = "requerant",
  AttribueeA = "attribueeA",
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
    getElement: RenderObservationsNumeroRequete,
    style: { width: "16px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Numero],
    title: "N°",
    align: "center",
    style: { width: "70px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.numeroTeledossier],
    title: "N° télédossier / SDANF",
    align: "center",
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Type],
    title: "Type",
    align: "center",
    getElement: RenderCellType
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.SousType],
    title: "Sous-Type",
    align: "center",
    getElement: RenderCellSousType
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Priorisation],
    title: "Priorisation",
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
    getElement: RenderCellTitulaires,
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DatesNaissancesTitulaires],
    title: "Date(s) naissance(s)",
    align: "center",
    dataIsArray: true,
    getElement: RenderCellDatesNaissancesTitulaires
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Requerant],
    getElement: RenderCellRequerant,
    title: "Requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueeA],
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
    align: "center",
    getElement: RenderCellStatut
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Priorite],
    title: "Priorité",
    align: "center",
    getElement: RenderIconePrioriteRequeteRMC,
    style: { width: "100px" }
  })
];
