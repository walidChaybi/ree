/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class ComplementObjetRequete extends EnumWithComplete {
  public static readonly COPIE_ACTE_NON_RECUE = new ComplementObjetRequete(
    "COPIE_ACTE_NON_RECUE",
    "Je n'ai pas reçu la copie de mon acte"
  );
  public static readonly ACTE_PLUS_CENT_ANS = new ComplementObjetRequete(
    "ACTE_PLUS_CENT_ANS",
    "Je recherche un acte de plus de 100 ans"
  );
  public static readonly GENEALOGIE = new ComplementObjetRequete(
    "GENEALOGIE",
    "Je fais des recherches généalogiques"
  );
  public static readonly MODIFICATION_RECTIFICATION_MAJ_ACTE = new ComplementObjetRequete(
    "MODIFICATION_RECTIFICATION_MAJ_ACTE",
    "Je souhaite rectifier, modifier et/ou mettre à jour un acte"
  );
  public static readonly DEMANDE_TRANSCRIPTION_MAGHREB = new ComplementObjetRequete(
    "DEMANDE_TRANSCRIPTION_MAGHREB",
    "Je souhaite faire transcrire un acte de l'état civil concernant une naissance, une reconnaissance, un mariage ou un décès en Algérie, au Maroc et en Tunisie"
  );
  public static readonly TRANSCRIPTION_MAGHREB_ENVOYE_SANS_NOUVELLES = new ComplementObjetRequete(
    "TRANSCRIPTION_MAGHREB_ENVOYE_SANS_NOUVELLES",
    "J'ai envoyé mon dossier au Bureau des transcriptions pour le Maghreb, je n'ai pas de nouvelles"
  );
  public static readonly TRANSCRIPTION_EUROPE_ENVOYE_SANS_NOUVELLES = new ComplementObjetRequete(
    "TRANSCRIPTION_EUROPE_ENVOYE_SANS_NOUVELLES",
    "J'ai envoyé mon dossier au Bureau des transcriptions pour l'Europe, je n'ai pas de nouvelles"
  );
  public static readonly TRANSCRIPTION_EN_COURS = new ComplementObjetRequete(
    "TRANSCRIPTION_EN_COURS",
    "Ma demande est en cours, j'ai un numéro de dossier"
  );
  public static readonly DEMANDE_TRANSCRIPTION_LUX_MON_POL_SUI_LIE = new ComplementObjetRequete(
    "DEMANDE_TRANSCRIPTION_LUX_MON_POL_SUI_LIE",
    "Je souhaiterais faire transcrire un acte de l'état civil concernant le Luxembourg, Monaco, la Pologne, la Suisse et le Liechtenstein"
  );
  public static readonly DEMANDE_TRANSCRIPTION_AUTRE_PAYS = new ComplementObjetRequete(
    "DEMANDE_TRANSCRIPTION_AUTRE_PAYS",
    "Je souhaiterais faire transcrire un acte de l'état civil concernant une naissance, un mariage, un décès survenu dans un autre pays"
  );
  public static readonly MARIAGE_CONSULAT_ETRANGER = new ComplementObjetRequete(
    "MARIAGE_CONSULAT_ETRANGER",
    "Je me suis marié dans un consulat étranger en France"
  );
  public static readonly CERTIFICAT_NATIONALITE = new ComplementObjetRequete(
    "CERTIFICAT_NATIONALITE",
    "Je souhaiterais obtenir un certificat de nationalité française"
  );
  public static readonly SOUHAIT_DEVENIR_FRANCAIS = new ComplementObjetRequete(
    "SOUHAIT_DEVENIR_FRANCAIS",
    "Je souhaite devenir français"
  );
  public static readonly DEMANDE_ACQUISITION_NATIONALITE = new ComplementObjetRequete(
    "DEMANDE_ACQUISITION_NATIONALITE",
    "J'ai demandé à acquérir la nationalité française"
  );
  public static readonly SUITE_ACQUISITION_NATIONALITE_DEMANDE_ACTE_EC_FR = new ComplementObjetRequete(
    "SUITE_ACQUISITION_NATIONALITE_DEMANDE_ACTE_EC_FR",
    "Je viens de devenir Français, je souhaite obtenir mon acte d'état civil"
  );
  public static readonly SUITE_ACQUISITION_NATIONALITE_DEMANDE_ACTE_EC_ETR = new ComplementObjetRequete(
    "SUITE_ACQUISITION_NATIONALITE_DEMANDE_ACTE_EC_ETR",
    "Je suis devenu Français. Je souhaite récupérer mon acte de l'état civil étranger"
  );
  public static readonly BESOIN_JUSTIFICATIF_NATIONALITE = new ComplementObjetRequete(
    "BESOIN_JUSTIFICATIF_NATIONALITE",
    "Je suis devenu Français par décret ou déclaration, j'ai besoin d'un justificatif de nationalité"
  );
  public static readonly RECHERCHE_DECRET_NATURALISATION = new ComplementObjetRequete(
    "RECHERCHE_DECRET_NATURALISATION",
    "Je suis devenu Français par décret, je recherche un décret de naturalisation"
  );
  public static readonly ACTE_DETENU_SCEC_QUESTION_FRANCAIS = new ComplementObjetRequete(
    "ACTE_DETENU_SCEC_QUESTION_FRANCAIS",
    "Mon acte est détenu par le SCEC, je voudrais savoir si je suis Français"
  );
  public static readonly QUESTION_ASCENDANTS_FRANCAIS = new ComplementObjetRequete(
    "QUESTION_ASCENDANTS_FRANCAIS",
    "Je souhaite savoir si mes ascendants sont Français"
  );
  public static readonly DOUBLE_NATIONALITE_PERTE_REINTEGRATION = new ComplementObjetRequete(
    "DOUBLE_NATIONALITE_PERTE_REINTEGRATION",
    "Double nationalité/ réintégration/ perte, suis-je Français ?"
  );
  public static readonly PERTE_JUSTIFICATIF_NATIONALITE = new ComplementObjetRequete(
    "PERTE_JUSTIFICATIF_NATIONALITE",
    "J'ai perdu mon justificatif de nationalité"
  );
  public static readonly MISE_A_JOUR_ETAT_CIVIL = new ComplementObjetRequete(
    "MISE_A_JOUR_ETAT_CIVIL",
    "Je souhaite mettre à jour mes actes de l'état civil"
  );
  public static readonly DEMANDE_LIVRET_FAMILLE = new ComplementObjetRequete(
    "DEMANDE_LIVRET_FAMILLE",
    "Je n'ai plus mon livret de famille (perte, destruction, séparation, vol)"
  );
  public static readonly MAJ_DUPLICATA_LIVRET_FAMILLE = new ComplementObjetRequete(
    "MAJ_DUPLICATA_LIVRET_FAMILLE",
    "Je souhaiterais obtenir la mise à jour de mon livret de famille ou obtenir un duplicata"
  );
  public static readonly CERTIFICAT_RC_RCA_PACS = new ComplementObjetRequete(
    "CERTIFICAT_RC_RCA_PACS",
    "Je souhaiterais obtenir un certificat relatif au répertoire civil, répertoire civil annexe ou au Registre national des PACS des étrangers nés à l'étranger"
  );
  public static readonly AUTHENTICITE_CERTIFICAT = new ComplementObjetRequete(
    "AUTHENTICITE_CERTIFICAT",
    "Je voudrais m'assurer de l'authenticité du certificat dématérialisé délivré"
  );
  public static readonly DELAIS_TRAITEMENT_DEMANDES = new ComplementObjetRequete(
    "DELAIS_TRAITEMENT_DEMANDES",
    "Je souhaiterais connaitre les délais de traitement des demandes"
  );
  public static readonly QUESTION_PACS = new ComplementObjetRequete(
    "QUESTION_PACS",
    "Ma question porte sur un autre sujet lié aux PACS"
  );
  public static readonly DISPERSION_CENDRES = new ComplementObjetRequete(
    "DISPERSION_CENDRES",
    "Je souhaiterais déclarer une dispersion de cendres pour une personne née à l'étranger"
  );
  public static readonly QUESTION_PERMIS_CONDUIRE_ETR = new ComplementObjetRequete(
    "QUESTION_PERMIS_CONDUIRE_ETR",
    "Ma question concerne un permis de conduire étranger"
  );
  public static readonly QUESTION_SEJOUR_ETRANGER_FRANCE = new ComplementObjetRequete(
    "QUESTION_SEJOUR_ETRANGER_FRANCE",
    "Ma question concerne un séjour d'un étranger en France"
  );
  public static readonly QUESTION_SEJOUR_FRANCAIS_ETR = new ComplementObjetRequete(
    "QUESTION_SEJOUR_FRANCAIS_ETR",
    "Ma question concerne un séjour d'un Francais à l'étranger"
  );
  public static readonly QUESTION_VISA = new ComplementObjetRequete(
    "QUESTION_VISA",
    "Ma question concerne un visa"
  );
  public static readonly QUESTION_DEMANDE_APOSTILLE = new ComplementObjetRequete(
    "QUESTION_DEMANDE_APOSTILLE",
    "Ma question concerne une demande d'apostille"
  );
  public static readonly QUESTION_DEMANDE_LEGALISATION_ACTE = new ComplementObjetRequete(
    "QUESTION_DEMANDE_LEGALISATION_ACTE",
    "Ma question concerne une demande de légalisation d'acte"
  );
  public static readonly QUESTION_ACTE_NOTARIE = new ComplementObjetRequete(
    "QUESTION_ACTE_NOTARIE",
    "Ma question concerne un acte notarié"
  );
  public static readonly QUESTION_CASIER_JUDICIAIRE = new ComplementObjetRequete(
    "QUESTION_CASIER_JUDICIAIRE",
    "Ma question concerne un casier judiciaire"
  );
  public static readonly QUESTION_DEMANDE_CERTIFICAT_CAPACITE_MARIAGE = new ComplementObjetRequete(
    "QUESTION_DEMANDE_CERTIFICAT_CAPACITE_MARIAGE",
    "Ma question concerne une demande de certificat de capacité à mariage"
  );
  public static readonly PROBLEME_TECHNIQUE = new ComplementObjetRequete(
    "PROBLEME_TECHNIQUE",
    "Je rencontre un problème technique lors de ma demande d'acte"
  );
  public static readonly CODE_VERIFICATION_NON_VISIBLE = new ComplementObjetRequete(
    "CODE_VERIFICATION_NON_VISIBLE",
    "Le code de télévérification n'apparait pas sur mon acte"
  );
  public static readonly ACTE_NON_RECU = new ComplementObjetRequete(
    "ACTE_NON_RECU",
    "Je n'ai pas reçu mon acte"
  );
  public static readonly QUESTION_AUTRE_DEMARCHE = new ComplementObjetRequete(
    "QUESTION_AUTRE_DEMARCHE",
    "Je suis une administration ou un notaire et ma question concerne une autre démarche"
  );
  public static readonly REPONSE_LIBRE_AGENT = new ComplementObjetRequete(
    "REPONSE_LIBRE_AGENT",
    "Réponse libre agent"
  );
  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ComplementObjetRequete);
  }
}
