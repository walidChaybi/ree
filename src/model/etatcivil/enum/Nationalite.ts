import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class Nationalite extends EnumWithLibelle {
  public static readonly FRANCAISE = new Nationalite("Française");
  public static readonly ETRANGERE = new Nationalite("Etrangère");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Nationalite);
  }
}
