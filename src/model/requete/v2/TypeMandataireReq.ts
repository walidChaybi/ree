/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeMandataireReq extends EnumWithLibelle {
  public static readonly AVOCAT = new TypeMandataireReq("Avocat");
  public static readonly TUTEUR = new TypeMandataireReq("Tuteur");
  public static readonly GENEALOGISTE = new TypeMandataireReq("Généalogiste");
  public static readonly NOTAIRE = new TypeMandataireReq("Notaire");
  public static readonly AUTRE = new TypeMandataireReq("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeMandataireReq);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeMandataireReq);
  }
}
