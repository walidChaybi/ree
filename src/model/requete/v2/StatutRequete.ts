/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class StatutRequete extends EnumWithLibelle {
  public static readonly BROUILLON = new StatutRequete("Brouillon");
  public static readonly DOUBLON = new StatutRequete("Doublon");
  public static readonly REJET = new StatutRequete("Rejet");
  public static readonly A_TRAITER = new StatutRequete("A traiter");
  public static readonly PRISE_EN_CHARGE = new StatutRequete("Prise en charge");
  public static readonly TRANSFEREE = new StatutRequete("Transférée");
  public static readonly A_VALIDER = new StatutRequete("A valider");
  public static readonly A_SIGNER = new StatutRequete("A signer");
  public static readonly IGNOREE = new StatutRequete("Ignorer");
  public static readonly TRAITEE_A_IMPRIMER = new StatutRequete(
    "Traitée - A imprimer"
  );
  public static readonly TRAITEE_A_DELIVRER_DEMAT = new StatutRequete(
    "Traitée - A délivrer Démat"
  );
  public static readonly TRAITEE_IMPRIMEE = new StatutRequete(
    "Traitée - Imprimée"
  );
  public static readonly TRAITEE_DELIVRER_DEMAT = new StatutRequete(
    "Traitée - Délivrer Démat"
  );
  public static readonly TRAITEE_REPONDUE = new StatutRequete(
    "Traitée - Répondue"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(StatutRequete);
  }
}
