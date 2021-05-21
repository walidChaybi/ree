import { IQueryParametersPourRequetes } from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import {
  indexParamsReq,
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
} from "../../../common/util/RequetesUtils";
import { Box } from "reakit/Box";
import LabelIcon from "@material-ui/icons/Label";
import React from "react";
import { IDataTable } from "../../../../model/requete/IDataTable";

export function goToLinkRequete(
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
