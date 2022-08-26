/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "./DocumentDelivranceConstante";

export class ChoixDelivrance extends EnumWithComplete {
  public static readonly DELIVRER_EC_COPIE_INTEGRALE = new ChoixDelivrance(
    "DELIVRER_EC_COPIE_INTEGRALE",
    "Délivrer E/C - Copie intégrale"
  );
  public static readonly DELIVRER_EC_EXTRAIT_AVEC_FILIATION =
    new ChoixDelivrance(
      "DELIVRER_EC_EXTRAIT_AVEC_FILIATION",
      "Délivrer E/C - Extrait avec filiation"
    );
  public static readonly DELIVRER_EC_EXTRAIT_SANS_FILIATION =
    new ChoixDelivrance(
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
  public static readonly REP_SANS_DEL_EC_REQUETE_INCOMPLETE =
    new ChoixDelivrance(
      "REP_SANS_DEL_EC_REQUETE_INCOMPLETE",
      "Réponse sans délivrance E/C - Requête incomplète"
    );
  public static readonly REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC =
    new ChoixDelivrance(
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

  public static estReponseAvecDelivrance(choix?: ChoixDelivrance) {
    return !ChoixDelivrance.estReponseSansDelivrance(choix);
  }

  public static estReponseSansDelivrance(choix?: ChoixDelivrance) {
    return (
      choix === ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC ||
      choix === ChoixDelivrance.REP_SANS_DEL_EC_DIVERS ||
      choix === ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE
    );
  }

  public static estCopieIntegraleOuArchive(choix: ChoixDelivrance) {
    return (
      ChoixDelivrance.estCopieIntegrale(choix) ||
      ChoixDelivrance.estCopieArchive(choix)
    );
  }

  public static estCopieArchive(choix?: ChoixDelivrance) {
    return choix === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
  }

  public static estCopieIntegrale(choix?: ChoixDelivrance) {
    return choix === ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
  }

  public static estAvecFiliation(choix: ChoixDelivrance) {
    return choix === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
  }
  public static estSansFiliation(choix: ChoixDelivrance) {
    return choix === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  }

  public static estAvecOuSansFiliation(choix?: ChoixDelivrance) {
    return (
      choix === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION ||
      choix === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    );
  }
  public static estPlurilingue(choix?: ChoixDelivrance) {
    return choix === ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE;
  }

  public static estExtrait(choix?: ChoixDelivrance) {
    return (
      ChoixDelivrance.estAvecOuSansFiliation(choix) ||
      ChoixDelivrance.estPlurilingue(choix)
    );
  }

  public static estExtraitOuCopieIntegrale(choix?: ChoixDelivrance) {
    return (
      ChoixDelivrance.estCopieIntegrale(choix) ||
      ChoixDelivrance.estExtrait(choix)
    );
  }

  public static getCodeDocumentDelivranceFromChoixDelivrance(
    choixDelivrance?: ChoixDelivrance
  ) {
    switch (choixDelivrance) {
      case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
        return CODE_COPIE_INTEGRALE;
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
        return CODE_EXTRAIT_AVEC_FILIATION;
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
        return CODE_EXTRAIT_PLURILINGUE;
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
        return CODE_EXTRAIT_SANS_FILIATION;
      case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
        return CODE_COPIE_NON_SIGNEE;
      default:
        return "";
    }
  }

  public static choixDelivranceCoherentAvecCode(
    choixDelivrance: ChoixDelivrance,
    code: string
  ) {
    return (
      code ===
      ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(
        choixDelivrance
      )
    );
  }
}
