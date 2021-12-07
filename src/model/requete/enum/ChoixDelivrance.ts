/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class ChoixDelivrance extends EnumWithComplete {
  public static readonly DELIVRER_EC_COPIE_INTEGRALE = new ChoixDelivrance(
    "DELIVRER_EC_COPIE_INTEGRALE",
    "Délivrer E/C - Copie intégrale"
  );
  public static readonly DELIVRER_EC_EXTRAIT_AVEC_FILIATION = new ChoixDelivrance(
    "DELIVRER_EC_EXTRAIT_AVEC_FILIATION",
    "Délivrer E/C - Extrait avec filiation"
  );
  public static readonly DELIVRER_EC_EXTRAIT_SANS_FILIATION = new ChoixDelivrance(
    "DELIVRER_EC_EXTRAIT_SANS_FILIATION",
    "Délivrer E/C - Extrait sans filiation"
  );
  public static readonly DELIVRER_EC_EXTRAIT_PLURILINGUE = new ChoixDelivrance(
    "DELIVRER_EC_EXTRAIT_PLURILINGUE",
    "Délivrer E/C - Extrait plurilingue"
  );
  public static readonly DELIVRER_EC_COPIE_ARCHIVE = new ChoixDelivrance(
    "DELIVRER_EC_COPIE_ARCHIVE",
    "Délivrer E/C - Copie archive"
  );
  public static readonly REP_SANS_DEL_EC_REQUETE_INCOMPLETE = new ChoixDelivrance(
    "REP_SANS_DEL_EC_REQUETE_INCOMPLETE",
    "Réponse sans délivrance E/C - Requête incomplète"
  );
  public static readonly REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC = new ChoixDelivrance(
    "REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC",
    "Réponse sans délivrance E/C - Acte non détenu au SCEC"
  );
  public static readonly REP_SANS_DEL_EC_DIVERS = new ChoixDelivrance(
    "REP_SANS_DEL_EC_DIVERS",
    "Réponse sans délivrance E/C - Divers"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ChoixDelivrance);
  }

  public static estReponseAvecDelivrance(choix: ChoixDelivrance) {
    if (
      choix === ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC ||
      choix === ChoixDelivrance.REP_SANS_DEL_EC_DIVERS ||
      choix === ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE
    ) {
      return false;
    } else return true;
  }
}
