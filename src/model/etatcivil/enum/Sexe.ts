/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class Sexe extends EnumWithLibelle {
  public static readonly MASCULIN = new Sexe("Masculin");
  public static readonly FEMININ = new Sexe("Féminin");
  public static readonly INDETERMINE = new Sexe("Indéterminé");
  public static readonly INCONNU = new Sexe("Non renseigné");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Sexe);
  }
  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Sexe, false, false);
  }
}
