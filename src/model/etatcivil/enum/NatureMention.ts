/* istanbul ignore file */
import { peupleNatureMention } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumNomemclature } from "../../../views/common/util/enum/EnumNomenclature";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureMention extends EnumNomemclature {
  constructor(
    code: string,
    libelle: string,
    categorie: string,
    private readonly _estActif: boolean,
    private readonly _opposableAuTiers: boolean
  ) {
    super(code, libelle, categorie);
  }

  get estActif() {
    return this._estActif;
  }

  get opposableAuTiers() {
    return this._opposableAuTiers;
  }

  public static async init() {
    await peupleNatureMention();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureMention) {
    EnumWithLibelle.addEnum(key, obj, NatureMention);
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureMention);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(NatureMention);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureMention);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureMention);
  }

  public static getEnumsAsOptions(natureMention: NatureMention[]) {
    const options: Options = [];
    natureMention.forEach(nature => {
      options.push({
        value: NatureMention.getUuidFromNature(nature),
        str: nature.libelle
      });
    });
    return options;
  }

  public static getKey(nature?: NatureMention) {
    if (nature) {
      return EnumWithLibelle.getKey(NatureMention, nature);
    } else {
      return "";
    }
  }

  public static getEnumOrEmpty(nature?: NatureMention) {
    if (nature) {
      return nature;
    } else {
      return NatureMention.getEnumFor("");
    }
  }

  public static estOpposableAuTiers(natureMention: NatureMention) {
    return natureMention.opposableAuTiers;
  }

  public static getUuidFromNature(nature?: NatureMention): string {
    let uuid = "";
    if (nature) {
      uuid = EnumNomemclature.getKeyForCode(NatureMention, nature.code);
    }
    return uuid ? uuid : "";
  }
}
