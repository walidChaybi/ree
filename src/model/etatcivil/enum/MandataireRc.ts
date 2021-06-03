/* istanbul ignore file */

import { peupleMandataireRc } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class MandataireRc extends EnumWithLibelle {
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

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleMandataireRc();
    return EnumWithLibelle.getAllLibellesAsOptions(MandataireRc);
  }
}
