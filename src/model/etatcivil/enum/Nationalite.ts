/* istanbul ignore file */

import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class Nationalite extends EnumWithComplete {
  public static readonly FRANCAISE = new Nationalite("FRANCAISE", "Française");
  public static readonly ETRANGERE = new Nationalite("ETRANGERE", "Étrangère");
  public static readonly INCONNUE = new Nationalite(
    "INCONNUE",
    "Non renseignée"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Nationalite);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Nationalite, false, false);
  }

  public static getKey(obj: Nationalite) {
    return EnumWithLibelle.getKey(Nationalite, obj);
  }
}
