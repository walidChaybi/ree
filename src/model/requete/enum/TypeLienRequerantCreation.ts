/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option, Options } from "@util/Type";

export const TYPE_LIEN_REQUERANT_POUR_TITULAIRE = ["TITULAIRE"];

export class TypeLienRequerantCreation extends EnumWithLibelle {
  public static readonly PERE_MERE = new TypeLienRequerantCreation("Père ou mère");
  public static readonly REPRESENTANT_LEGAL = new TypeLienRequerantCreation("Représentant(e) légal(e)");
  public static readonly TITULAIRE_ACTE_MINEUR_EMANCIPE = new TypeLienRequerantCreation("Mineur(e) émancipé(e)");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienRequerantCreation);
  }

  public static getKey(typeLienRequerantCreation?: TypeLienRequerantCreation): string {
    return EnumWithLibelle.getKey(TypeLienRequerantCreation, typeLienRequerantCreation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeLienRequerantCreation);
  }

  public static getListEnumsAsOptions(keys: string[]): Options {
    return this.getAllEnumsAsOptions().filter((el: Option) => {
      return keys.includes(el.cle) ? el : undefined;
    });
  }

  public static estTitulaireActeMineureEmancipe(typeLienRequerant: TypeLienRequerantCreation): boolean {
    return typeLienRequerant === TypeLienRequerantCreation.TITULAIRE_ACTE_MINEUR_EMANCIPE;
  }

  public static estTitulaireActeOuTitulaireActeMineureEmancipe(typeLienRequerant: TypeLienRequerantCreation) {
    return TypeLienRequerantCreation.estTitulaireActeMineureEmancipe(typeLienRequerant);
  }
}
