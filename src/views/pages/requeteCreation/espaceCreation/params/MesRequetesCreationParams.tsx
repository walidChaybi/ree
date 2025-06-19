import { RenderIconeAlerteRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { styleColonne } from "./EspaceCreationParams";

enum HeaderTableauMesRequetesCreation {
  Alerte = "alerte",
  numeroTeledossier = "numeroTeledossier",
  SousType = "sousType",
  Priorisation = "tagPriorisation",
  Postulant = "postulant",
  NomCompletRequerant = "nomCompletRequerant",
  DateCreation = "dateCreation",
  DateDerniereAction = "dateDerniereAction",
  Statut = "statut"
}

export const colonnesTableauMesRequetesCreation = [
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Alerte],
    title: "Alerte",
    getElement: RenderIconeAlerteRequete,
    align: "center",
    style: styleColonne,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.numeroTeledossier],
    title: "N°",
    align: "center",
    style: styleColonne,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.SousType],
    title: "Sous-type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Priorisation],
    title: "Priorisation",
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Postulant],
    title: "Postulant/Déclarant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.NomCompletRequerant],
    title: "Requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.DateCreation],
    title: "Initialisation",
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.DateDerniereAction],
    title: "Dernière action",
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Statut],
    title: "Statut",
    align: "center",
    sortable: true
  })
];
