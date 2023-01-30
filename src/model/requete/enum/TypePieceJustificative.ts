/* istanbul ignore file */
import { peupleTypePieceJustificative } from "@api/nomenclature/NomenclatureRequete";
import { EnumNomemclature } from "@util/enum/EnumNomenclature";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";
import { TypeRequete } from "./TypeRequete";

export const CODE_TRANSCRIPTION_ACTE = "TRANSCRIPTION_ACTE";
export const CODE_TRANSCRIPTION_TITULAIRE_ACTE = "TRANSCRIPTION_TITULAIRE_ACTE";
export const CODE_TRANSCRIPTION_PARENT_TITULAIRE_ACTE =
  "TRANSCRIPTION_PARENT_TITULAIRE_ACTE";
export const CODE_TRANSCRIPTION_AUTRE = "TRANSCRIPTION_AUTRE";
export class TypePieceJustificative extends EnumNomemclature {
  constructor(
    code: string,
    libelle: string,
    categorie: string,
    private readonly _typeRequete: string
  ) {
    super(code, libelle, categorie);
  }

  get typeRequete() {
    return this._typeRequete;
  }

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

  public static getAllEnumsByTypeRequeteAsOptions(
    typeRequete?: TypeRequete
  ): Options {
    const options = TypePieceJustificative.getAllEnumsAsOptions();
    return options.filter(
      opt =>
        TypePieceJustificative.getEnumFor(opt.value).typeRequete ===
        TypeRequete.DELIVRANCE.nom
    );
  }
}
