import { Options } from "@util/Type";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeDeclarant extends EnumWithLibelle {
  public static readonly PERE_ET_MERE = new TypeDeclarant("Père/Mère");
  public static readonly MERE = new TypeDeclarant("Mère");
  public static readonly PERE = new TypeDeclarant("Père");
  public static readonly ABSCENCE_DE_VALEUR = new TypeDeclarant("");
  public static readonly AUTRE = new TypeDeclarant("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeDeclarant);
  }

  public static getKey(typeDeclarant?: TypeDeclarant): string {
    return EnumWithLibelle.getKey(TypeDeclarant, typeDeclarant);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeDeclarant,
      false,
      false,
      false,
      [TypeDeclarant.ABSCENCE_DE_VALEUR]
    );
  }

  public static getEnumsSansAutreAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeDeclarant,
      false,
      false,
      true,
      [TypeDeclarant.AUTRE, TypeDeclarant.ABSCENCE_DE_VALEUR]
    );
  }

  public static estAutre(valeurDeclarant: string): boolean {
    return TypeDeclarant.getEnumFor(valeurDeclarant) === TypeDeclarant.AUTRE;
  }
}
