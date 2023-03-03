/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option, Options } from "@util/Type";

export const TYPE_LIEN_REQUERANT_POUR_TITULAIRE = ["TITULAIRE"];

export class TypeLienRequerantCreation extends EnumWithLibelle {
  public static readonly TITULAIRE_ACTE = new TypeLienRequerantCreation(
    "Titulaire de l'acte"
  );
  public static readonly TITULAIRE_ACTE_MINEUR_EMANCIPE =
    new TypeLienRequerantCreation("Titulaire de l'acte mineur(e) émancipé(e)");
  public static readonly PERE_MERE = new TypeLienRequerantCreation(
    "Sa mère ou son père"
  );
  public static readonly EPOUX_EPOUSE = new TypeLienRequerantCreation(
    "Son épouse ou son époux"
  );
  public static readonly FILLE_FILS = new TypeLienRequerantCreation(
    "Sa fille ou son fils"
  );
  public static readonly REPRESENTANT_LEGAL = new TypeLienRequerantCreation(
    "Son ou sa représentante légale"
  );
  public static readonly AUTRE = new TypeLienRequerantCreation("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienRequerantCreation);
  }

  public static getKey(
    typeLienRequerantCreation?: TypeLienRequerantCreation
  ): string {
    return EnumWithLibelle.getKey(
      TypeLienRequerantCreation,
      typeLienRequerantCreation
    );
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeLienRequerantCreation);
  }

  public static getListEnumsAsOptions(keys: string[]): Options {
    return this.getAllEnumsAsOptions().filter((el: Option) => {
      return keys.includes(el.value) ? el : undefined;
    });
  }

  public static estTitulaireActe(
    typeLienRequerant: TypeLienRequerantCreation
  ): boolean {
    return typeLienRequerant === TypeLienRequerantCreation.TITULAIRE_ACTE;
  }

  public static estTitulaireActeMineureEmancipe(
    typeLienRequerant: TypeLienRequerantCreation
  ): boolean {
    return (
      typeLienRequerant ===
      TypeLienRequerantCreation.TITULAIRE_ACTE_MINEUR_EMANCIPE
    );
  }

  public static estTitulaireActeOuTitulaireActeMineureEmancipe(
    typeLienRequerant: TypeLienRequerantCreation
  ) {
    return (
      TypeLienRequerantCreation.estTitulaireActe(typeLienRequerant) ||
      TypeLienRequerantCreation.estTitulaireActeMineureEmancipe(
        typeLienRequerant
      )
    );
  }
}
