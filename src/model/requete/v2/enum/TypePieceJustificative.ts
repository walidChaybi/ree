/* istanbul ignore file */
import { peupleTypePieceJustificative } from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class TypePieceJustificative extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: TypePieceJustificative) {
    EnumWithLibelle.addEnum(key, obj, TypePieceJustificative);
  }

  public static clean() {
    EnumWithLibelle.clean(TypePieceJustificative);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(TypePieceJustificative);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypePieceJustificative);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleTypePieceJustificative();
    return EnumWithLibelle.getAllLibellesAsOptions(TypePieceJustificative);
  }
}
