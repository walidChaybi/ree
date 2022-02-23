import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class TypeDeclarationConjointe extends EnumWithLibelle {
  public static readonly INDETERMINE = new TypeDeclarationConjointe(
    "indéterminée"
  );
  public static readonly CHANGEMENT_NOM = new TypeDeclarationConjointe(
    "de changement de nom"
  );
  public static readonly CHOIX_NOM = new TypeDeclarationConjointe(
    "de choix de nom"
  );
  public static readonly ADJONCTION_NOM = new TypeDeclarationConjointe(
    "d'adjonction de nom"
  );
  public static readonly ABSENCE_DECLARATION = new TypeDeclarationConjointe(
    "abscence déclaration conjointe"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeDeclarationConjointe);
  }
}
