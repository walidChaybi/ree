import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { getCellTitulaires } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { TableauTypeColumn } from "../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../common/widget/Text";

export const StatutsRequetesInformation = [
  StatutRequete.PRISE_EN_CHARGE.nom,
  StatutRequete.TRANSFEREE.nom
];

export enum HeaderTableauRequeteInformation {
  Numero = "numero",
  SousType = "sousType",
  NomRequerant = "nomCompletRequerant",
  LibelleRequerant = "libelleRequerant",
  DateCreation = "dateCreation",
  Statut = "statut",
  Titulaire = "nomsTitulaires",
  Objet = "objet"
}

const style = {
  width: "7.6em"
};

export const requeteInformationColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Numero],
    title: getLibelle("N°"),
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.SousType],
    title: getLibelle("Sous-type"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Objet],
    title: getLibelle("Objet"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.DateCreation],
    title: getLibelle("Date requête"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Statut],
    title: getLibelle("Statut"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: ["typeRequerant"],
    title: getLibelle("Type Requérant"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.NomRequerant],
    title: getLibelle("Requérant"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Titulaire],
    title: getLibelle("Titulaire"),
    align: "center",
    dataIsArray: true,
    getElement: getCellTitulaires
  })
];
