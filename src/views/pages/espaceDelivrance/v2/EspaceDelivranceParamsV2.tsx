import { getIconPrioriteRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "../../../common/widget/tableau/v1/TableauRece";
import { getLibelle } from "../../../common/widget/Text";

export const StatutsRequetesEspaceDelivrance = [
  "A_SIGNER",
  "TRAITE_A_DELIVRER_DEMAT",
  "TRAITE_A_IMPRIMER"
];

export enum HeaderTableauRequete {
  IdSagaDila = "idSagaDila",
  SousType = "sousType",
  Provenance = "provenance",
  Canal = "canal",
  NatureActe = "nature",
  Document = "document",
  Requerant = "requerant",
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
    keys: [HeaderTableauRequete.IdSagaDila],
    title: getLibelle("N°"),
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
    title: getLibelle("Date de création"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateDerniereMaj],
    title: getLibelle("Date dernière mise à jour"),
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
