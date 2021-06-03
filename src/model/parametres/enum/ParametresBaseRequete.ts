import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class ParametreBaseRequete extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: ParametreBaseRequete) {
    EnumWithLibelle.addEnum(key, obj, ParametreBaseRequete);
  }

  public static clean() {
    EnumWithLibelle.clean(ParametreBaseRequete);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(ParametreBaseRequete);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ParametreBaseRequete);
  }
}
