/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class TypeMandant extends EnumWithLibelle {
  public static readonly PERSONNE_PHYSIQUE = new TypeMandant(
    "Personne physique"
  );
  public static readonly PERSONNE_MORALE = new TypeMandant("Personne morale");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeMandant);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeMandant, false, false);
  }
}
