export enum TypeNatureFicheRca {
  ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT = "ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT",
  ANNULATION_LEGITIMATION = "ANNULATION_LEGITIMATION",
  ANNULATION_RECONNAISSANCE = "ANNULATION_RECONNAISSANCE",
  CHANGEMENT_NOM = "CHANGEMENT_NOM",
  CHANGEMENT_PRENOM = "CHANGEMENT_PRENOM",
  CHANGEMENT_SEXE = "CHANGEMENT_SEXE",
  CHANGEMENT_SEXE_ET_PRENOM = "CHANGEMENT_SEXE_ET_PRENOM",
  DESAVEU_PATERNITE = "DESAVEU_PATERNITE",
  DECLARATION_NATIONALITE_FRANCAISE = "DECLARATION_NATIONALITE_FRANCAISE",
  ETABLISSEMENT_PATERNITE = "ETABLISSEMENT_PATERNITE",
  EXEQUATUR_JUGEMENT_RECONNAISSANCE = "EXEQUATUR_JUGEMENT_RECONNAISSANCE",
  EXEQUATUR_JUGEMENT_TUTELLE = "EXEQUATUR_JUGEMENT_TUTELLE",
  EXEQUATUR_ORDONNANCE_CHANGEMENT_NOM = "EXEQUATUR_ORDONNANCE_CHANGEMENT_NOM",
  EXEQUATUR_UN_JUGEMENT_ADOPTION_PROTECTION = "EXEQUATUR_UN_JUGEMENT_ADOPTION_PROTECTION",
  EXTRANEITE = "EXTRANEITE",
  FILIATION = "FILIATION",
  JUGEMENT_ADOPTION_PAR_LA_NATION = "JUGEMENT_ADOPTION_PAR_LA_NATION",
  JUGEMENT_DECLARATIF_ABSENCE = "JUGEMENT_DECLARATIF_ABSENCE",
  JUGEMENT_DECLARATIF_DECES = "JUGEMENT_DECLARATIF_DECES",
  JUGEMENT_EN_CONTESTATION_MATERNITE = "JUGEMENT_EN_CONTESTATION_MATERNITE",
  JUGEMENT_EN_CONTESTATION_PATERNITE = "JUGEMENT_EN_CONTESTATION_PATERNITE",
  JUGEMENT_RECTIFICATIF = "JUGEMENT_RECTIFICATIF",
  JUGEMENT_TRANCHANT_UN_CONFLIT_FILIATION = "JUGEMENT_TRANCHANT_UN_CONFLIT_FILIATION",
  LEGITIMATION = "LEGITIMATION",
  MORT_EN_DEPORTATION = "MORT_EN_DEPORTATION",
  MORT_POUR_LA_FRANCE = "MORT_POUR_LA_FRANCE",
  NATIONALITE_FRANCAISE = "NATIONALITE_FRANCAISE",
  OPPOSITION_A_LA_NATIONALITE_FRANCAISE = "OPPOSITION_A_LA_NATIONALITE_FRANCAISE",
  REFUS_TRANSCRIPTION_ACTE_NAISSANCE = "REFUS_TRANSCRIPTION_ACTE_NAISSANCE",
  REVOCATION_ADOPTION_SIMPLE = "REVOCATION_ADOPTION_SIMPLE",
  ADOPTION_SIMPLE = "ADOPTION_SIMPLE",
  ANNULATION_MARIAGE = "ANNULATION_MARIAGE",
  CHANGEMENT_REGIME_MATRIMONIAL = "CHANGEMENT_REGIME_MATRIMONIAL",
  DESIGNATION_LOI_APPLICABLE8REGIME_MATRIMONIAL = "DESIGNATION_LOI_APPLICABLE8REGIME_MATRIMONIAL",
  DIVORCE = "DIVORCE",
  EXEQUATUR_JUGEMENT_DIVORCE = "EXEQUATUR_JUGEMENT_DIVORCE",
  MARIAGE_DECLARE_INOPPOSABLE_FRANCE = "MARIAGE_DECLARE_INOPPOSABLE_FRANCE",
  REFUS_TRANSCRIPTION_ACTE_MARIAGE = "REFUS_TRANSCRIPTION_ACTE_MARIAGE",
  SEPARATION_CORPS = "SEPARATION_CORPS"
}

