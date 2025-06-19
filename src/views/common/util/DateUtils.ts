import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CINQ, DEUX, DIX, DOUZE, HUIT, NEUF, ONZE, QUATRE, rempliAGaucheAvecZero, SEPT, SIX, TROIS, UN } from "./Utils";

dayjs.extend(customParseFormat);

export const MIN_YEAR = 1900;
export const MEP_YEAR = 2021;
const MES_YEAR = 2023;
export const DATE_MES = new Date(MES_YEAR, 0, 1);

export const MIN_LENGTH_ANNEE = 4;

const MAX_MONTH = 12;
export interface IDateCompose {
  jour?: string;
  mois?: string;
  annee: string;
  heure?: string;
  minute?: string;
}

export type TDateArrayDTO = [annee: number, mois: number, jour: number];

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYYHHmm = "DD/MM/YYYY HH:mm"
}

const DateUtils = {
  /** Transforme un objet IDateCompose en chaîne JJ/MM/AAAA */
  getDateStringFromDateCompose: (date?: IDateCompose, separateur = "/"): string => {
    let dateString = "";

    if (date?.annee) {
      dateString += date.annee;
    }

    if (date?.mois) {
      dateString = `${`${date.mois}`.length === UN ? "0" : ""}${date.mois}${separateur}${dateString}`;
    }

    if (date?.jour) {
      dateString = `${`${date.jour}`.length === UN ? "0" : ""}${date.jour}${separateur}${dateString}`;
    }

    return dateString;
  },

  getDateFromDateCompose: (date?: IDateCompose): Date | undefined => {
    if (date?.annee && date?.mois && date?.jour) {
      return new Date(Date.UTC(parseInt(date.annee, 10), parseInt(date.mois, 10) - 1, parseInt(date.jour, 10), 0, 0));
    } else {
      return undefined;
    }
  },

  getDateDebutFromDateCompose: (date?: IDateCompose): Date | undefined => {
    if (!date) {
      return undefined;
    }

    const jour = date.jour ?? "1";
    const mois = date.mois ?? "1";

    return DateUtils.getDateFromDateCompose({ jour, mois, annee: date.annee });
  },

  getDateFinFromDateCompose: (date?: IDateCompose): Date | undefined => {
    if (date) {
      const mois = date.mois ?? String(MAX_MONTH);
      let jour = "";
      if (!date.jour) {
        const dernierjourDuMois = DateUtils.getDernierJourDuMois(Number(mois), Number(date.annee));
        jour = String(dernierjourDuMois ?? "");
        return DateUtils.getDateFromDateCompose({ jour, mois, annee: date.annee });
      }
      return DateUtils.getDateFromDateCompose({ jour: date.jour, mois, annee: date.annee });
    } else {
      return undefined;
    }
  },

  getDernierJourDuMois: (mois?: number, annee?: number): number | undefined => {
    let dernierjourDuMois;
    if (annee && mois) {
      const date = new Date(annee, mois, 0);
      dernierjourDuMois = date.getDate();
    }
    return dernierjourDuMois;
  },

  formatDateStringIso: (date: string): string => {
    return date ? DateUtils.getDateString(new Date(date)) : "";
  },

  getDateString: (date: Date): string => {
    return date ? new Intl.DateTimeFormat("fr-FR").format(date) : "";
  },

  getDateDuJour: (): string => {
    return DateUtils.getDateString(new Date());
  },

  // Conversion d'un Timestamp (en millisecondes depuis 1970) en Date
  getDateFromTimestamp: (timestamp: number): Date => {
    return new Date(timestamp);
  },

  getDateDepuisDateArrayDto: (dateArray: TDateArrayDTO): Date => {
    const [annee, mois, jour] = dateArray;

    return new Date(annee, mois - 1, jour);
  },

  getTimestampFromDateArrayDto: (dateArray: TDateArrayDTO): number => {
    return DateUtils.getDateDepuisDateArrayDto(dateArray).getTime();
  },

  estDateValide: (dateCompose: IDateCompose) => {
    let dateValide = false;
    if (dateCompose) {
      const dateObj = new Date(Number(dateCompose.annee), Number(dateCompose.mois) - 1, Number(dateCompose.jour));
      const dateIso = `${dateCompose.annee}-${dateCompose.mois}-${dateCompose.jour}`;
      const timestamp = Date.parse(dateIso);
      dateValide = !isNaN(timestamp) && dateObj.getDate() === Number(dateCompose.jour);
    }
    return dateValide;
  },

  estDateReceValide: (dateCompose: IDateCompose): boolean => {
    let dateValide = false;
    if (dateCompose) {
      if (!dateCompose.jour && dateCompose.mois && dateCompose.annee) {
        dateValide = Number(dateCompose.mois) <= MAX_MONTH;
      } else if (!dateCompose.jour && !dateCompose.mois && dateCompose.annee) {
        dateValide = true;
      } else {
        dateValide = DateUtils.estDateValide(dateCompose);
      }
    }
    return dateValide;
  },

  compareNumber: (n1: number, n2: number): number => {
    return n1 > n2 ? 1 : n1 === n2 ? 0 : -1;
  },

  compareDatesCompose: (date1: IDateCompose, date2: IDateCompose): number => {
    const annee1 = date1.annee ? Number(date1.annee) : 0;
    const mois1 = date1.mois ? Number(date1.mois) : 0;
    const jour1 = date1.jour ? Number(date1.jour) : 0;
    const annee2 = date2.annee ? Number(date2.annee) : 0;
    const mois2 = date2.mois ? Number(date2.mois) : 0;
    const jour2 = date2.jour ? Number(date2.jour) : 0;

    if (annee1 !== annee2) {
      return DateUtils.compareNumber(annee1, annee2);
    }
    if (mois1 !== mois2) {
      return DateUtils.compareNumber(mois1, mois2);
    }
    if (jour1 !== jour2) {
      return DateUtils.compareNumber(jour1, jour2);
    }
    return 0;
  },

  getIsoStringFromDateCompose: (date: IDateCompose): string => {
    return date ? `${date.annee}-${date.mois}-${date.jour}` : "";
  },

  estDateVide: (date?: IDateCompose): boolean => {
    return !date || (!date.jour && !date.mois && !date.annee);
  },

  getDateComposeFromDate: (date?: Date): IDateCompose => {
    let dateCompose;
    if (date) {
      dateCompose = {
        jour: rempliAGaucheAvecZero(date.getDate()),
        mois: rempliAGaucheAvecZero(date.getMonth() + 1),
        annee: String(date.getFullYear()) || ""
      };
    } else {
      dateCompose = {
        jour: "",
        mois: "",
        annee: ""
      };
    }
    return dateCompose;
  },

  getDateComposeFromTimestamp: (timestamp?: number): IDateCompose => {
    let date;
    if (timestamp) {
      date = DateUtils.getDateFromTimestamp(timestamp);
    }
    return DateUtils.getDateComposeFromDate(date);
  },

  getFormatDateFromTimestamp: (timestamp?: number): string => {
    if (timestamp) {
      return DateUtils.getDateString(DateUtils.getDateFromTimestamp(timestamp));
    }
    return "";
  },

  // - jour en chiffres, pas de 0 entre 1 et 9. 1er pour le premier jour du mois
  // - mois en lettre
  // - année en chiffres
  getDateFormatJasper: (date: Date) => {
    return `${DateUtils.getJourOu1er(date.getDate())} ${DateUtils.getMoisEnLettre(date.getMonth() + 1)} ${date.getFullYear()}`;
  },

  // - jour en chiffres, pas de 0 entre 1 et 9. 1er pour le premier jour du mois
  // - mois en lettre
  // - année en chiffres
  getDateFormatJasperFromCompose: (date?: IDateCompose) => {
    let dateString = "";

    if (date?.annee) {
      dateString += date.annee;
    }
    if (date?.mois) {
      dateString = `${DateUtils.getMoisEnLettre(Number(date.mois))} ${dateString}`;
    }
    if (date?.jour) {
      const jour = Number(date.jour);
      dateString = `${DateUtils.getJourOu1er(jour)} ${dateString}`;
    }
    return dateString;
  },

  /*
   * 12 04 => à 12 heures 4 minutes
   * 00 04 => à zéro heure 4 minutes
   * 10 00 => à 10 heures
   */
  formatAHeureExtrait: (heure?: number, minute?: number) => {
    if (heure != null) {
      const minuteConvert = minute ? (minute > 1 ? ` ${minute} minutes` : ` ${minute} minute`) : "";
      if (heure === 0) {
        return `à zéro heure${minuteConvert}`;
      } else {
        const heureConvert = heure > 1 ? `${heure} heures` : `${heure} heure`;
        return `à ${heureConvert}${minuteConvert}`;
      }
    }
    return "";
  },

  /*
   * 12 04 => à 12h04
   * 00 04 => à zéro heure 04
   * 10 00 => à 10h
   */
  formatAHeure: (heure?: number, minute?: number) => {
    if (heure != null) {
      const minuteConvert = minute ? `${minute}` : "";
      if (heure === 0) {
        return `à zéro heure ${minuteConvert}`;
      } else {
        return `à ${heure}h${minuteConvert}`;
      }
    }
    return "";
  },

  getMoisEnLettre: (mois?: number): string | undefined => (mois ? MAP_MOIS_LETTRES.get(mois) : undefined),

  // TOREFACTOR: renommer getJourOuPremier
  getJourOu1er: (jour?: number) => {
    if (!jour) {
      return "";
    }

    return jour === 1 ? "1er" : `${jour}`;
  },

  getDateActuelle: (): Date => {
    return new Date();
  },

  formatJour: (str?: string): string => {
    let jourFormate = "";
    if (str) {
      jourFormate = supprimeLesZeroAuDebut(str);
    }
    return jourFormate ? DateUtils.getJourOu1er(Number(jourFormate)) : "";
  },

  formatMois: (str?: string): string => {
    let moisFormate = "";
    if (str) {
      moisFormate = supprimeLesZeroAuDebut(str);
    }
    const moisEnLettre = moisFormate ? DateUtils.getMoisEnLettre(Number(moisFormate)) : "";
    return moisEnLettre ?? "";
  },

  dateCourrier: (): string => {
    const today = new Date();
    const day = DateUtils.formatJour(today.getDate().toString());
    const month = DateUtils.formatMois((today.getMonth() + 1).toString());
    const year = today.getFullYear().toString();
    return `${day} ${month} ${year}`;
  },

  estDateAtteinte: (date: Date) => {
    return Date.now() >= date.getTime();
  },

  dayjsAvecFormat: (date?: string | number | Dayjs | Date | null | undefined, format?: dayjs.OptionType | undefined): Dayjs =>
    dayjs(date, format)
} as const;

export default DateUtils;

const MAP_MOIS_LETTRES = new Map<number, string>();
MAP_MOIS_LETTRES.set(UN, "janvier");
MAP_MOIS_LETTRES.set(DEUX, "février");
MAP_MOIS_LETTRES.set(TROIS, "mars");
MAP_MOIS_LETTRES.set(QUATRE, "avril");
MAP_MOIS_LETTRES.set(CINQ, "mai");
MAP_MOIS_LETTRES.set(SIX, "juin");
MAP_MOIS_LETTRES.set(SEPT, "juillet");
MAP_MOIS_LETTRES.set(HUIT, "août");
MAP_MOIS_LETTRES.set(NEUF, "septembre");
MAP_MOIS_LETTRES.set(DIX, "octobre");
MAP_MOIS_LETTRES.set(ONZE, "novembre");
MAP_MOIS_LETTRES.set(DOUZE, "décembre");

const supprimeLesZeroAuDebut = (str: string): string => `${parseInt(str)}`;
