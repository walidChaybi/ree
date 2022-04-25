import { Option } from "../util/Type";
import {
  formatMajusculesMinusculesMotCompose,
  formatPremieresLettresMajusculesNomCompose,
  getValeurOuVide,
  NEUF,
  premiereLettreEnMajuscule,
  SEIZE,
  VINGT
} from "../util/Utils";

export const FRANCE = "FRANCE";
const PARIS = "PARIS";
const MARSEILLE = "MARSEILLE";
const LYON = "LYON";
const villesMarseilleLyonParis = [MARSEILLE, LYON, PARIS];

export class LieuxUtils {
  public static isVilleFranceAvecArrondissement(
    pays?: string,
    ville?: string
  ): boolean {
    return (
      LieuxUtils.isPaysFrance(pays) &&
      LieuxUtils.isVilleMarseilleLyonParis(ville)
    );
  }

  public static isVilleAvecArrondissement(ville?: string): boolean {
    return LieuxUtils.isVilleMarseilleLyonParis(ville);
  }

  public static isPaysFrance(pays?: string): boolean {
    return pays != null && pays.toUpperCase() === FRANCE;
  }

  public static isVilleParis(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === PARIS;
  }

  public static isVilleMarseille(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === MARSEILLE;
  }

  public static isVilleLyon(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === LYON;
  }

  public static isVilleMarseilleLyonParis(ville?: string): boolean {
    return (
      ville != null && villesMarseilleLyonParis.includes(ville.toUpperCase())
    );
  }

  public static getDepartement(ville?: string, departement?: string): string {
    // Quand la ville vaut "Paris" le champ "Département" est vide
    return LieuxUtils.isVilleParis(ville)
      ? ""
      : getValeurOuVide(formatMajusculesMinusculesMotCompose(departement));
  }

  public static getArrondissement(ville?: string, arrondissement?: string) {
    // Le champ "Arrondissement" s'affiche quand la ville vaut Lyon, Marseille ou Paris.
    return LieuxUtils.isVilleMarseilleLyonParis(ville)
      ? getValeurOuVide(arrondissement)
      : "";
  }

  public static getRegionDepartement(
    ville?: string,
    departement?: string,
    numero?: string,
    region?: string
  ): string {
    let res = "";
    // Le champ "Région/dpt" vaut le libellé du département et le numéro entre parenthèses (si connu)
    // Quand la ville vaut "Paris" le champ "Département" est vide
    if (!this.isVilleParis(ville)) {
      if (departement) {
        res = premiereLettreEnMajuscule(departement);
      }

      if (numero) {
        res = res ? res + ` (${numero})` : numero;
      }

      if (!res) {
        res = premiereLettreEnMajuscule(getValeurOuVide(region));
      }
    }
    return res;
  }

  /**
   * Quand le pays naissance vaut "France" et quand la ville naissance est différente de "Lyon,Marseille et Paris":
   *  le lieu de naissance est composé de la ville naissance suivi de la région naissance entre parenthèses.
   *  Ex: Lille (Nord)
   * Quand le pays naissance vaut "France", et la ville naissance est parmi "Lyon,Marseille":
   *  le lieu de naissance est composé de la ville naissance suivie de l'arrondissement naissance puis de la région naissance entre parenthèses.
   *  Ex: Lyon Arrdt08 (Rhône)
   * Quand le pays naissance vaut "France", et la ville naissance est "Paris":
   *  le lieu de naissance est composé de la ville naissance suivie de l'arrondissement naissance .
   *  Ex:	Paris Arrdt14
   * Quand le pays naissance est différent de "France":
   *  le lieu de naissance est composé de la ville naissance - région naissance suivie du pays naissance entre parenthèses.
   *  Ex:	San remo (Italie) ou Atlantis - Floride (Etats-unis)
   */
  public static getLieu(
    ville?: string,
    region?: string,
    pays?: string,
    arrondissement?: string
  ): string {
    const villeString = ville
      ? formatPremieresLettresMajusculesNomCompose(ville)
      : "";
    const regionString = region
      ? formatPremieresLettresMajusculesNomCompose(region)
      : "";
    const paysString = pays
      ? formatPremieresLettresMajusculesNomCompose(pays)
      : "";

    const regionStringEntreParentheses =
      LieuxUtils.getLieuEntreParentheses(regionString);

    if (LieuxUtils.isPaysFrance(pays)) {
      if (
        !LieuxUtils.isVilleAvecArrondissement(ville) ||
        arrondissement == null
      ) {
        return `${villeString}${regionStringEntreParentheses}`;
      } else if (!LieuxUtils.isVilleParis(villeString)) {
        return `${villeString} arr.${arrondissement}${regionStringEntreParentheses}`;
      } else {
        return `${villeString} arr.${arrondissement}`;
      }
    } else {
      return LieuxUtils.formatAdresseEtrangere(
        paysString,
        regionString,
        villeString
      );
    }
  }

