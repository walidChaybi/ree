/* istanbul ignore file */

import { Options } from "../../../views/common/util/Type";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { peupleNatureRc } from "../../../api/nomenclature/NomenclatureEtatcivil";

export class NatureRc extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureRc) {
    (NatureRc as any)[key] = obj;
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureRc);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRc);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleNatureRc();
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRc);
  }
}
