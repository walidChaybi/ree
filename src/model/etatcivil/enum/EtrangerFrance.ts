import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class EtrangerFrance extends EnumWithLibelle {
  public static readonly ETRANGER = new EtrangerFrance("Etranger");
  public static readonly FRANCE = new EtrangerFrance("France");
  public static readonly INCONNU = new EtrangerFrance("Inconnu");

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

  public static getEnumFromPays(pays?: string) {
    if (pays?.toUpperCase() === "FRANCE") {
      return EtrangerFrance.FRANCE;
    } else if (!pays) {
      return EtrangerFrance.INCONNU;
    } else {
      return EtrangerFrance.ETRANGER;
    }
  }
}
