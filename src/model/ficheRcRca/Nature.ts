export enum TypeNatureFiche {
  CURATELLE_SIMPLE = "CURATELLE_SIMPLE",
  CURATELLE_AMENAGEE = "CURATELLE_AMENAGEE",
  CURATELLE_RENFORCEE = "CURATELLE_RENFORCEE",
  CURATELLE_RENFORCEE_ASSISTANCE = "CURATELLE_RENFORCEE_ASSISTANCE",
  HABILITATION_FAMILIALE_GENERALE = "HABILITATION_FAMILIALE_GENERALE",
  PRESOMPTION_D_ABSENCE = "PRESOMPTION_D_ABSENCE",
  PRESOMPTION_D_ABSENCE_AVEC_DESIGNATION = "PRESOMPTION_D_ABSENCE_AVEC_DESIGNATION",
  RADIATION_DE_DEMANDE_D_HOMOLOGATION = "RADIATION_DE_DEMANDE_D_HOMOLOGATION",
  DEMANDE_D_HOMOLOGATION_D_UN_CHANGEMENT = "DEMANDE_D_HOMOLOGATION_D_UN_CHANGEMENT",
  DEMANDE_JUDICIAIRE_EN_SEPARATION_DE_BIENS = "DEMANDE_JUDICIAIRE_EN_SEPARATION_DE_BIENS",
  TUTELLE_AMENAGEE = "TUTELLE_AMENAGEE",
  TUTELLE_AUX_BIENS = "TUTELLE_AUX_BIENS",
  TUTELLE_AUX_BIENS_AVEC_ASSISTANCE = "TUTELLE_AUX_BIENS_AVEC_ASSISTANCE",
  TUTELLE_AUX_BIENS_AVEC_REPRSENTATION = "TUTELLE_AUX_BIENS_AVEC_REPRSENTATION",
  HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC = "HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC",
  HABILITATION_ENTRE_EPOUX_219CC = "HABILITATION_ENTRE_EPOUX_219CC",
  SAUVEGARDE_JUSTICE_433CC = "SAUVEGARDE_JUSTICE_433CC",
  MESURE_D_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE = "MESURE_D_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE",
  MESURE_D_ACCOMPAGNEMENT_JUDICIAIRE = "MESURE_D_ACCOMPAGNEMENT_JUDICIAIRE"
}

export class NatureFicheUtil {
  private static readonly libelles = {
    [TypeNatureFiche.CURATELLE_SIMPLE]: "Curatelle simple",
    [TypeNatureFiche.CURATELLE_AMENAGEE]: "Curatelle aménagée",
    [TypeNatureFiche.CURATELLE_RENFORCEE]: "Curatelle renforcée",
    [TypeNatureFiche.CURATELLE_RENFORCEE_ASSISTANCE]:
      "Curatelle renforcée avec assistance pour les actes à la personne",
    [TypeNatureFiche.HABILITATION_FAMILIALE_GENERALE]:
      "Habilitation familiale générale",
    [TypeNatureFiche.PRESOMPTION_D_ABSENCE]: "Présomption d'absence",
    [TypeNatureFiche.PRESOMPTION_D_ABSENCE_AVEC_DESIGNATION]:
      "Présomption d’absence avec désignation d’un représentant",
    [TypeNatureFiche.RADIATION_DE_DEMANDE_D_HOMOLOGATION]:
      "Radiation de la requête en homologation d’un changement de régime matrimonial",
    [TypeNatureFiche.DEMANDE_D_HOMOLOGATION_D_UN_CHANGEMENT]:
      "Requête en homologation d’un changement de régime matrimonial",
    [TypeNatureFiche.DEMANDE_JUDICIAIRE_EN_SEPARATION_DE_BIENS]:
      "Demande judiciaire en séparation de biens",
    [TypeNatureFiche.TUTELLE_AMENAGEE]: "Tutelle aménagée",
    [TypeNatureFiche.TUTELLE_AUX_BIENS]: "Tutelle aux biens",
    [TypeNatureFiche.TUTELLE_AUX_BIENS_AVEC_ASSISTANCE]:
      "Tutelle aux biens et à la personne (avec assistance)",
    [TypeNatureFiche.TUTELLE_AUX_BIENS_AVEC_REPRSENTATION]:
      "Tutelle aux biens et à la personne (avec représentation) ",
    [TypeNatureFiche.HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC]:
      "Habilitation judiciaire entre époux (217cc)",
    [TypeNatureFiche.HABILITATION_ENTRE_EPOUX_219CC]:
      "Habilitation entre époux (219cc)",
    [TypeNatureFiche.SAUVEGARDE_JUSTICE_433CC]: "Sauvegarde justice (433cc)",
    [TypeNatureFiche.MESURE_D_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE]:
      "Mesure d’accompagnement social personnalisé (L271-1 casf)",
    [TypeNatureFiche.MESURE_D_ACCOMPAGNEMENT_JUDICIAIRE]:
      "Mesure d’accompagnement judiciaire (495cc) "
  };

  public static getLibelle(nature?: TypeNatureFiche): string {
    return nature ? this.libelles[nature] : "";
  }
}
