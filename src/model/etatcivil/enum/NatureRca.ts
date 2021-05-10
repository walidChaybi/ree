/* istanbul ignore file */

import { peupleNatureRca } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureRca extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureRca) {
    (NatureRca as any)[key] = obj;
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureRca);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRca);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleNatureRca();
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRca);
  }
}
