/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class TypeLienMandant extends EnumWithLibelle {
  public static readonly TITULAIRE = new TypeLienMandant("Titulaire");
  public static readonly PERE_MERE_TITULAIRE = new TypeLienMandant("Père/mère");
  public static readonly ENFANT_TITULAIRE = new TypeLienMandant("Enfant");
  public static readonly CONJOINT_OU_PARTENAIRE_PACS = new TypeLienMandant(
    "Conjoint(e) ou partenaire de PACS"
  );
  public static readonly AUTRE = new TypeLienMandant("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienMandant);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeLienMandant,
      false,
      false
    );
  }
}
