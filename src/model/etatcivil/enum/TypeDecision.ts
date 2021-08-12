export enum TypeDecision {
  JUGEMENT = "JUGEMENT",
  ARRET = "ARRET",
  CONVENTION = "CONVENTION",
  ACTE_NOTARIE = "ACTE_NOTARIE",
  DECLARATION = "DECLARATION",
  ONAC = "ONAC",
  ORDONNANCE = "ORDONNANCE",
  JUDICIAIRE = "JUDICIAIRE",
  REQUETE = "REQUETE"
}

export const DECISIONS_JURIDICTION = [
  "JUGEMENT",
  "ARRET",
  "ORDONNANCE",
  "DECISION_JUDICIAIRE"
];

export class TypeDecisionUtil {
  private static readonly libelles = {
    [TypeDecision.JUGEMENT]: "Jugement",
    [TypeDecision.ARRET]: "Arrêt",
    [TypeDecision.CONVENTION]: "Convention",
    [TypeDecision.ACTE_NOTARIE]: "Acte notarié",
    [TypeDecision.DECLARATION]: "Déclaration",
    [TypeDecision.ONAC]: "Onac",
    [TypeDecision.ORDONNANCE]: "Ordonnance",
    [TypeDecision.JUDICIAIRE]: "Judiciaire",
    [TypeDecision.REQUETE]: "Requête"
  };

  public static getLibelle(typeDecision?: TypeDecision): string {
    return typeDecision ? this.libelles[typeDecision] : "";
  }

  public static isJugement(typeDecision?: TypeDecision): boolean {
    return typeDecision === TypeDecision.JUGEMENT;
  }

  public static isDecisionJuridiction(typeDecision: TypeDecision): boolean {
    return DECISIONS_JURIDICTION.indexOf(typeDecision) > -1;
  }
}
