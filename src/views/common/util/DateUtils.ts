export interface IDateCompose {
  jour: string;
  mois: string;
  annee: string;
}

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYHHmm = "DD/MM/YYY HH:mm"
}

export function getDateStringFromDateCompose(date: IDateCompose): string {
  let dateString = "";
  if (date.annee) {
    dateString += date.annee;
  }

  if (date.mois) {
    dateString = `${date.mois}/${dateString}`;
  }

  if (date.jour) {
    dateString = `${date.jour}/${dateString}`;
  }
  return dateString;
}

export function getDateFromDateCompose(date: IDateCompose): Date {
  return new Date(
    Date.UTC(
      parseInt(date.annee, 10),
      parseInt(date.mois, 10),
      parseInt(date.jour, 10),
      0,
      0
    )
  );
}

export function getDateString(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export function getDateFromTimestamp(date: number): Date {
  return new Date(date);
}
