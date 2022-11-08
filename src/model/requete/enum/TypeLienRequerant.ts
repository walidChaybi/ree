/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option, Options } from "@util/Type";

export const TYPE_LIEN_REQUERANT_POUR_TITULAIRE = ["TITULAIRE"];

export class TypeLienRequerant extends EnumWithLibelle {
  public static readonly TITULAIRE = new TypeLienRequerant("Titulaire");
  public static readonly PERE_MERE = new TypeLienRequerant("Père/mère");
  public static readonly ENFANT = new TypeLienRequerant("Enfant");
  public static readonly EPOUX_EPOUSE = new TypeLienRequerant(
    "Conjoint(e) ou partenaire de PACS"
  );
  public static readonly GRAND_PARENT = new TypeLienRequerant("Grand-parent");
  public static readonly PETIT_ENFANT = new TypeLienRequerant("Petit-enfant");
  public static readonly AUTRE = new TypeLienRequerant("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienRequerant);
  }

  public static getKey(typeLienRequerant: TypeLienRequerant): string {
    return EnumWithLibelle.getKey(TypeLienRequerant, typeLienRequerant);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeLienRequerant);
  }

  public static getListEnumsAsOptions(keys: string[]): Options {
    return this.getAllEnumsAsOptions().filter((el: Option) => {
      return keys.includes(el.value) ? el : undefined;
    });
  }

  public static estAutre(typeLien?: TypeLienRequerant): boolean {
    return typeLien === TypeLienRequerant.AUTRE;
  }
}
