import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class EtrangerFrance extends EnumWithLibelle {
  public static readonly ETRANGER = new EtrangerFrance("Etranger");
  public static readonly FRANCE = new EtrangerFrance("France");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, EtrangerFrance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      EtrangerFrance,
      false,
      false
    );
  }

  public static getKey(obj: EtrangerFrance) {
    return EnumWithLibelle.getKey(EtrangerFrance, obj);
  }
}
