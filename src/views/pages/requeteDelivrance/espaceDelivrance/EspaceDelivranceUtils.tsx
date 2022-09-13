import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { indexParamsReq } from "@util/RequetesUtils";
import { SortOrder } from "@widget/tableau/TableUtils";

export function goToLinkRequete(
  link: string,
  separator: string
): IQueryParametersPourRequetes | undefined {
  let queryParameters: IQueryParametersPourRequetes | undefined = undefined;
  if (link.indexOf("range") > 0) {
    let params = [];
    params = link.split(`${separator}?`)[1].split("&");
    queryParameters = {
      statuts: [
        StatutRequete.getEnumFor(params[indexParamsReq.Statut].split("=")[1])
      ],
      tri: params[indexParamsReq.Tri].split("=")[1],
      sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
      range: params[indexParamsReq.Range].split("=")[1]
    };
  }
  return queryParameters;
}
