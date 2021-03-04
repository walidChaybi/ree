/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeRequete extends EnumWithLibelle {
  public static readonly DELIVRANCE = new TypeRequete("Délivrance");
  public static readonly CREATION_ACTE = new TypeRequete("Création acte");
  public static readonly MISE_A_JOUR = new TypeRequete("Mise à jour");
  public static readonly INFORMATION = new TypeRequete("Information");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRequete);
  }
}
