import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import {
  getCellTitulaires,
  getIconPrioriteRequete
} from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "../../../common/util/Utils";
import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece/TableauTypeColumn";

export const StatutsRequetesEspaceDelivrance = [
  StatutRequete.BROUILLON.nom,
  StatutRequete.PRISE_EN_CHARGE.nom,
  StatutRequete.TRANSFEREE.nom,
  StatutRequete.A_SIGNER.nom,
  StatutRequete.A_VALIDER.nom
  // A_TRAITER est ramené par le back (en effet en ETAPE2 R1,2,7, il ne faut pas ramener les RDD A_TRAITER)
];

export enum HeaderTableauRequete {
  Numero = "numero",
  NumeroTeledossier = "numeroTeledossier",
  SousType = "sousType",
  Provenance = "provenance",
  Canal = "canal",
  NatureActe = "nature",
  Document = "documentLibelle",
  Titulaires = "titulaires",
  AttribueA = "attribueA",
  LibelleRequerant = "libelleRequerant",
  DateCreation = "dateCreation",
  DateDerniereMaj = "dateDerniereMaj",
  Statut = "statut",
  PrioriteRequete = "prioriteRequete"
}

const style = {
  width: "7.6em"
};

export const requeteColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Numero],
    title: getLibelle("N°"),
    align: "center",
    style,
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NumeroTeledossier],
    title: getLibelle("N° télédossier"),
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.SousType],
    title: getLibelle("Sous-type"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Provenance],
    title: getLibelle("Provenance"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NatureActe],
    title: getLibelle("Nature d'acte"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Document],
    title: getLibelle("Document"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Titulaires],
    title: "Titulaire(s)",
    align: "center",
    dataIsArray: true,
    getElement: getCellTitulaires,
    style: { width: "150px" }
  })
];

export const dateStatutColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    title: getLibelle("Date requête"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateDerniereMaj],
    title: getLibelle("Date dernière action"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    title: getLibelle("Statut"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.PrioriteRequete],
    title: getLibelle("Priorité"),
    getElement: getIconPrioriteRequete,
    align: "center",
    sortable: true
  })
];