  public static getLieuExtraitCopie(
    ville?: string,
    region?: string,
    pays?: string,
    arrondissement?: string,
    formateElements = true
  ): string {
    const { paysString, regionString, villeString } =
      LieuxUtils.getVilleRegionPays(formateElements, ville, region, pays);
    const arrondissementString = arrondissement ? ` ${arrondissement}` : "";

    if (!ville && !region && !pays) {
      return "";
    } else if (!ville && !region) {
      return `-- (${paysString})`;
    } else if (!ville) {
      return `${regionString} (${paysString})`;
    } else if (!pays) {
      return `${villeString}${arrondissementString}, ${regionString}`;
    } else if (!region) {
      return `${villeString}${arrondissementString} (${paysString})`;
    }
    return `${villeString}${arrondissementString}, ${regionString} (${paysString})`;
  }

  private static getVilleRegionPays(
    formateElements: boolean,
    ville?: string,
    region?: string,
    pays?: string
  ) {
    const villeString = formateElements
      ? formatPremieresLettresMajusculesNomCompose(ville)
      : ville;
    const regionString = formateElements
      ? formatPremieresLettresMajusculesNomCompose(region)
      : region;
    const paysString = formateElements
      ? formatPremieresLettresMajusculesNomCompose(pays)
      : pays;
    return { paysString, regionString, villeString };
  }

  private static getLieuEntreParentheses(lieu: string) {
    return lieu ? ` (${lieu})` : "";
  }

  public static getLocalisationAutorite(
    ville?: string,
    libelleDepartement?: string,
    region?: string,
    pays?: string,
    arrondissement?: string,
    formatArrondissementVerbeux = false
  ): string {
    const villeString = ville
      ? formatPremieresLettresMajusculesNomCompose(ville)
      : "";
    const libelleDepartementString = LieuxUtils.getLieuEntreParentheses(
      libelleDepartement
        ? formatPremieresLettresMajusculesNomCompose(libelleDepartement)
        : ""
    );
    const regionString = region
      ? formatPremieresLettresMajusculesNomCompose(region)
      : "";
    const paysString = pays
      ? formatPremieresLettresMajusculesNomCompose(pays)
      : "";

    if (LieuxUtils.isPaysFrance(pays)) {
      if (
        !LieuxUtils.isVilleAvecArrondissement(ville) ||
        arrondissement == null
      ) {
        return `${villeString}${libelleDepartementString}`;
      } else if (!LieuxUtils.isVilleParis(villeString)) {
        return `${villeString} ${LieuxUtils.formateArrondissement(
          arrondissement,
          formatArrondissementVerbeux
        )}${libelleDepartementString}`;
      } else {
        return `${villeString} ${LieuxUtils.formateArrondissement(
          arrondissement,
          formatArrondissementVerbeux
        )}`;
      }
    } else {
      return LieuxUtils.formatAdresseEtrangere(
        paysString,
        regionString,
        villeString
      );
    }
  }

  private static formateArrondissement(
    arrondissement?: string,
    formatVerbeux = false
  ) {
    let arrondissementFormate = "";
    if (formatVerbeux) {
      if (arrondissement === "1") {
        arrondissementFormate = "1er arrondissement";
      } else if (arrondissement) {
        arrondissementFormate = `${arrondissement}ème arrondissement`;
      }
    } else {
      arrondissementFormate = `arr.${arrondissement}`;
    }
    return arrondissementFormate;
  }

  public static getLocalisationEtrangerOuFrance(
    ville?: string,
    region?: string,
    pays?: string,
    arrondissement?: string
  ): string {
    return LieuxUtils.getLocalisationAutorite(
      ville,
      region,
      region,
      pays,
      arrondissement,
      true
    );
  }

  private static formatAdresseEtrangere(
    pays: string,
    region: string,
    ville: string
  ) {
    const regionAffichage = ` - ${region}`;
    const paysAffichage = pays ? ` (${pays})` : "";
    return `${ville}${region ? regionAffichage : ""}${paysAffichage}`;
  }

  public static affichagePaysCourrier(pays: string) {
    return this.isPaysFrance(pays) ? "" : pays;
  }

  public static getNumeros(debut: number, finComprise: number): string[] {
    return Array.from({ length: finComprise }, (_, i) => String(i + debut));
  }

  public static getNumerosArrondissement(ville?: string) {
    let numeros: string[] = [];

    if (LieuxUtils.isVilleParis(ville)) {
      numeros = LieuxUtils.getNumeros(1, VINGT);
    } else if (LieuxUtils.isVilleMarseille(ville)) {
      numeros = LieuxUtils.getNumeros(1, SEIZE);
    } else if (LieuxUtils.isVilleLyon(ville)) {
      numeros = LieuxUtils.getNumeros(1, NEUF);
    }

    return numeros;
  }

  public static getOptionsArrondissement(ville?: string): Option[] {
    const villeNumeros: string[] = LieuxUtils.getNumerosArrondissement(ville);
    return villeNumeros.map(numero => ({ value: numero, str: numero }));
  }
}
