export enum Statut {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF"
}

export class StatutUtil {
  private static readonly libelles = {
    [Statut.ACTIF]: "Actif",
    [Statut.INACTIF]: "Inactif"
  };

  public static getLibelle(statut?: Statut): string {
    return statut ? this.libelles[statut] : "";
  }
}
