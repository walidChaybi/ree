/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class TypeExtrait extends EnumWithComplete {
  public static readonly EXTRAIT_AVEC_FILIATION = new TypeExtrait(
    "EXTRAIT_AVEC_FILIATION",
    "Extrait avec filiation"
  );
  public static readonly EXTRAIT_SANS_FILIATION = new TypeExtrait(
    "EXTRAIT_SANS_FILIATION",
    "Extrait sans filiation"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeExtrait);
  }
}
