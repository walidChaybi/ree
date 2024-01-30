import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeActe extends EnumWithLibelle {
  public static readonly IMAGE = new TypeActe("IMAGE");
  public static readonly TEXTE = new TypeActe("TEXTE");
  public static readonly INCONNU = new TypeActe("INCONNU");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeActe);
  }

  public static getKey(obj: TypeActe) {
    return EnumWithLibelle.getKey(TypeActe, obj);
  }

  public static estImage(obj?: TypeActe): boolean {
    return obj === TypeActe.IMAGE;
  }
}
