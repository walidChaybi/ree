export interface IDateCompose {
  jour?: string;
  mois?: string;
  annee: string;
}

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYYHHmm = "DD/MM/YYYY HH:mm"
}

export function getDateStringFromDateCompose(date: IDateCompose): string {
  let dateString = "";

  if (date && date.annee) {
    dateString += date.annee;
  }

  if (date && date.mois) {
    dateString = `${date.mois.length === 1 ? "0" : ""}${
      date.mois
    }/${dateString}`;
  }

  if (date && date.jour) {
    dateString = `${date.jour.length === 1 ? "0" : ""}${
      date.jour
    }/${dateString}`;
  }
  return dateString;
}

export function getDateFromDateCompose(date: IDateCompose): Date | undefined {
  if (date.annee && date.mois && date.jour) {
    return new Date(
      Date.UTC(
        parseInt(date.annee, 10),
        parseInt(date.mois, 10),
        parseInt(date.jour, 10),
        0,
        0
      )
    );
  } else {
    return undefined;
  }
}

export function getDateString(date: Date): string {
  if (date) {
    return new Intl.DateTimeFormat("fr-FR").format(date);
  }
  return "";
}

export function getDateFromTimestamp(date: number): Date {
  return new Date(date);
}

export function getFormatDateFromTimestamp(timestamp: number): string {
  if (timestamp) {
    return getDateString(getDateFromTimestamp(timestamp));
  }
  return "";
}
