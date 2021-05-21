import { TableauTypeColumn } from "../../../common/widget/tableau/v1/TableauRece";
import { HeaderTableauRequete } from "../../../../model/requete/HeaderTableauRequete";
import { getIconPrioriteRequete } from "./EspaceDelivranceUtils";

const style = {
  width: "7.6em"
};

export const requeteColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.IdSagaDila],
    title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila",
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.SousTypeRequete],
    title: "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
    rowLibelle: "referentiel.sousTypeRequete.court",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Canal],
    title: "pages.delivrance.mesRequetes.tableau.header.canal",
    rowLibelle: "referentiel.canal",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NatureActe],
    title: "pages.delivrance.mesRequetes.tableau.header.natureActe",
    rowLibelle: "referentiel.natureActe",
    align: "center"
  })
];

export const requerantColumnHeaders = [
  new TableauTypeColumn({
    keys: [
      HeaderTableauRequete.Requerant,
      HeaderTableauRequete.LibelleRequerant
    ],
    title: "pages.delivrance.mesRequetes.tableau.header.requerant",
    align: "center"
  })
];

export const dateStatutColumnHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    title: "pages.delivrance.mesRequetes.tableau.header.dateCreation",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateStatut],
    title: "pages.delivrance.mesRequetes.tableau.header.dateStatut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    title: "pages.delivrance.mesRequetes.tableau.header.statut",
    rowLibelle: "referentiel.statutRequete",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.PrioriteRequete],
    title: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete",
    getElement: getIconPrioriteRequete,
    align: "center"
  })
];
