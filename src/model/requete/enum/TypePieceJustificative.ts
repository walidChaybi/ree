/* istanbul ignore file */
import { peupleTypePieceJustificative } from "@api/nomenclature/NomenclatureRequete";
import { EnumNomemclature } from "@util/enum/EnumNomenclature";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class TypePieceJustificative extends EnumNomemclature {
  public static async init() {
    return peupleTypePieceJustificative();
  }

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

  public static getEnumFor(uuid: string) {
    return EnumWithLibelle.getEnumFor(uuid, TypePieceJustificative);
  }

  public static getKeyForLibelle(nom: string) {
    return EnumWithComplete.getKeyForLibelle(TypePieceJustificative, nom);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypePieceJustificative);
  }
}
