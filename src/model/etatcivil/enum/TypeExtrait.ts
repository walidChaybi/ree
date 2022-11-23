/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

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
