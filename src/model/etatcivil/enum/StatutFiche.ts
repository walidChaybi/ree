export enum StatutFiche {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF"
}

export class StatutFicheUtil {
  private static readonly libelles = {
    [StatutFiche.ACTIF]: "Actif",
    [StatutFiche.INACTIF]: "Inactif"
  };

  public static getLibelle(statutFiche?: StatutFiche): string {
    return statutFiche ? this.libelles[statutFiche] : "";
  }
}
