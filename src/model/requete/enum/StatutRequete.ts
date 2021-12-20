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