export class NatureFicheRcaUtil {
  private static readonly libelles = {
    [TypeNatureFicheRca.ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT]:
      "Acte de notoriété constatant l'apossession d'état",
    [TypeNatureFicheRca.ANNULATION_LEGITIMATION]: "Annulation de légitimation",
    [TypeNatureFicheRca.ANNULATION_RECONNAISSANCE]:
      "Annulation de reconnaissance",
    [TypeNatureFicheRca.CHANGEMENT_NOM]: "Changement de nom",
    [TypeNatureFicheRca.CHANGEMENT_PRENOM]: "Changement de prénom",
    [TypeNatureFicheRca.CHANGEMENT_SEXE]: "Changement de sexe",
    [TypeNatureFicheRca.CHANGEMENT_SEXE_ET_PRENOM]:
      "Changement de sexe et de prénom",
    [TypeNatureFicheRca.DESAVEU_PATERNITE]: "Désaveu de paternité",
    [TypeNatureFicheRca.DECLARATION_NATIONALITE_FRANCAISE]:
      "Déclaration de la nationalité française",
    [TypeNatureFicheRca.ETABLISSEMENT_PATERNITE]: "Établissement de paternité",
    [TypeNatureFicheRca.EXEQUATUR_JUGEMENT_RECONNAISSANCE]:
      "Exequatur de jugement de reconnaissance",
    [TypeNatureFicheRca.EXEQUATUR_JUGEMENT_TUTELLE]:
      "Exequatur de jugement de tutelle",
    [TypeNatureFicheRca.EXEQUATUR_ORDONNANCE_CHANGEMENT_NOM]:
      "Exequatur d'ordonnance de changement de nom",
    [TypeNatureFicheRca.EXEQUATUR_UN_JUGEMENT_ADOPTION_PROTECTION]:
      "Exequatur d'un jugement d'adoption protection",
    [TypeNatureFicheRca.EXTRANEITE]: "Extranéité",
    [TypeNatureFicheRca.FILIATION]: "Filiation",
    [TypeNatureFicheRca.JUGEMENT_ADOPTION_PAR_LA_NATION]:
      "Jugement d'adoption par la Nation",
    [TypeNatureFicheRca.JUGEMENT_DECLARATIF_ABSENCE]:
      "Jugement déclaratif d'absence",
    [TypeNatureFicheRca.JUGEMENT_DECLARATIF_DECES]:
      "Jugement déclaratif de décès",
    [TypeNatureFicheRca.JUGEMENT_EN_CONTESTATION_MATERNITE]:
      "Jugement en contestation de maternité",
    [TypeNatureFicheRca.JUGEMENT_EN_CONTESTATION_PATERNITE]:
      "Jugement en contestation en paternité",
    [TypeNatureFicheRca.JUGEMENT_RECTIFICATIF]: "Jugement rectificatif",
    [TypeNatureFicheRca.JUGEMENT_TRANCHANT_UN_CONFLIT_FILIATION]:
      "Jugement tranchant en conflit de filiation",
    [TypeNatureFicheRca.LEGITIMATION]: "Légitimation",
    [TypeNatureFicheRca.MORT_EN_DEPORTATION]: "Mort en déportation",
    [TypeNatureFicheRca.MORT_POUR_LA_FRANCE]: "Mort pour la France",
    [TypeNatureFicheRca.NATIONALITE_FRANCAISE]: "Nationalité française",
    [TypeNatureFicheRca.OPPOSITION_A_LA_NATIONALITE_FRANCAISE]:
      "Opposition à la nationalité française",
    [TypeNatureFicheRca.REFUS_TRANSCRIPTION_ACTE_NAISSANCE]:
      "Refus de transcription d'acte de naissance",
    [TypeNatureFicheRca.REVOCATION_ADOPTION_SIMPLE]:
      "Révocation d’adoption simple",
    [TypeNatureFicheRca.ADOPTION_SIMPLE]: "Adoption simple",
    [TypeNatureFicheRca.ANNULATION_MARIAGE]: "Annulation de mariage",
    [TypeNatureFicheRca.CHANGEMENT_REGIME_MATRIMONIAL]:
      "Changement de régime matrimonial",
    [TypeNatureFicheRca.DESIGNATION_LOI_APPLICABLE8REGIME_MATRIMONIAL]:
      "Désignation de la loi applicable au régime matrimonial",
    [TypeNatureFicheRca.DIVORCE]: "Divorce",
    [TypeNatureFicheRca.EXEQUATUR_JUGEMENT_DIVORCE]:
      "Exequatur de jugement de divorce",
    [TypeNatureFicheRca.MARIAGE_DECLARE_INOPPOSABLE_FRANCE]:
      "Mariage déclaré inopposable en France",
    [TypeNatureFicheRca.REFUS_TRANSCRIPTION_ACTE_MARIAGE]:
      "Refus de transcription d'acte de mariage",
    [TypeNatureFicheRca.SEPARATION_CORPS]: "Séparation de corps"
  };

  public static getLibelle(nature: TypeNatureFicheRca): string {
    return nature ? this.libelles[nature] : "";
  }
}
