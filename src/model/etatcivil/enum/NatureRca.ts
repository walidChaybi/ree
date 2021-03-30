/* istanbul ignore file */

import {EnumWithLibelle} from "../../../views/common/util/enum/EnumWithLibelle";
import {Options} from "../../../views/common/util/Type";


export class NatureRca extends EnumWithLibelle {

  //AddEnum specifique aux nomenclatures !
  public static addEnum(clazz: any, key: string, obj: NatureRca) {
    clazz[key] = obj;
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRca);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRca);
  }
}
