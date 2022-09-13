import { getLibelle } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { styleColonne } from "./EspaceCreationParams";

export enum HeaderTableauMesRequetesCreation {
  NumeroAffichage = "numeroAffichage",
  SousType = "sousType",
  Postulant = "postulant",
  NomCompletRequerant = "nomCompletRequerant",
  DateCreation = "dateCreation",
  DateDerniereAction = "dateDerniereAction",
  Statut = "statut"
}

export const colonnesTableauMesRequetesCreation = [
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.NumeroAffichage],
    title: getLibelle("N°"),
    align: "center",
    style: styleColonne,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.SousType],
    title: getLibelle("Sous-type"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Postulant],
    title: getLibelle("Postulant/Titulaire"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.NomCompletRequerant],
    title: getLibelle("Requérant"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.DateCreation],
    title: getLibelle("Initialisation"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.DateDerniereAction],
    title: getLibelle("Dernière action"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Statut],
    title: getLibelle("Statut"),
    align: "center",
    sortable: true
  })
];
