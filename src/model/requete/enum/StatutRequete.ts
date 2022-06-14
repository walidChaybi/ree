/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class StatutRequete extends EnumWithComplete {
  public static readonly BROUILLON = new StatutRequete(
    "BROUILLON",
    "Brouillon"
  );
  public static readonly DOUBLON = new StatutRequete("DOUBLON", "Doublon");
  public static readonly REJET = new StatutRequete("REJET", "Rejet");
  public static readonly A_TRAITER = new StatutRequete(
    "A_TRAITER",
    "À traiter"
  );
  public static readonly PRISE_EN_CHARGE = new StatutRequete(
    "PRISE_EN_CHARGE",
    "Prise en charge"
  );
  public static readonly TRANSFEREE = new StatutRequete(
    "TRANSFEREE",
    "Transférée"
  );
  public static readonly A_VALIDER = new StatutRequete(
    "A_VALIDER",
    "À valider"
  );
  public static readonly A_SIGNER = new StatutRequete("A_SIGNER", "À signer");
  public static readonly IGNOREE = new StatutRequete("IGNOREE", "Ignorée");
  public static readonly TRAITE_A_IMPRIMER = new StatutRequete(
    "TRAITE_A_IMPRIMER",
    "Traitée - A imprimer"
  );
  public static readonly TRAITE_A_DELIVRER_DEMAT = new StatutRequete(
    "TRAITE_A_DELIVRER_DEMAT",
    "Traitée - A délivrer Démat"
  );
  public static readonly TRAITE_IMPRIME = new StatutRequete(
    "TRAITE_IMPRIME",
    "Traitée - Imprimée"
  );
  public static readonly TRAITE_DELIVRE_DEMAT = new StatutRequete(
    "TRAITE_DELIVRE_DEMAT",
    "Traitée - Délivrée Démat"
  );
  public static readonly TRAITE_REPONDU = new StatutRequete(
    "TRAITE_REPONDU",
    "Traitée - Répondue"
  );
  public static readonly REJET_IMPRESSION = new StatutRequete(
    "REJET_IMPRESSION",
    "Traité - Rejet impression"
  );
  // Statut création
  public static readonly PROJET_VALIDE = new StatutRequete(
    "PROJET_VALIDE",
    "Projet validé"
  );
  public static readonly RETOUR_SDANF = new StatutRequete(
    "RETOUR_SDANF",
    "Retour SDANF"
  );
  public static readonly EN_ATTENTE = new StatutRequete(
    "EN_ATTENTE",
    "En attente"
  );
  public static readonly EN_ATTENTE_JURIDIQUE = new StatutRequete(
    "EN_ATTENTE_JURIDIQUE",
    "En attente - Juridique"
  );
  public static readonly EN_ATTENTE_POSTULANT = new StatutRequete(
    "EN_ATTENTE_POSTULANT",
    "En attente - Postulant"
  );
  public static readonly ALERTE_SDANF = new StatutRequete(
    "ALERTE_SDANF",
    "Alerte SDANF"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(StatutRequete);
  }

  public static getKey(obj: StatutRequete) {
    return EnumWithLibelle.getKey(StatutRequete, obj);
  }

  public static getEnumFromLibelle(libelle: string) {
    return EnumWithLibelle.getEnumFromLibelle(StatutRequete, libelle);
  }
}
