/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option, Options } from "@util/Type";
import { EnumWithComplete } from "./../../../views/common/util/enum/EnumWithComplete";

export const UN_TITULAIRE = [
  "TITULAIRE1",
  "MANDATAIRE",
  "INSTITUTIONNEL",
  "PARTICULIER",
  "AUTRE_PROFESSIONNEL"
];

export class TypeRequerantRDC extends EnumWithComplete {
  public static readonly TITULAIRE1 = new TypeRequerantRDC(
    "TITULAIRE1",
    "Titulaire 1"
  );
  public static readonly TITULAIRE2 = new TypeRequerantRDC(
    "TITULAIRE2",
    "Titulaire 2"
  );
  public static readonly PARTICULIER = new TypeRequerantRDC(
    "PARTICULIER",
    "Particulier (autre que titulaire)"
  );
  public static readonly MANDATAIRE = new TypeRequerantRDC(
    "MANDATAIRE",
    "Mandataire"
  );
  public static readonly INSTITUTIONNEL = new TypeRequerantRDC(
    "INSTITUTIONNEL",
    "Institutionnel"
  );
  public static readonly AUTRE_PROFESSIONNEL = new TypeRequerantRDC(
    "AUTRE_PROFESSIONNEL",
    "Autre professionnel"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequerantRDC);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeRequerantRDC,
      false,
      false
    );
  }

  public static getListEnumsAsOptions(keys: string[]): Options {
    return this.getAllEnumsAsOptions().filter((el: Option) => {
      return keys.includes(el.cle) ? el : undefined;
    });
  }
}
