export enum TypeDecision {
  JUGEMENT = "JUGEMENT",
  ARRET = "ARRET",
  CONVENTION = "CONVENTION",
  ACTE_NOTARIE = "ACTE_NOTARIE",
  DECLARATION = "DECLARATION"
}

export class DecisionUtil {
  private static readonly libelles = {
    [TypeDecision.JUGEMENT]: "Jugement",
    [TypeDecision.ARRET]: "Arrêt",
    [TypeDecision.CONVENTION]: "Convention",
    [TypeDecision.ACTE_NOTARIE]: "Acte notarié",
    [TypeDecision.DECLARATION]: "Déclaration"
  };

  public static getLibelle(decision?: TypeDecision): string {
    return decision ? this.libelles[decision] : "";
  }

  public static isJugement(decision?: TypeDecision): boolean {
    return decision === TypeDecision.JUGEMENT;
  }
}
