/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

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
  public static readonly TRANSCRIPTION_MAGHREB = new ComplementObjetRequete(
    "TRANSCRIPTION_MAGHREB",
    "Je souhaiterais faire transcrire un acte de l'état civil concernant une naissance, une reconnaissance, un mariage ou un décès en Algérie, au Maroc et en Tunisie"
  );
  public static readonly TRANSCRIPTION_LUX_MON_POL_SUI_LIE = new ComplementObjetRequete(
    "TRANSCRIPTION_LUX_MON_POL_SUI_LIE",
    "Je souhaiterais faire transcrire un acte de l'état civil concernant le Luxembourg, Monaco, la Pologne, la Suisse et le Liechtenstein"
  );
  public static readonly TRANSCRIPTION_AUTRE_PAYS = new ComplementObjetRequete(
    "TRANSCRIPTION_AUTRE_PAYS",
    "Je souhaiterais faire transcrire un acte de l'état civil concernant une naissance, un mariage, un décès survenu dans un autre pays"
  );
  public static readonly TRANSCRIPTION_CONSULAT_ETRANGER = new ComplementObjetRequete(
    "TRANSCRIPTION_CONSULAT_ETRANGER",
    "Je me suis marié dans un consulat étranger en France"
  );
  public static readonly CERTIFICAT_NATIONALITE = new ComplementObjetRequete(
    "CERTIFICAT_NATIONALITE",
    "Je souhaiterais obtenir un certificat de nationalité française"
  );
  public static readonly DEMANDE_NATIONALITE = new ComplementObjetRequete(
    "DEMANDE_NATIONALITE",
    "Je souhaiterais faire une demande de nationalité de française"
  );
  public static readonly COPIE_NATURALISATION = new ComplementObjetRequete(
    "COPIE_NATURALISATION",
    "Je souhaiterais obtenir une copie d'un décret de naturalisation"
  );
  public static readonly SUITE_DEMANDE_NATIONALITE = new ComplementObjetRequete(
    "SUITE_DEMANDE_NATIONALITE",
    "J'ai demandé à acquérir la nationalité française"
  );
  public static readonly DOUBLE_NATIONALITE_PERTE_REINTEGRATION = new ComplementObjetRequete(
    "DOUBLE_NATIONALITE_PERTE_REINTEGRATION",
    "J'ai une question relative à la double nationalité/ perte de nationalité / réintégration"
  );
  public static readonly NATIONALITE_PARENTS = new ComplementObjetRequete(
    "NATIONALITE_PARENTS",
    "Je cherche des informations sur la nationalité de mes parents ou grands parents"
  );
  public static readonly PERTE_JUSTIFICATIF_NATIONALITE = new ComplementObjetRequete(
    "PERTE_JUSTIFICATIF_NATIONALITE",
    "J'ai perdu mon justificatif de nationalité française"
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
    "J'ai besoin d'un certificat"
  );
  public static readonly DISPERSION_CENDRES = new ComplementObjetRequete(
    "DISPERSION_CENDRES",
    "Je souhaite déclarer une dispertion de cendres en pleine nature"
  );
  public static readonly MENTION_RC = new ComplementObjetRequete(
    "MENTION_RC",
    "Je souhaite obtenir le contenu d'une mention RC"
  );
  public static readonly AUTHENTICITE_CERTIFICAT = new ComplementObjetRequete(
    "AUTHENTICITE_CERTIFICAT",
    "Authenticité du certificat dématérialisé"
  );
  public static readonly QUESTION_PACS = new ComplementObjetRequete(
    "QUESTION_PACS",
    "Je souhaite poser une question relative au PACS"
  );

  public static readonly QUESTION_AUTRE_DEMARCHE = new ComplementObjetRequete(
    "QUESTION_AUTRE_DEMARCHE",
    "Ma question concerne une autre démarche"
  );
  public static readonly PROBLEME_TECHNIQUE = new ComplementObjetRequete(
    "PROBLEME_TECHNIQUE",
    "Problème technique"
  );
  public static readonly QUESTION_AUTRE_INFORMATION = new ComplementObjetRequete(
    "QUESTION_AUTRE_INFORMATION",
    "Ma question concerne une autre démarche"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ComplementObjetRequete);
  }
}
