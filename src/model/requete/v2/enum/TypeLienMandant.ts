/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class TypeLienMandant extends EnumWithLibelle {
  public static readonly TITULAIRE = new TypeLienMandant("Titulaire");
  public static readonly PERE_MERE_TITULAIRE = new TypeLienMandant(
    "Père ou mère du titulaire"
  );
  public static readonly ENFANT_TITULAIRE = new TypeLienMandant(
    "Enfant du titulaire"
  );
  public static readonly CONJOINT_OU_PARTENAIRE_PACS = new TypeLienMandant(
    "Conjoint ou partenaire de PACS"
  );
  public static readonly AUTRE = new TypeLienMandant("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienMandant);
  }
}
