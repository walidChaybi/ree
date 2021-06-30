/* istanbul ignore file */

import { peupleNatureRca } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureRca extends EnumWithLibelle {
  public static async init() {
    await peupleNatureRca();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureRca) {
    EnumWithLibelle.addEnum(key, obj, NatureRca);
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureRca);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(NatureRca);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureRca);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await NatureRca.init();
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRca);
  }
}
