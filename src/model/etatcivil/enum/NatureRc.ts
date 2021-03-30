/* istanbul ignore file */

import {Options} from "../../../views/common/util/Type";
import {EnumWithLibelle} from "../../../views/common/util/enum/EnumWithLibelle";

export class NatureRc extends EnumWithLibelle {

  //AddEnum specifique aux nomenclatures !
  public static addEnum(clazz: any, key: string, obj: NatureRc) {
    clazz[key] = obj;
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRc);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRc);
  }
}
