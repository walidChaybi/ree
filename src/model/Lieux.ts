import {
  getValeurOuVide,
  premiereLettreEnMajuscule
} from "../views/common/util/Utils";

const villeAvecArrondissement = ["MARSEILLE", "LYON", "PARIS"];

const FRANCE = "FRANCE";

const PARIS = "PARIS";
const MARSEILLE = "MARSEILLE";
const LYON = "LYON";

export class LieuxUtils {
  public static isVilleAvecArrondissement(ville?: string): boolean {
    return (
      ville != null && villeAvecArrondissement.includes(ville.toUpperCase())
    );
  }

  public static isPaysFrance(pays?: string): boolean {
    return pays != null && pays.toUpperCase() === FRANCE;
  }

  public static isVilleParis(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === PARIS;
  }

  public static isVilleMarseilleLyonParis(ville?: string): boolean {
    return (
      ville != null &&
      (ville.toUpperCase() === PARIS ||
        ville.toUpperCase() === MARSEILLE ||
        ville.toUpperCase() === LYON)
    );
  }

  public static getDepartement(ville?: string, departement?: string) {
    // Quand la ville vaut "Paris" le champ "Département" est vide
    return LieuxUtils.isVilleParis(ville) ? "" : getValeurOuVide(departement);
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
        res = res ? res + `(${numero})` : numero;
      }

      if (!res) {
        res = premiereLettreEnMajuscule(getValeurOuVide(region));
      }
    }
    return res;
  }

  public static getLieu(
    ville: string,
    region: string,
    pays: string,
    arrondissement: string
  ): string {
    const villeString = ville ? premiereLettreEnMajuscule(ville) : "";
    const regionString = region ? premiereLettreEnMajuscule(region) : "";
    const paysString = pays ? premiereLettreEnMajuscule(pays) : "";

    if (LieuxUtils.isPaysFrance(pays)) {
      if (!LieuxUtils.isVilleAvecArrondissement(ville)) {
        return `${villeString} (${regionString})`;
      } else if (!LieuxUtils.isVilleParis(villeString)) {
        return `${villeString} Arrdt${arrondissement} (${regionString})`;
      } else {
        return `${villeString} (Arrdt${arrondissement})`;
      }
    } else {
      const regionAffichage = ` - ${regionString}`;
      return `${villeString}${region ? regionAffichage : ""} (${paysString})`;
    }
  }
}
