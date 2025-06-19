import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class TypeLienRequerantCreation extends EnumWithLibelle {
  public static readonly PERE_MERE = new TypeLienRequerantCreation("Père ou mère");
  public static readonly REPRESENTANT_LEGAL = new TypeLienRequerantCreation("Représentant(e) légal(e)");
  public static readonly TITULAIRE_ACTE_MINEUR_EMANCIPE = new TypeLienRequerantCreation("Mineur(e) émancipé(e)");

  public static getKey(typeLienRequerantCreation?: TypeLienRequerantCreation): string {
    return EnumWithLibelle.getKey(TypeLienRequerantCreation, typeLienRequerantCreation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeLienRequerantCreation, false, false);
  }
}
