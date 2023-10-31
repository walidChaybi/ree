import { EnumWithLibelle } from "./../../../views/common/util/enum/EnumWithLibelle";

export class UnionActuelle extends EnumWithLibelle {
  public static readonly OUI = new UnionActuelle("Oui");
  public static readonly NON = new UnionActuelle("Non");
  public static readonly NON_RENSEIGNE = new UnionActuelle("Non renseigné");

  public static getEnumFor(str?: string) {
    return EnumWithLibelle.getEnumFor(str, UnionActuelle);
  }
}
