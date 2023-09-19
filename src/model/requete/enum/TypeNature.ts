import { Options } from "@util/Type";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeNature extends EnumWithLibelle {
  public static readonly NATURALISATION = new TypeNature("Naturalisation");
  public static readonly REINTEGRATION = new TypeNature("Réintégration");

  public static getEnumFor(str: string): TypeNature | undefined {
    return EnumWithLibelle.getEnumFor(str, TypeNature);
  }

  public static getKey(typeNature?: TypeNature): string {
    return EnumWithLibelle.getKey(TypeNature, typeNature);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeNature);
  }
}
