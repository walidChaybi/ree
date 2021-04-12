/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class TypeMandant extends EnumWithLibelle {
  public static readonly PERSONNE_PHYSIQUE = new TypeMandant(
    "Personne physique"
  );
  public static readonly PERSONNE_MORALE = new TypeMandant("Personne morale");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeMandant);
  }
}
