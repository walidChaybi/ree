export enum ETypeDecision {
  JUGEMENT = "Jugement",
  ARRET = "Arrêt",
  CONVENTION = "Convention",
  ACTE_NOTARIE = "Acte notarié",
  DECLARATION = "Déclaration",
  ONAC = "Onac",
  ORDONNANCE = "Ordonnance",
  DECISION_JUDICIAIRE = "Décision judiciaire",
  REQUETE = "Requête",
  DECISION_NOTAIRE = "Décision notaire"
}

export const DECISIONS_JURIDICTION: ETypeDecision[] = [
  ETypeDecision.JUGEMENT,
  ETypeDecision.ARRET,
  ETypeDecision.ORDONNANCE,
  ETypeDecision.DECISION_JUDICIAIRE
];
