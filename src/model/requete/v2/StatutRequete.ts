/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class StatutRequete extends EnumWithLibelle {
  public static readonly DOUBLON = new StatutRequete("Doublon");
  public static readonly A_TRAITER = new StatutRequete("A traiter");
  public static readonly A_SIGNER = new StatutRequete("A signer");
  public static readonly A_RETRAITER = new StatutRequete("A retraiter");
  public static readonly A_TRAITER_DEMAT = new StatutRequete("A traiter démat");
  public static readonly TRAITER_DEMAT = new StatutRequete("Traiter démat");
  public static readonly A_IMPRIMER = new StatutRequete("A imprimer");
  public static readonly IMPRIMER = new StatutRequete("Imprimer");
  public static readonly REJET_IMPRESSION = new StatutRequete("Rejet Imprimer");
  public static readonly PRISE_EN_CHARGE = new StatutRequete("Prise en charge");
  public static readonly TRANSFEREE = new StatutRequete("Transférée");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(StatutRequete);
  }
}
