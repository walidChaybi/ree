/* istanbul ignore file */

import { peupleNatureRc } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureRc extends EnumWithLibelle {
  public static async init() {
    await peupleNatureRc();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureRc) {
    EnumWithLibelle.addEnum(key, obj, NatureRc);
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureRc);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(NatureRc);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRc);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRc);
  }
}
