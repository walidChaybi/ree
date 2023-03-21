import { getLibelle } from "@util/Utils";
import {
  CINQ,
  DEUX,
  DIX,
  DOUZE,
  HUIT,
  NEUF,
  ONZE,
  QUATRE,
  rempliAGaucheAvecZero,
  SEPT,
  SIX,
  TROIS,
  UN
} from "./Utils";

export const MIN_YEAR = 1900;
export const MEP_YEAR = 2021;
export const MES_YEAR = 2023;
export const DATE_MES = new Date(MES_YEAR, 0, 1);

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
export function getDateStringFromDateCompose(
  date?: IDateCompose,
  separateur = "/"
): string {
  let dateString = "";

  if (date && date.annee) {
    dateString += date.annee;
  }

  if (date && date.mois) {
    dateString = `${doitAjouter0Avant(date.mois) ? "0" : ""}${
      date.mois
    }${separateur}${dateString}`;
  }

  if (date && date.jour) {
    dateString = `${doitAjouter0Avant(date.jour) ? "0" : ""}${
      date.jour
    }${separateur}${dateString}`;
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

export function formatDateStringIso(date: string): string {
  return date ? getDateString(new Date(date)) : "";
}

export function getDateString(date: Date): string {
  return date ? new Intl.DateTimeFormat("fr-FR").format(date) : "";
}

export function getDateDuJour(): string {
  return getDateString(new Date());
}

// Convertion d'un Timestamp (en millisecondes depuis 1970) en Date
export function getDateFromTimestamp(timestamp: number): Date {
  return new Date(timestamp);
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

export function getDateComposeFromDate(date?: Date): IDateCompose {
  let dateCompose;
  if (date) {
    dateCompose = {
      jour: rempliAGaucheAvecZero(date.getDate()),
      mois: rempliAGaucheAvecZero(date.getMonth() + 1),
      annee: String(date.getFullYear())
    };
  } else {
    dateCompose = {
      annee: ""
    };
  }
  return dateCompose;
}

export function getFormatDateFromTimestamp(timestamp: number): string {
  if (timestamp) {
    return getDateString(getDateFromTimestamp(timestamp));
  }
  return "";
}

// - jour en chiffres, pas de 0 entre 1 et 9. 1er pour le premier jour du mois
// - mois en lettre
// - année en chiffres
export function getDateFormatJasper(date: Date) {
  return `${getJourOu1er(date.getDate())} ${getMoisEnLettre(
    date.getMonth() + 1
  )} ${date.getFullYear()}`;
}

// - jour en chiffres, pas de 0 entre 1 et 9. 1er pour le premier jour du mois
// - mois en lettre
// - année en chiffres
export function getDateFormatJasperFromCompose(date?: IDateCompose) {
  let dateString = "";

  if (date && date.annee) {
    dateString += date.annee;
  }
  if (date && date.mois) {
    dateString = `${getMoisEnLettre(Number(date.mois))} ${dateString}`;
  }
  if (date && date.jour) {
    const jour = Number(date.jour);
    dateString = `${getJourOu1er(jour)} ${dateString}`;
  }
  return dateString;
}

/**
 *
 * 12 04 => à 12 heures 4 minutes
 * 00 04 => à zéro heure 4 minutes
 * 10 00 => à 10 heures
 */
export function formatAHeureExtrait(heure?: number, minute?: number) {
  if (heure != null) {
    const minuteConvert = minute
      ? minute > 1
        ? ` ${minute} minutes`
        : ` ${minute} minute`
      : "";
    if (heure === 0) {
      return `à zéro heure${minuteConvert}`;
    } else {
      const heureConvert = heure > 1 ? `${heure} heures` : `${heure} heure`;
      return `à ${heureConvert}${minuteConvert}`;
    }
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

const MAP_MOIS_LETTRES = new Map<number, string>();
MAP_MOIS_LETTRES.set(UN, getLibelle("janvier"));
MAP_MOIS_LETTRES.set(DEUX, getLibelle("février"));
MAP_MOIS_LETTRES.set(TROIS, getLibelle("mars"));
MAP_MOIS_LETTRES.set(QUATRE, getLibelle("avril"));
MAP_MOIS_LETTRES.set(CINQ, getLibelle("mai"));
MAP_MOIS_LETTRES.set(SIX, getLibelle("juin"));
MAP_MOIS_LETTRES.set(SEPT, getLibelle("juillet"));
MAP_MOIS_LETTRES.set(HUIT, getLibelle("août"));
MAP_MOIS_LETTRES.set(NEUF, getLibelle("septembre"));
MAP_MOIS_LETTRES.set(DIX, getLibelle("octobre"));
MAP_MOIS_LETTRES.set(ONZE, getLibelle("novembre"));
MAP_MOIS_LETTRES.set(DOUZE, getLibelle("décembre"));
export function getMoisEnLettre(mois?: number): string | undefined {
  return mois ? MAP_MOIS_LETTRES.get(mois) : undefined;
}

export function getJourOu1er(jour?: number) {
  let jourOu1er = "";
  if (jour && typeof jour === "number") {
    jourOu1er = jour === 1 ? "1er" : String(jour);
  }
  return jourOu1er;
}

export function formatJour(str?: string): string {
  let jourFormate = "";
  if (str) {
    jourFormate = supprimeLesZeroAuDebut(str);
  }
  return jourFormate ? getJourOu1er(Number(jourFormate)) : "";
}

export function formatMois(str?: string): string {
  let moisFormate = "";
  if (str) {
    moisFormate = supprimeLesZeroAuDebut(str);
  }
  const moisEnLettre = moisFormate ? getMoisEnLettre(Number(moisFormate)) : "";
  return moisEnLettre ? moisEnLettre : "";
}

function supprimeLesZeroAuDebut(str: string): string {
  return str.trim().replace(/0+(.+)/, "$1");
}

export function dateCourrier(): string {
  const today = new Date();
  const day = formatJour(today.getDate().toString());
  const month = formatMois((today.getMonth() + 1).toString());
  const year = today.getFullYear().toString();
  return `${day} ${month} ${year}`;
}

export function estDateAtteinte(date: Date) {
  return Date.now() >= date.getTime();
}
