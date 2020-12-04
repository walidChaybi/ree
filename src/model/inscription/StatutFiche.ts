export enum StatutFiche {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF"
}

export class StatutFicheUtil {
  private static readonly statutFicheLibelle = {
    ACTIF: "Actif",
    INACTIF: "Inactif"
  };

  public static getLibelle(statut: StatutFiche) {
    return this.statutFicheLibelle[statut];
  }
}
