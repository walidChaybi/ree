import {
  estDateValide,
  getDateComposeFromDate,
  getIsoStringFromDateCompose,
  IDateCompose
} from "../../../util/DateUtils";

export interface IDateComposeForm {
  jour?: string;
  mois?: string;
  annee?: string;
}

export function buildDatePickerValue(dateSaisie: IDateComposeForm): Date {
  let datePickerValue = new Date();
  const dateSaisieComplete = { ...dateSaisie };

  const date = getDateComposeFromDate(new Date());
  if (!dateSaisie.jour) {
    dateSaisieComplete.jour = date.jour;
  }
  if (!dateSaisie.mois) {
    dateSaisieComplete.mois = date.mois;
  }
  if (!dateSaisie.annee) {
    dateSaisieComplete.annee = date.annee;
  }

  if (estDateValide(dateSaisieComplete as IDateCompose)) {
    datePickerValue = new Date(
      getIsoStringFromDateCompose(dateSaisieComplete as IDateCompose)
    );
  }

  return datePickerValue;
}
