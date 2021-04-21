/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";
import { valeurOuUndefined } from "../../../../views/common/util/Utils";

export class TypeRequerantPacs extends EnumWithLibelle {
  public static readonly PARTENAIRE1 = new TypeRequerantPacs("Partenaire 1");
  public static readonly PARTENAIRE2 = new TypeRequerantPacs("Partenaire 2");
  public static readonly MANDATAIRE = new TypeRequerantPacs("Mandataire");
  public static readonly INSTITUTIONNEL = new TypeRequerantPacs(
    "Institutionnel"
  );
  public static readonly PARTICULIER = new TypeRequerantPacs(
    "Particulier (autre que partenaire 1 ou 2)"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, valeurOuUndefined);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeRequerantPacs,
      false,
      false
    );
  }
}
