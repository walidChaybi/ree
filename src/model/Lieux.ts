const villeAvecArrondissement = ["MARSEILLE", "LYON", "PARIS"];

const FRANCE = "FRANCE";

const PARIS = "PARIS";

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

  public static getLieu(
    ville: string,
    region: string,
    pays: string,
    arrondissement: string
  ): string {
    const villeString = ville
      ? `${ville.charAt(0).toUpperCase()}${ville.slice(1)}`
      : "";
    const regionString = region
      ? `${region.charAt(0).toUpperCase()}${region.slice(1)}`
      : "";
    const paysString = pays
      ? `${pays.charAt(0).toUpperCase()}${pays.slice(1)}`
      : "";

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
