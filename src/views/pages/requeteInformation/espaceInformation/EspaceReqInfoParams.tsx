import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RenderCellTitulaires } from "@util/tableauRequete/TableauRequeteUtils";

import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

export const StatutsRequetesInformation = [StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.A_TRAITER.nom, StatutRequete.TRANSFEREE.nom];

enum HeaderTableauRequeteInformation {
  Numero = "numero",
  SousType = "sousType",
  NomRequerant = "nomCompletRequerant",
  LibelleRequerant = "libelleRequerant",
  DateCreation = "dateCreation",
  Statut = "statut",
  Titulaire = "nomsTitulaires",
  Objet = "objet",
  AttribueA = "attribueA",
  IconeAssigne = "iconeAssigne"
}

const style = {
  width: "7.6em"
};

export const requeteInformationMesRequetesColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Numero],
    title: "N° requête",
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.SousType],
    title: "Sous-type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Objet],
    title: "Objet",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.DateCreation],
    title: "Date requête",
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Statut],
    title: "Statut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: ["typeRequerant"],
    title: "Type requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.NomRequerant],
    title: "Prénom / Nom requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Titulaire],
    title: "Prénom / Nom de naissance titulaire",
    align: "center",
    dataIsArray: true,
    getElement: RenderCellTitulaires
  })
];

export const requeteInformationRequetesServiceColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Numero],
    title: "N° requête",
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.SousType],
    title: "Sous-type",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Objet],
    title: "Objet",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.DateCreation],
    title: "Date requête",
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.AttribueA],
    title: "Attribuée à",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.IconeAssigne],
    title: "",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Statut],
    title: "Statut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: ["typeRequerant"],
    title: "Type requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.NomRequerant],
    title: "Prénom / Nom requérant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequeteInformation.Titulaire],
    title: "Prénom / Nom de naissance titulaire",
    align: "center",
    dataIsArray: true,
    getElement: RenderCellTitulaires
  })
];
