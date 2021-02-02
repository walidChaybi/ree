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
    dateString = `${doitAjouter0Avant(date.mois) ? "0" : ""}${
      date.mois
    }/${dateString}`;
  }

  if (date && date.jour) {
    dateString = `${doitAjouter0Avant(date.jour) ? "0" : ""}${
      date.jour
    }/${dateString}`;
  }
  return dateString;
}

function doitAjouter0Avant(value: string | number) {
  const valueWithout0ToAddBeginAt = 10;

  return typeof value === "number"
    ? value < valueWithout0ToAddBeginAt
    : value.length === 1;
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

export function getHeureFromNumber(heure?: number, minute?: number) {
  if (heure != null) {
    const libelleHeure = heure > 1 ? "heures" : "heure";
    const minuteConvert = minute != null ? `${minute}` : "";
    if (heure === 0) {
      return `à zéro ${libelleHeure} ${minuteConvert}`;
    } else {
      return `à ${heure}h${minuteConvert}`;
    }
  }
  return "";
}
