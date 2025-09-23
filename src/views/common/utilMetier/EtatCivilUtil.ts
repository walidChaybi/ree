import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import DateUtils, { IDateCompose } from "@util/DateUtils";
import { ABSENCE_VALIDEE, formatNom, formatPrenoms, getValeurOuVide } from "@util/Utils";

export class EtatCivilUtil {
  public static formatLeOuEn(jour?: string | number) {
    if (jour) {
      return "Le";
    } else {
      return "En";
    }
  }

  public static formatLeOuEnAPartirDate(date?: IDateCompose) {
    return EtatCivilUtil.formatLeOuEn(date?.jour);
  }

  public static formatNeOuNee(sexe?: keyof typeof ESexe) {
    return sexe === "FEMININ" ? "née" : "né";
  }

  public static formatAgeOuAgee(sexe?: keyof typeof ESexe) {
    return sexe === "FEMININ" ? "agée" : "agé";
  }

  public static formatGenreDetermineOuNon(sexe?: keyof typeof ESexe) {
    return sexe && ["FEMININ", "MASCULIN"].includes(sexe) ? "du" : "de";
  }

  public static formatFilsOuFilleAdoptant(sexe?: keyof typeof ESexe) {
    return sexe === "FEMININ" ? "adoptée par" : "adopté par";
  }

  public static formatDateEvenement(evenement?: IEvenement) {
    return DateUtils.getDateFormatJasperFromCompose({
      jour: getValeurOuVide(evenement?.jour),
      mois: getValeurOuVide(evenement?.mois),
      annee: getValeurOuVide(evenement?.annee)
    });
  }

  public static formatHeureEvenement(evenement?: IEvenement) {
    return DateUtils.formatAHeureExtrait(evenement?.heure, evenement?.minute) ?? "";
  }

  public static getPrenomsOuVide(prenoms?: string[]) {
    return formatPrenoms(prenoms, "", false);
  }

  public static getNomOuVide(nom: string | null) {
    return formatNom(nom, "", false);
  }

  public static formatPartiesNomOuVide(nomPartie1: string | null, nomPartie2: string | null) {
    return nomPartie1 && nomPartie1 !== ABSENCE_VALIDEE && nomPartie2 ? `(1re partie : ${nomPartie1}  2nde partie : ${nomPartie2})` : "";
  }

  public static getVocables(nom?: string) {
    let vocables: string[] = [];

    if (nom) {
      const nomTrim = nom.trim();
      vocables = nomTrim.split(/\s+/);
    }

    return vocables;
  }
}
