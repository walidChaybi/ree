/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class TypeLienRequerant extends EnumWithLibelle {
  public static readonly TITULAIRE = new TypeLienRequerant("Titulaire");
  public static readonly PERE_MERE = new TypeLienRequerant("Père/mère");
  public static readonly ENFANT = new TypeLienRequerant("Enfant");
  public static readonly EPOUX_EPOUSE = new TypeLienRequerant("Epoux/Epouse");
  public static readonly GRAND_PARENT = new TypeLienRequerant("Grand-parent");
  public static readonly PETIT_ENFANT = new TypeLienRequerant("Petit-enfant");
  public static readonly AUTRE = new TypeLienRequerant("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeLienRequerant);
  }
}
