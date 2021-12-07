/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeRequete extends EnumWithComplete {
  public static readonly DELIVRANCE = new TypeRequete(
    "DELIVRANCE",
    "Délivrance"
  );
  public static readonly CREATION = new TypeRequete("CREATION", "Création");
  public static readonly MISE_A_JOUR = new TypeRequete(
    "MISE_A_JOUR",
    "Mise à jour"
  );
  public static readonly INFORMATION = new TypeRequete(
    "INFORMATION",
    "Information"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRequete);
  }

  public static getKey(obj: TypeRequete) {
    return EnumWithLibelle.getKey(TypeRequete, obj);
  }
}
