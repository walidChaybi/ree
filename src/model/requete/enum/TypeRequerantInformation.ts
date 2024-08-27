/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

type getAllEnumsAsOptionsProps = {
  exclusions?: TypeRequerantInformation[];
};
export class TypeRequerantInformation extends EnumWithLibelle {
  public static readonly PARTICULIER = new TypeRequerantInformation(
    "Particulier"
  );
  public static readonly AUTRE_PROFESSIONNEL = new TypeRequerantInformation(
    "Autre professionnel"
  );
  public static readonly INSTITUTIONNEL = new TypeRequerantInformation(
    "Institutionnel"
  );
  public static readonly AVOCAT = new TypeRequerantInformation("Avocat");
  public static readonly TUTEUR = new TypeRequerantInformation("Tuteur");
  public static readonly GENEALOGISTE = new TypeRequerantInformation(
    "Généalogiste"
  );
  public static readonly NOTAIRE = new TypeRequerantInformation("Notaire");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequerantInformation);
  }

  public static getAllEnumsAsOptions({
    exclusions
  }: getAllEnumsAsOptionsProps = {}): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeRequerantInformation,
      false,
      false,
      false,
      exclusions ? exclusions : undefined
    );
  }
}
