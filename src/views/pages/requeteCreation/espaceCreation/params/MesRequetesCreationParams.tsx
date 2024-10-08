import { getLibelle } from "@util/Utils";
import { RenderIconeAlerteRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { styleColonne } from "./EspaceCreationParams";

export enum HeaderTableauMesRequetesCreation {
  Alerte = "alerte",
  NumeroTeledossierOuSDANFOuFonctionnel = "numeroTeledossierOuSDANFOuFonctionnel",
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
    title: getLibelle("Alerte"),
    getElement: RenderIconeAlerteRequete,
    align: "center",
    style: styleColonne,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [
      HeaderTableauMesRequetesCreation.NumeroTeledossierOuSDANFOuFonctionnel
    ],
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
    keys: [HeaderTableauMesRequetesCreation.Priorisation],
    title: getLibelle("Priorisation"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauMesRequetesCreation.Postulant],
    title: getLibelle("Postulant/Déclarant"),
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
