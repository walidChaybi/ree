/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class NatureRca extends EnumWithLibelle {
  public static readonly ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT = new NatureRca(
    "Acte de notoriété constatant la possession d'état"
  );
  public static readonly ANNULATION_LEGITIMATION = new NatureRca(
    "Annulation de légitimation"
  );
  public static readonly ANNULATION_RECONNAISSANCE = new NatureRca(
    "Annulation de reconnaissance"
  );
  public static readonly CHANGEMENT_NOM = new NatureRca("Changement de nom");
  public static readonly CHANGEMENT_PRENOM = new NatureRca(
    "Changement de prénom"
  );
  public static readonly CHANGEMENT_SEXE = new NatureRca("Changement de sexe");
  public static readonly CHANGEMENT_SEXE_ET_PRENOM = new NatureRca(
    "Changement de sexe et de prénom"
  );
  public static readonly DESAVEU_PATERNITE = new NatureRca(
    "Désaveu de paternité"
  );
  public static readonly DECLARATION_NATIONALITE_FRANCAISE = new NatureRca(
    "Déclaration de la nationalité française"
  );
  public static readonly ETABLISSEMENT_PATERNITE = new NatureRca(
    "Établissement de paternité"
  );
  public static readonly EXEQUATUR_JUGEMENT_RECONNAISSANCE = new NatureRca(
    "Exequatur de jugement de reconnaissance"
  );
  public static readonly EXEQUATUR_JUGEMENT_TUTELLE = new NatureRca(
    "Exequatur de jugement de tutelle"
  );
  public static readonly EXEQUATUR_ORDONNANCE_CHANGEMENT_NOM = new NatureRca(
    "Exequatur d'ordonnance de changement de nom"
  );
  public static readonly EXEQUATUR_UN_JUGEMENT_ADOPTION_PROTECTION = new NatureRca(
    "Exequatur d'un jugement d'adoption protection"
  );
  public static readonly EXTRANEITE = new NatureRca("Extranéité");
  public static readonly FILIATION = new NatureRca("Filiation");
  public static readonly JUGEMENT_ADOPTION_PAR_LA_NATION = new NatureRca(
    "Jugement d'adoption par la Nation"
  );
  public static readonly JUGEMENT_DECLARATIF_ABSENCE = new NatureRca(
    "Jugement déclaratif d'absence"
  );
  public static readonly JUGEMENT_DECLARATIF_DECES = new NatureRca(
    "Jugement déclaratif de décès"
  );
  public static readonly JUGEMENT_EN_CONTESTATION_MATERNITE = new NatureRca(
    "Jugement en contestation de maternité"
  );
  public static readonly JUGEMENT_EN_CONTESTATION_PATERNITE = new NatureRca(
    "Jugement en contestation en paternité"
  );
  public static readonly JUGEMENT_RECTIFICATIF = new NatureRca(
    "Jugement rectificatif"
  );
  public static readonly JUGEMENT_TRANCHANT_UN_CONFLIT_FILIATION = new NatureRca(
    "Jugement tranchant en conflit de filiation"
  );
  public static readonly LEGITIMATION = new NatureRca("Légitimation");
  public static readonly MORT_EN_DEPORTATION = new NatureRca(
    "Mort en déportation"
  );
  public static readonly MORT_POUR_LA_FRANCE = new NatureRca(
    "Mort pour la France"
  );
  public static readonly NATIONALITE_FRANCAISE = new NatureRca(
    "Nationalité française"
  );
  public static readonly OPPOSITION_A_LA_NATIONALITE_FRANCAISE = new NatureRca(
    "Opposition à la nationalité française"
  );
  public static readonly REFUS_TRANSCRIPTION_ACTE_NAISSANCE = new NatureRca(
    "Refus de transcription d'acte de naissance"
  );
  public static readonly REVOCATION_ADOPTION_SIMPLE = new NatureRca(
    "Révocation d’adoption simple"
  );
  public static readonly ADOPTION_SIMPLE = new NatureRca("Adoption simple");
  public static readonly ANNULATION_MARIAGE = new NatureRca(
    "Annulation de mariage"
  );
  public static readonly CHANGEMENT_REGIME_MATRIMONIAL = new NatureRca(
    "Changement de régime matrimonial"
  );
  public static readonly DESIGNATION_LOI_APPLICABLE8REGIME_MATRIMONIAL = new NatureRca(
    "Désignation de la loi applicable au régime matrimonial"
  );
  public static readonly DIVORCE = new NatureRca(
    "Divorce contentieux devant un juge"
  );
  public static readonly EXEQUATUR_JUGEMENT_DIVORCE = new NatureRca(
    "Exequatur de jugement de divorce"
  );
  public static readonly MARIAGE_DECLARE_INOPPOSABLE_FRANCE = new NatureRca(
    "Mariage déclaré inopposable en France"
  );
  public static readonly REFUS_TRANSCRIPTION_ACTE_MARIAGE = new NatureRca(
    "Refus de transcription d'acte de mariage"
  );
  public static readonly SEPARATION_CORPS = new NatureRca(
    "Séparation de corps"
  );
  public static readonly DIVORCE_CONSENTEMENT_MUTUEL = new NatureRca(
    "Divorce par consentement mutuel devant notaire"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRca);
  }
}
