import { peupleNatureMention } from "../../../api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureMention extends EnumWithLibelle {
  constructor(
    private readonly _code: string,
    private readonly _estActif: string,
    private readonly _opposableAuTiers: boolean,
    libelle: string
  ) {
    super(libelle);
  }

  get code() {
    return this._code;
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

  public static estOpposableAuTiers(natureMention: NatureMention) {
    return natureMention.opposableAuTiers;
  }
}
