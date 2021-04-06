/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class Nationalite extends EnumWithLibelle {
  public static readonly FRANCAISE = new Nationalite("Française");
  public static readonly ETRANGERE = new Nationalite("Etrangère");
  public static readonly INCONNU = new Nationalite("Non renseignée");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Nationalite);
  }
  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Nationalite, false, false);
  }
}
