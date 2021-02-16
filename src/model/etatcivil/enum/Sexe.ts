/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class Sexe extends EnumWithLibelle {
  public static readonly FEMININ = new Sexe("Féminin");
  public static readonly MASCULIN = new Sexe("Masculin");
  public static readonly INDETERMINE = new Sexe("Indéterminé");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Sexe);
  }
}
