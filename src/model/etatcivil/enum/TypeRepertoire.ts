/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeRepertoire extends EnumWithLibelle {
  public static readonly PACS = new TypeRepertoire("PACS");
  public static readonly RC = new TypeRepertoire("RC");
  public static readonly RCA = new TypeRepertoire("RCA");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRepertoire);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRepertoire);
  }
}
