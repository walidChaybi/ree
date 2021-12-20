import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class ExistenceContratMariage extends EnumWithLibelle {
  public static readonly OUI = new ExistenceContratMariage("OUI");
  public static readonly NON = new ExistenceContratMariage("NON");
  public static readonly NON_CONNU = new ExistenceContratMariage("NON_CONNU");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ExistenceContratMariage);
  }
}
