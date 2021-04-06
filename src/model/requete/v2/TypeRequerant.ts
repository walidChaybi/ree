/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";
import { valeurOuUndefined } from "../../../views/common/util/Utils";

export class TypeRequerant extends EnumWithLibelle {
  public static readonly INTERESSE = new TypeRequerant("Intéressé");
  public static readonly MANDATAIRE = new TypeRequerant("Mandataire");
  public static readonly INSTITUTIONNEL = new TypeRequerant("Institutionnel");
  public static readonly PARTICULIER = new TypeRequerant(
    "Particulier (autre que intéressé)"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, valeurOuUndefined);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRequerant, false, false);
  }
}
