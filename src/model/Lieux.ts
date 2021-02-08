import {
  getValeurOuVide,
  premiereLettreEnMajuscule,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../views/common/util/Utils";

const FRANCE = "FRANCE";

const PARIS = "PARIS";
const MARSEILLE = "MARSEILLE";
const LYON = "LYON";
const villesMarseilleLyonParis = [MARSEILLE, LYON, PARIS];

export class LieuxUtils {
  public static isVilleAvecArrondissement(ville?: string): boolean {
    return LieuxUtils.isVilleMarseilleLyonParis(ville);
  }

  public static isPaysFrance(pays?: string): boolean {
    return pays != null && pays.toUpperCase() === FRANCE;
  }

  public static isVilleParis(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === PARIS;
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
      : getValeurOuVide(
          premiereLettreEnMajusculeLeResteEnMinuscule(departement, " ")
        );
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
    const villeString = ville ? premiereLettreEnMajuscule(ville) : "";
    const regionString = region ? premiereLettreEnMajuscule(region) : "";
    const paysString = pays ? premiereLettreEnMajuscule(pays) : "";

    if (LieuxUtils.isPaysFrance(pays)) {
      if (
        !LieuxUtils.isVilleAvecArrondissement(ville) ||
        arrondissement == null
      ) {
        return `${villeString} (${regionString})`;
      } else if (!LieuxUtils.isVilleParis(villeString)) {
        return `${villeString} Arrdt ${arrondissement} (${regionString})`;
      } else {
        return `${villeString} Arrdt ${arrondissement}`;
      }
    } else {
      const regionAffichage = ` - ${regionString}`;
      const paysAffichage = paysString ? ` (${paysString})` : "";
      return `${villeString}${region ? regionAffichage : ""}${paysAffichage}`;
    }
  }
}
