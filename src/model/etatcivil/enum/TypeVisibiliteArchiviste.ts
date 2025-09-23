import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export enum ETypeVisibiliteArchiviste {
  NON = "NON",
  MEAE = "MEAE",
  ANOM = "ANOM"
}

export class TypeVisibiliteArchiviste extends EnumWithLibelle {
  public static readonly NON = new TypeVisibiliteArchiviste("NON");
  public static readonly MEAE = new TypeVisibiliteArchiviste("MEAE");
  public static readonly ANOM = new TypeVisibiliteArchiviste("ANOM");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeVisibiliteArchiviste);
  }

  public static getKey(obj: TypeVisibiliteArchiviste) {
    return EnumWithLibelle.getKey(TypeVisibiliteArchiviste, obj);
  }
}
