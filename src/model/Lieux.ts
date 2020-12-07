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
}
