import { rempliAGaucheAvecZero } from "./Utils";

export const MIN_YEAR = 1900;
export const MEP_YEAR = 2021;
export const MIN_LENGTH_ANNEE = 4;
const MAX_MONTH = 12;
export interface IDateCompose {
  jour?: string;
  mois?: string;
  annee: string;
}

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYYHHmm = "DD/MM/YYYY HH:mm"
}

/** Trasforme un objet IDateCompose en chaîne JJ/MM/AAAA */
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

export function getDateFromDateCompose(date?: IDateCompose): Date | undefined {
  if (date && date.annee && date.mois && date.jour) {
    return new Date(
      Date.UTC(
        parseInt(date.annee, 10),
        parseInt(date.mois, 10) - 1,
        parseInt(date.jour, 10),
        0,
        0
      )
    );
  } else {
    return undefined;
  }
}

export function getDateDebutFromDateCompose(
  date?: IDateCompose
): Date | undefined {
  if (date) {
    const jour = date.jour || "1";
    const mois = date.mois || "1";
    return getDateFromDateCompose({ jour, mois, annee: date.annee });
  } else {
    return undefined;
  }
}

export function getDateFinFromDateCompose(
  date?: IDateCompose
): Date | undefined {
  if (date) {
    const mois = date.mois || String(MAX_MONTH);
    let jour = "";
    if (!date.jour) {
      const dernierjourDuMois = getDernierJourDuMois(
        Number(mois),
        Number(date.annee)
      );
      jour = String(dernierjourDuMois ? dernierjourDuMois : "");
      return getDateFromDateCompose({ jour, mois, annee: date.annee });
    }
    return getDateFromDateCompose({ jour: date.jour, mois, annee: date.annee });
  } else {
    return undefined;
  }
}

export function getDernierJourDuMois(
  mois?: number,
  annee?: number
): number | undefined {
  let dernierjourDuMois;
  if (annee && mois) {
    const date = new Date(annee, mois, 0);
    dernierjourDuMois = date.getDate();
  }
  return dernierjourDuMois;
}

export function getDateString(date: Date): string {
  if (date) {
    return new Intl.DateTimeFormat("fr-FR").format(date);
  }
  return "";
}

// Convertion d'un Timestamp (en secondes depuis 1970) en Date
// Le Timestamp est multiplié par 1000 car new Date() (en millisecondes depuis 1970)
export function getDateFromTimestamp(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function estDateValide(dateCompose: IDateCompose) {
  let dateValide = false;
  if (dateCompose) {
    const dateObj = new Date(
      Number(dateCompose.annee),
      Number(dateCompose.mois) - 1,
      Number(dateCompose.jour)
    );
    const dateIso = `${dateCompose.annee}-${dateCompose.mois}-${dateCompose.jour}`;
    const timestamp = Date.parse(dateIso);
    dateValide =
      !isNaN(timestamp) && dateObj.getDate() === Number(dateCompose.jour);
  }
  return dateValide;
}

export function estDateReceValide(dateCompose: IDateCompose): boolean {
  let dateValide = false;
  if (dateCompose) {
    if (!dateCompose.jour && dateCompose.mois && dateCompose.annee) {
      dateValide = Number(dateCompose.mois) <= MAX_MONTH;
    } else if (!dateCompose.jour && !dateCompose.mois && dateCompose.annee) {
      dateValide = true;
    } else {
      dateValide = estDateValide(dateCompose);
    }
  }
  return dateValide;
}

export function compareNumber(n1: number, n2: number): number {
  return n1 > n2 ? 1 : n1 === n2 ? 0 : -1;
}

export function compareDatesCompose(
  date1: IDateCompose,
  date2: IDateCompose
): number {
  const annee1 = date1.annee ? Number(date1.annee) : 0;
  const mois1 = date1.mois ? Number(date1.mois) : 0;
  const jour1 = date1.jour ? Number(date1.jour) : 0;
  const annee2 = date2.annee ? Number(date2.annee) : 0;
  const mois2 = date2.mois ? Number(date2.mois) : 0;
  const jour2 = date2.jour ? Number(date2.jour) : 0;

  if (annee1 !== annee2) {
    return compareNumber(annee1, annee2);
  }
  if (mois1 !== mois2) {
    return compareNumber(mois1, mois2);
  }
  if (jour1 !== jour2) {
    return compareNumber(jour1, jour2);
  }
  return 0;
}

export function getIsoStringFromDateCompose(date: IDateCompose): string {
  return date ? `${date.annee}-${date.mois}-${date.jour}` : "";
}

export function estDateVide(date?: IDateCompose): boolean {
  return !date || (!date.jour && !date.mois && !date.annee);
}

export function getDateComposeFromDate(date: Date): IDateCompose {
  return {
    jour: rempliAGaucheAvecZero(date.getDate()),
    mois: rempliAGaucheAvecZero(date.getMonth() + 1),
    annee: String(date.getFullYear())
  };
}

export function getFormatDateFromTimestamp(timestamp: number): string {
  if (timestamp) {
    return getDateString(getDateFromTimestamp(timestamp));
  }
  return "";
}

/**
 *
 * 12 04 => à 12h04
 * 00 04 => à zéro heure 04
 * 10 00 => à 10h
 */
export function formatAHeure(heure?: number, minute?: number) {
  if (heure != null) {
    const minuteConvert = minute ? `${minute}` : "";
    if (heure === 0) {
      return `à zéro heure ${minuteConvert}`;
    } else {
      return `à ${heure}h${minuteConvert}`;
    }
  }
  return "";
}

export function formatDeOuLe(date: IDateCompose) {
  if (date && date.jour) {
    return "Le";
  } else {
    return "En";
  }
}
