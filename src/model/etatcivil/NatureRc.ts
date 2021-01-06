export enum TypeNatureFicheRc {
  CURATELLE_SIMPLE = "CURATELLE_SIMPLE",
  CURATELLE_AMENAGEE = "CURATELLE_AMENAGEE",
  CURATELLE_RENFORCEE = "CURATELLE_RENFORCEE",
  CURATELLE_RENFORCEE_ASSISTANCE = "CURATELLE_RENFORCEE_ASSISTANCE",
  HABILITATION_FAMILIALE_GENERALE = "HABILITATION_FAMILIALE_GENERALE",
  PRESOMPTION_ABSENCE = "PRESOMPTION_ABSENCE",
  PRESOMPTION_ABSENCE_AVEC_DESIGNATION = "PRESOMPTION_ABSENCE_AVEC_DESIGNATION",
  RADIATION_DEMANDE_HOMOLOGATION = "RADIATION_DEMANDE_HOMOLOGATION",
  DEMANDE_HOMOLOGATION_UN_CHANGEMENT = "DEMANDE_HOMOLOGATION_UN_CHANGEMENT",
  DEMANDE_JUDICIAIRE_EN_SEPARATION_BIENS = "DEMANDE_JUDICIAIRE_EN_SEPARATION_BIENS",
  TUTELLE_AMENAGEE = "TUTELLE_AMENAGEE",
  TUTELLE_AUX_BIENS = "TUTELLE_AUX_BIENS",
  TUTELLE_AUX_BIENS_AVEC_ASSISTANCE = "TUTELLE_AUX_BIENS_AVEC_ASSISTANCE",
  TUTELLE_AUX_BIENS_AVEC_REPRESENTATION = "TUTELLE_AUX_BIENS_AVEC_REPRESENTATION",
  HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC = "HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC",
  HABILITATION_ENTRE_EPOUX_219CC = "HABILITATION_ENTRE_EPOUX_219CC",
  SAUVEGARDE_JUSTICE_433CC = "SAUVEGARDE_JUSTICE_433CC",
  MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE = "MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE",
  MESURE_ACCOMPAGNEMENT_JUDICIAIRE = "MESURE_ACCOMPAGNEMENT_JUDICIAIRE"
}

export class NatureFicheRcUtil {
  private static readonly libelles = {
    [TypeNatureFicheRc.CURATELLE_SIMPLE]: "Curatelle simple",
    [TypeNatureFicheRc.CURATELLE_AMENAGEE]: "Curatelle aménagée",
    [TypeNatureFicheRc.CURATELLE_RENFORCEE]: "Curatelle renforcée",
    [TypeNatureFicheRc.CURATELLE_RENFORCEE_ASSISTANCE]:
      "Curatelle renforcée avec assistance pour les actes à la personne",
    [TypeNatureFicheRc.HABILITATION_FAMILIALE_GENERALE]:
      "Habilitation familiale générale",
    [TypeNatureFicheRc.PRESOMPTION_ABSENCE]: "Présomption d'absence",
    [TypeNatureFicheRc.PRESOMPTION_ABSENCE_AVEC_DESIGNATION]:
      "Présomption d’absence avec désignation d’un représentant",
    [TypeNatureFicheRc.RADIATION_DEMANDE_HOMOLOGATION]:
      "Radiation de la requête en homologation d’un changement de régime matrimonial",
    [TypeNatureFicheRc.DEMANDE_HOMOLOGATION_UN_CHANGEMENT]:
      "Requête en homologation d’un changement de régime matrimonial",
    [TypeNatureFicheRc.DEMANDE_JUDICIAIRE_EN_SEPARATION_BIENS]:
      "Demande judiciaire en séparation de biens",
    [TypeNatureFicheRc.TUTELLE_AMENAGEE]: "Tutelle aménagée",
    [TypeNatureFicheRc.TUTELLE_AUX_BIENS]: "Tutelle aux biens",
    [TypeNatureFicheRc.TUTELLE_AUX_BIENS_AVEC_ASSISTANCE]:
      "Tutelle aux biens et à la personne (avec assistance)",
    [TypeNatureFicheRc.TUTELLE_AUX_BIENS_AVEC_REPRESENTATION]:
      "Tutelle aux biens et à la personne (avec représentation) ",
    [TypeNatureFicheRc.HABILITATION_JUDICIAIRE_ENTRE_EPOUX_217CC]:
      "Habilitation judiciaire entre époux (217cc)",
    [TypeNatureFicheRc.HABILITATION_ENTRE_EPOUX_219CC]:
      "Habilitation entre époux (219cc)",
    [TypeNatureFicheRc.SAUVEGARDE_JUSTICE_433CC]: "Sauvegarde justice (433cc)",
    [TypeNatureFicheRc.MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE]:
      "Mesure d’accompagnement social personnalisé (L271-1 casf)",
    [TypeNatureFicheRc.MESURE_ACCOMPAGNEMENT_JUDICIAIRE]:
      "Mesure d’accompagnement judiciaire (495cc) "
  };

  public static getLibelle(nature: TypeNatureFicheRc): string {
    return nature ? this.libelles[nature] : "";
  }
}
