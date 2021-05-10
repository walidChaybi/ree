/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";
import { peupleTypePieceJustificative } from "../../../../api/nomenclature/NomenclatureRequete";

export class TypePieceJustificative extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: TypePieceJustificative) {
    (TypePieceJustificative as any)[key] = obj;
  }

  public static clean() {
    EnumWithLibelle.clean(TypePieceJustificative);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypePieceJustificative);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleTypePieceJustificative();
    return EnumWithLibelle.getAllLibellesAsOptions(TypePieceJustificative);
  }
}
