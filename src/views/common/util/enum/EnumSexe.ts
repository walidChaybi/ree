/* istanbul ignore file */

import { EnumWithLibelle } from "./EnumWithLibelle";

export class EnumTypeSexe extends EnumWithLibelle {
  public static readonly FEMININ = new EnumTypeSexe("Féminin");
  public static readonly MASCULIN = new EnumTypeSexe("Masculin");
  public static readonly INDETERMINE = new EnumTypeSexe("Indéterminé");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, EnumTypeSexe);
  }
}
