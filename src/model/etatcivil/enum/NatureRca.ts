/* istanbul ignore file */

import { peupleNatureRca } from "@api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class NatureRca extends EnumWithLibelle {
  constructor(
    private readonly _article: string,
    private readonly _type: string,
    libelle: string
  ) {
    super(libelle);
  }

  get article() {
    return this._article;
  }

  get type() {
    return this._type;
  }

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

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureRca);
  }
}
