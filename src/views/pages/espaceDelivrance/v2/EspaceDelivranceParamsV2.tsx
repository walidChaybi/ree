import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { getIconPrioriteRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../common/widget/Text";

export const StatutsRequetesEspaceDelivrance = [
  StatutRequete.BROUILLON.nom,
  StatutRequete.A_TRAITER.nom,
  StatutRequete.PRISE_EN_CHARGE.nom,
  StatutRequete.TRANSFEREE.nom,
  StatutRequete.A_SIGNER.nom,
  StatutRequete.A_VALIDER.nom
];

export enum HeaderTableauRequete {
  Numero = "numero",
  NumeroTeledossier = "numeroTeledossier",
  SousType = "sousType",
  Provenance = "provenance",
  Canal = "canal",
  NatureActe = "nature",
  Document = "documentLibelle",
  Requerant = "nomCompletRequerant",
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
    style
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
  })
];

export const requerantColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Requerant],
    title: getLibelle("Requérant"),
    align: "center"
  })
];

export const dateStatutColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    title: getLibelle("Date requête"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateDerniereMaj],
    title: getLibelle("Date dernière action"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    title: getLibelle("Statut"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.PrioriteRequete],
    title: getLibelle("Priorité"),
    getElement: getIconPrioriteRequete,
    align: "center"
  })
];
