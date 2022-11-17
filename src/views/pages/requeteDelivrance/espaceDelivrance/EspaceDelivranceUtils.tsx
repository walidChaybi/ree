import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { ICreationActionMiseAjourStatutEtRmcAutoHookParams } from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import {
  autorisePrendreEnChargeReqTableauDelivrance,
  indexParamsReq
} from "@util/RequetesUtils";
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

export function miseAjourOuRedirection(
  requeteSelect: IRequeteTableauDelivrance,
  setParamsMiseAJour: React.Dispatch<
    React.SetStateAction<
      ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
    >
  >,
  props: any,
  idRequete: string,
  data: IRequeteTableauDelivrance[],
  idx: number,
  url: string
) {
  const aPrendreEnCharge =
    autorisePrendreEnChargeReqTableauDelivrance(requeteSelect);
  const statutARevoir = requeteSelect.statut === StatutRequete.A_REVOIR.libelle;
  const aDocumentASigner = requeteSelect.documentsReponses?.some(
    document => document.avecCtv
  );

  if (aPrendreEnCharge || statutARevoir) {
    const statut = aPrendreEnCharge
      ? StatutRequete.PRISE_EN_CHARGE
      : aDocumentASigner
      ? StatutRequete.A_SIGNER
      : StatutRequete.A_VALIDER;

    setParamsMiseAJour({
      libelleAction: statut.libelle,
      statutRequete: statut,
      requete: requeteSelect,
      urlCourante: url,
      typeRequete: TypeRequete.DELIVRANCE
    });
  } else {
    props.setParamsRMCAuto(idRequete, data[idx], url);
  }
}
