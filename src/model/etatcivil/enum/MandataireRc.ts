/* istanbul ignore file */

import { peupleMandataireRc } from "@api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class MandataireRc extends EnumWithLibelle {
  public static async init() {
    await peupleMandataireRc();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: MandataireRc) {
    (MandataireRc as any)[key] = obj;
  }

  public static clean() {
    return EnumWithLibelle.clean(MandataireRc);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(MandataireRc);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, MandataireRc);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(MandataireRc);
  }
}
