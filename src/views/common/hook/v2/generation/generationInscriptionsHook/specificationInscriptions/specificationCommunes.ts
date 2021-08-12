import {
  TypeDecision,
  TypeDecisionUtil
} from "../../../../../../../model/etatcivil/enum/TypeDecision";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";

export function getDecisionExequatur(data: IFicheRcRca) {
  let decision = undefined;
  if (
    TypeDecisionUtil.isDecisionJuridiction(
      data.decision?.type as TypeDecision
    ) &&
    data.decision?.dateDecisionEtrangere
  ) {
    const dateDecisionEtrangere = getDateFormatJasper(
      getDateFromTimestamp(data.decision?.dateDecisionEtrangere)
    );
    decision = `prise en exequatur de la décision étrangère en date du ${dateDecisionEtrangere}`;
  }
  return decision;
}
