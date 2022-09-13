import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option } from "@util/Type";
import { premiereLettreEnMajuscule } from "@util/Utils";

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
    "aucune"
  );
  public static readonly ABSENCE_DECLARATION_VALIDEE =
    new TypeDeclarationConjointe("aucune");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeDeclarationConjointe);
  }

  public static getKey(
    typeDeclarationConjointe: TypeDeclarationConjointe
  ): string {
    return EnumWithLibelle.getKey(
      TypeDeclarationConjointe,
      typeDeclarationConjointe
    );
  }

  public static getAllEnumsAsOptions(
    type?: TypeDeclarationConjointe
  ): Option[] {
    let options;
    if (type === TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE) {
      options = [
        {
          value: TypeDeclarationConjointe.getKey(
            TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE
          ),
          str: premiereLettreEnMajuscule(
            TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE.libelle
          )
        }
      ];
    } else if (type === TypeDeclarationConjointe.ABSENCE_DECLARATION) {
      options = EnumWithLibelle.getAllLibellesAsOptions(
        TypeDeclarationConjointe,
        false,
        false,
        false,
        [TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE]
      );
    } else if (type) {
      options = EnumWithLibelle.getAllLibellesAsOptions(
        TypeDeclarationConjointe,
        false,
        false,
        false,
        [
          TypeDeclarationConjointe.ABSENCE_DECLARATION,
          TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE
        ]
      );
    } else {
      options = EnumWithLibelle.getAllLibellesAsOptions(
        TypeDeclarationConjointe,
        false,
        false
      );
    }
    return options;
  }

  public static estAbsenceDeclaration(type: TypeDeclarationConjointe): boolean {
    return (
      type === TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE ||
      type === TypeDeclarationConjointe.ABSENCE_DECLARATION
    );
  }
}
