/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeRequerant extends EnumWithLibelle {
  public static readonly INTERESSE = new TypeRequerant("Intéressé");
  public static readonly PARTICULIER = new TypeRequerant(
    "Particulier (autre que intéressé)"
  );
  public static readonly MANDATAIRE = new TypeRequerant("Mandataire");
  public static readonly INSTITUTIONNEL = new TypeRequerant("Institutionnel");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequerant);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRequerant, false, false);
  }
}
