/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class TypePieceJustificative extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(clazz: any, key: string, obj: TypePieceJustificative) {
    clazz[key] = obj;
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypePieceJustificative);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypePieceJustificative);
  }
}
