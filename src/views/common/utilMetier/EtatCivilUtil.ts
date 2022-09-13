import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import {
  formatAHeureExtrait,
  getDateFormatJasperFromCompose,
  IDateCompose
} from "@util/DateUtils";
import {
  ABSENCE_VALIDEE,
  formatNom,
  formatPrenoms,
  getValeurOuVide
} from "@util/Utils";

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

  public static formatNeOuNee(sexe?: Sexe) {
    return sexe === Sexe.FEMININ ? "née" : "né";
  }

  public static formatAgeOuAgee(sexe?: Sexe) {
    return sexe === Sexe.FEMININ ? "agée" : "agé";
  }

  public static formatFilsOuFille(sexe: Sexe) {
    return sexe === Sexe.FEMININ
      ? "fille de"
      : Sexe.MASCULIN
      ? "fils de"
      : "de";
  }

  public static formatGenreDetermineOuNon(sexe?: Sexe) {
    return sexe === Sexe.FEMININ || Sexe.MASCULIN ? "du" : "de";
  }

  public static formatFilsOuFilleAdoptant(sexe?: Sexe) {
    return sexe === Sexe.FEMININ ? "adoptée par" : "adopté par";
  }

  public static formatDateEvenement(evenement?: IEvenement) {
    return getDateFormatJasperFromCompose({
      jour: getValeurOuVide(evenement?.jour),
      mois: getValeurOuVide(evenement?.mois),
      annee: getValeurOuVide(evenement?.annee)
    });
  }

  public static formatHeureEvenement(evenement?: IEvenement) {
    return getValeurOuVide(
      formatAHeureExtrait(evenement?.heure, evenement?.minute)
    );
  }

  public static getPrenomsOuVide(prenoms?: string[]) {
    return formatPrenoms(prenoms, "", false);
  }

  public static getNomOuVide(nom?: string) {
    return formatNom(nom, "", false);
  }

  public static formatPartiesNomOuVide(
    nomPartie1?: string,
    nomPartie2?: string
  ) {
    return nomPartie1 && nomPartie1 !== ABSENCE_VALIDEE && nomPartie2
      ? `(1re partie : ${nomPartie1}  2nde partie : ${nomPartie2})`
      : "";
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
