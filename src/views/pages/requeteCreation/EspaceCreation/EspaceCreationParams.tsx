import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { getLibelle } from "../../../common/util/Utils";
import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece/TableauTypeColumn";

export const StatutsRequetesCreation = [
  StatutRequete.PRISE_EN_CHARGE.nom,
  StatutRequete.A_TRAITER.nom,
  StatutRequete.PROJET_VALIDE.nom,
  StatutRequete.RETOUR_SDANF.nom,
  StatutRequete.A_SIGNER.nom
];

const style = {
  width: "7.6em"
};

export enum HeaderTableauRequeteCreation {
  NumeroAffichage = "numeroAffichage",
  SousType = "sousType",
  Postulant = "postulant",
  NomCompletRequerant = "nomCompletRequerant",
  DateCreation = "dateCreation",
  DateDerniereAction = "dateDerniereAction",
  Statut = "statut"
}

export const requeteCreationMesRequetesColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.NumeroAffichage],
    title: getLibelle("N°"),
    align: "center",
    style,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.SousType],
    title: getLibelle("Sous-type"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.Postulant],
    title: getLibelle("Postulant/Titulaire"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.NomCompletRequerant],
    title: getLibelle("Requérant"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.DateCreation],
    title: getLibelle("Initialisation"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.DateDerniereAction],
    title: getLibelle("Dernière action"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteCreation.Statut],
    title: getLibelle("Statut"),
    align: "center",
    sortable: true
  })
];
