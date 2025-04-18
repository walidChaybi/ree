import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TFormatDate =
  | "JJ/MM/AAAA"
  | "JJ/MM/AAAA à HHhmm"
  | "JJ mois AAAA"
  | "le/en JJ mois AAAA"
  | "JJ mois AAAA à HHhmm"
  | "le/en JJ mois AAAA à HHhmm"
  | "Date Toutes Lettres"
  | "Date/heure Toutes Lettres";

interface IDateRece {
  jour: string;
  mois: string;
  annee: string;
  heure: string;
  minute: string;
}

interface IObjetDate {
  jour?: string | number;
  mois?: string | number;
  annee?: string | number;
  heure?: string | number;
  minute?: string | number;
}

const MOIS = ["", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const NOMBRE_EN_LETTRE: { [cle: number]: string } = {
  1: "un",
  2: "deux",
  3: "trois",
  4: "quatre",
  5: "cinq",
  6: "six",
  7: "sept",
  8: "huit",
  9: "neuf",
  10: "dix",
  11: "onze",
  12: "douze",
  13: "treize",
  14: "quatorze",
  15: "quinze",
  16: "seize",
  20: "vingt",
  30: "trente",
  40: "quarante",
  50: "cinquante",
  60: "soixante",
  80: "quatre-vingt"
};

class DateRECE {
  constructor(private readonly date: IDateRece) {}

  public static depuisTimestamp(timestamp: number): DateRECE {
    const dateDayjs = dayjs(timestamp);

    return new DateRECE({
      jour: dateDayjs.date().toString(),
      mois: (dateDayjs.month() + 1).toString(),
      annee: dateDayjs.year().toString(),
      heure: dateDayjs.hour().toString(),
      minute: dateDayjs.minute().toString()
    });
  }

  public static depuisObjetDate(objetDate: IObjetDate): DateRECE {
    return new DateRECE({
      jour: DateRECE.valeurDate(objetDate.jour),
      mois: DateRECE.valeurDate(objetDate.mois),
      annee: DateRECE.valeurDate(objetDate.annee),
      heure: DateRECE.valeurDate(objetDate.heure, true),
      minute: DateRECE.valeurDate(objetDate.minute, true)
    });
  }

  /* Validations */
  public get estDateHeureValide(): boolean {
    return this.estDateValide && this.estHeureValide;
  }

  public get estDateValide(): boolean {
    const format = [this.date.jour ? "DD" : "", this.date.mois ? "MM" : "", this.date.annee ? "YYYY" : ""].filter(Boolean).join("/");
    if (!format || (this.date.jour && !this.date.mois)) {
      return false;
    }

    return dayjs(this.formatJourMoisAnnee(), format, true).isValid();
  }

  public get estHeureValide(): boolean {
    switch (true) {
      case !this.date.heure && !this.date.minute:
        return true;
      case !this.date.heure || !this.date.minute:
        return false;
      default:
        break;
    }

    const nombreHeure = parseInt(this.date.heure);
    const nombreMinute = parseInt(this.date.minute);

    return nombreHeure >= 0 && nombreHeure < 24 && nombreMinute >= 0 && nombreMinute < 60;
  }

  /* Formats */
  public format(format: TFormatDate = "JJ/MM/AAAA"): string {
    if (!this.estDateValide) {
      return "";
    }

    switch (format) {
      case "JJ/MM/AAAA":
        return this.formatJourMoisAnnee();
      case "JJ/MM/AAAA à HHhmm":
        return this.formatJourMoisAnneeHeure();
      case "JJ mois AAAA":
        return this.formatJourMoisLettreAnnee();
      case "le/en JJ mois AAAA":
        return this.formatJourMoisLettreAnnee(true);
      case "JJ mois AAAA à HHhmm":
        return this.formatJourMoisLettreAnneeHeure();
      case "le/en JJ mois AAAA à HHhmm":
        return this.formatJourMoisLettreAnneeHeure(true);
      case "Date Toutes Lettres":
        return this.formatDateToutesLettres();
      case "Date/heure Toutes Lettres":
        return this.formatDateHeureToutesLettres();
      default:
        return "";
    }
  }

  private formatJourMoisAnnee(): string {
    return [this.date.jour.padStart(2, "0"), this.date.mois.padStart(2, "0"), this.date.annee].reduce(
      (dateFormatee: string, partieDate: string) => `${dateFormatee}${dateFormatee ? "/" : ""}${parseInt(partieDate) ? partieDate : ""}`,
      ""
    );
  }

  private formatJourMoisAnneeHeure(): string {
    return `${this.formatJourMoisAnnee()}${this.formatHeure()}`;
  }

  private formatJourMoisLettreAnnee(avecPrefixe: boolean = false): string {
    const suffixeJour = this.date.jour === "1" ? "er" : "";
    const prefixeDate = (() => {
      switch (true) {
        case !avecPrefixe:
          return "";
        case avecPrefixe && Boolean(this.date.jour):
          return "le";
        default:
          return "en";
      }
    })();

    return [
      prefixeDate,
      this.date.jour && this.date.mois ? `${this.date.jour}${suffixeJour}` : "",
      MOIS[parseInt(this.date.mois)] ?? "",
      this.date.annee
    ]
      .filter(Boolean)
      .join(" ");
  }

  private formatJourMoisLettreAnneeHeure(avecPrefixe: boolean = false): string {
    return `${this.formatJourMoisLettreAnnee(avecPrefixe)}${this.formatHeure()}`;
  }

  private formatDateToutesLettres(): string {
    return [
      this.date.jour && this.date.mois ? DateRECE.nombreEnLettre(parseInt(this.date.jour), true) : "",
      MOIS[parseInt(this.date.mois)] ?? "",
      this.date.annee ? DateRECE.nombreEnLettre(parseInt(this.date.annee)) : ""
    ]
      .filter(Boolean)
      .join(" ");
  }

  private formatDateHeureToutesLettres() {
    const dateLettre = this.formatDateToutesLettres();
    if (!dateLettre || !this.date.heure || !this.date.minute) {
      return dateLettre;
    }

    const heureLettre: string = (() => {
      const nombreHeure = parseInt(this.date.heure);
      if (!nombreHeure) {
        return "minuit";
      }

      const formatHeureLettre = DateRECE.nombreEnLettre(nombreHeure);

      return `${formatHeureLettre}${formatHeureLettre.endsWith("un") ? "e" : ""} heure${nombreHeure > 1 ? "s" : ""}`;
    })();

    const minuteLettre: string = (() => {
      const nombreMinute = parseInt(this.date.minute);
      if (!nombreMinute) {
        return "";
      }

      const formatMinuteLettre = DateRECE.nombreEnLettre(nombreMinute);

      return `${formatMinuteLettre}${formatMinuteLettre.endsWith("un") ? "e" : ""} minute${nombreMinute > 1 ? "s" : ""}`;
    })();

    const heureMinuteLettre = [heureLettre, minuteLettre].filter(Boolean).join(" ");

    return `${dateLettre} à ${heureMinuteLettre}`;
  }

  private formatHeure(): string {
    return this.date.heure && this.date.minute ? ` à ${this.date.heure.padStart(2, "0")}h${this.date.minute.padStart(2, "0")}` : "";
  }

  /* Utilitaires */
  private static valeurDate(valeur: string | number | undefined, avecZero: boolean = false): string {
    switch (true) {
      case typeof valeur === "number":
        return !valeur && avecZero ? "0" : `${valeur || ""}`;
      case typeof valeur === "string":
        return (() => {
          const valeurNombre = parseInt((typeof valeur === "string" && valeur) || "0");
          if (isNaN(valeurNombre)) {
            return "";
          }

          return valeur && (valeurNombre || avecZero) ? `${valeurNombre}` : "";
        })();
      default:
        return "";
    }
  }

  private static nombreEnLettre(nombre: number, avecPremier: boolean = false): string {
    if (!nombre) {
      return "";
    }

    let nombreCourant = nombre;
    let resultat = [];

    const millier = Math.floor(nombreCourant / 1000);
    if (millier) {
      resultat.push(millier === 1 ? "mille" : `${NOMBRE_EN_LETTRE[millier]} mille`);
      nombreCourant -= millier * 1000;
    }

    const centaine = Math.floor(nombreCourant / 100);
    if (centaine) {
      resultat.push(centaine === 1 ? "cent" : `${NOMBRE_EN_LETTRE[centaine]} cent`);
      nombreCourant -= centaine * 100;
    }

    const valeursDizaine: string[] = [];
    const gererDizaine = (dizaine: number) => {
      const dizaineSansUnite = dizaine >= 10 ? Math.floor(dizaine / 10) * 10 : 0;
      const estUn = dizaine - dizaineSansUnite === 1;
      switch (true) {
        case dizaineSansUnite === 0:
          dizaine && valeursDizaine.push(NOMBRE_EN_LETTRE[dizaine]);
          break;
        case dizaineSansUnite === 10 && dizaine <= 16:
          valeursDizaine.push(NOMBRE_EN_LETTRE[dizaine]);
          break;
        case [70, 90].includes(dizaineSansUnite):
          valeursDizaine.push(NOMBRE_EN_LETTRE[dizaineSansUnite - 10]);
          dizaineSansUnite === 70 && estUn && valeursDizaine.push("et");
          gererDizaine(dizaine - dizaineSansUnite + 10);
          break;
        default:
          valeursDizaine.push(NOMBRE_EN_LETTRE[dizaineSansUnite]);
          estUn && valeursDizaine.push("et");
          gererDizaine(dizaine - dizaineSansUnite);
          break;
      }
    };
    gererDizaine(nombreCourant);
    resultat.push(valeursDizaine.join("-"));

    const nombreEnLettre = resultat.filter(Boolean).join(" ");

    return avecPremier && nombreEnLettre === NOMBRE_EN_LETTRE[1] ? "premier" : nombreEnLettre;
  }
}

export default DateRECE;
