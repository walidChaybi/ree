import { IQueryParametersPourRequetesV2 } from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { indexParamsReq } from "../../../common/util/RequetesUtils";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";

export function goToLinkRequete(
  link: string,
  separator: string
): IQueryParametersPourRequetesV2 | undefined {
  let queryParameters: IQueryParametersPourRequetesV2 | undefined = undefined;
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
