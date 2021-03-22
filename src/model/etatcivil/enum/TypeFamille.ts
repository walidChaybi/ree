/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class TypeFamille extends EnumWithLibelle {
  public static readonly ACQ = new TypeFamille("ACQ");
  public static readonly AR2 = new TypeFamille("AR2");
  public static readonly AR3 = new TypeFamille("AR3");
  public static readonly COL = new TypeFamille("COL");
  public static readonly CSL = new TypeFamille("ACCSLQ");
  public static readonly DEP = new TypeFamille("DEP");
  public static readonly JUG = new TypeFamille("JUG");
  public static readonly MAR = new TypeFamille("MAR");
  public static readonly OP2_AFRIQUE_INDOCHINE = new TypeFamille(
    "OP2_AFRIQUE_INDOCHINE"
  );
  public static readonly OP2_ALGERIE = new TypeFamille("OP2_ALGERIE");
  public static readonly PAC = new TypeFamille("PAC");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeFamille);
  }
}
