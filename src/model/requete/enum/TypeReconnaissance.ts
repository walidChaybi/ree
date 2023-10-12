import { Options } from "@util/Type";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeReconnaissance extends EnumWithLibelle {
  public static readonly LE_PERE_ET_LA_MERE = new TypeReconnaissance(
    "Père/Mère"
  );
  public static readonly LA_MERE = new TypeReconnaissance("Mère");
  public static readonly LE_PERE = new TypeReconnaissance("Père");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeReconnaissance);
  }

  public static getKey(typeReconnaissance?: TypeReconnaissance): string {
    return EnumWithLibelle.getKey(TypeReconnaissance, typeReconnaissance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeReconnaissance,
      false,
      false,
      false
    );
  }
}
