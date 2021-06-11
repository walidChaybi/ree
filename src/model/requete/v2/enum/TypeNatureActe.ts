/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class TypeNatureActe extends EnumWithLibelle {
  public static readonly NAISSANCE = new TypeNatureActe("Naissance");
  public static readonly MARIAGE = new TypeNatureActe("Mariage");
  public static readonly DECES = new TypeNatureActe("Décès");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeNatureActe);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeNatureActe);
  }
}
