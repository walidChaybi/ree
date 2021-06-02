/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Option, Options } from "../../../../views/common/util/Type";

export const UN_TITULAIRE = [
  "TITULAIRE1",
  "MANDATAIRE",
  "INSTITUTIONNEL",
  "PARTICULIER",
  "AUTRE_PROFESSIONNEL"
];

export class TypeRequerantRDC extends EnumWithLibelle {
  public static readonly TITULAIRE1 = new TypeRequerantRDC("Titulaire 1");
  public static readonly TITULAIRE2 = new TypeRequerantRDC("Titulaire 2");
  public static readonly MANDATAIRE = new TypeRequerantRDC("Mandataire");
  public static readonly INSTITUTIONNEL = new TypeRequerantRDC(
    "Institutionnel"
  );
  public static readonly PARTICULIER = new TypeRequerantRDC(
    "Particulier (autre que titulaire)"
  );
  public static readonly AUTRE_PROFESSIONNEL = new TypeRequerantRDC(
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
      return keys.includes(el.value) ? el : undefined;
    });
  }
}
