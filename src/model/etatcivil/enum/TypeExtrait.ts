/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class TypeExtrait extends EnumWithLibelle {
  public static readonly EXTRAIT_AVEC_FILIATION = new TypeExtrait(
    "EXTRAIT_AVEC_FILIATION"
  );
  public static readonly EXTRAIT_SANS_FILIATION = new TypeExtrait(
    "EXTRAIT_SANS_FILIATION"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeExtrait);
  }
}
