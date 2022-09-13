/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";


type getAllEnumsAsOptionsProps = {
  exclusions?: TypeRequerant[];
};
export class TypeRequerant extends EnumWithLibelle {
  public static readonly TITULAIRE1 = new TypeRequerant("Titulaire 1");
  public static readonly TITULAIRE2 = new TypeRequerant("Titulaire 2");
  public static readonly PARTICULIER = new TypeRequerant(
    "Particulier (autre que titulaire)"
  );
  public static readonly MANDATAIRE = new TypeRequerant("Mandataire");
  public static readonly INSTITUTIONNEL = new TypeRequerant("Institutionnel");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequerant);
  }

  public static getAllEnumsAsOptions({
    exclusions
  }: getAllEnumsAsOptionsProps = {}): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeRequerant,
      false,
      false,
      false,
      exclusions ? exclusions : undefined
    );
  }
}
