/* istanbul ignore file */

import { peupleNatureRc } from "@api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class NatureRc extends EnumWithLibelle {
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
