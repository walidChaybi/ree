import { IQueryParametersPourRequetes } from "../../../api/appels/requeteApi";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";
import {
  indexParamsReq,
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
} from "../../common/util/RequetesUtils";
import { TableauTypeColumn } from "../../common/widget/tableau/TableauRece";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import { Box } from "reakit/Box";
import LabelIcon from "@material-ui/icons/Label";
import React from "react";
import { IDataTable } from "./MesRequetesPage";

export function goToLinkCommon(
  link: string,
  separator: string
): IQueryParametersPourRequetes | undefined {
  let queryParameters: IQueryParametersPourRequetes | undefined = undefined;
  if (link.indexOf("range") > 0) {
    let params = [];
    params = link.split(`${separator}?`)[1].split("&");
    queryParameters = {
      statuts: [params[indexParamsReq.Statut].split("=")[1] as StatutRequete],
      tri: params[indexParamsReq.Tri].split("=")[1],
      sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
      range: params[indexParamsReq.Range].split("=")[1]
    };
  }
  return queryParameters;
}

export const commonHeaders = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateCreation",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateStatut],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateStatut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.statut",
    getTextRefentiel: true,
    rowLibelle: "referentiel.statutRequete",
    align: "center"
  })
];

export function getIconPrioriteRequete(row: IDataTable): JSX.Element {
  return (
    <Box
      title={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-label={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-hidden={true}
    >
      <LabelIcon className={prioriteDeLaRequete(row.dateStatut)} />
    </Box>
  );
}
