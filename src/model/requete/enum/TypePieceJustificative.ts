/* istanbul ignore file */
import { peupleTypePieceJustificative } from "@api/nomenclature/NomenclatureRequete";
import { OptionAvecOrdre, Options } from "@util/Type";
import { EnumNomemclature } from "@util/enum/EnumNomenclature";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { TypeRedactionActe } from "../../etatcivil/enum/TypeRedactionActe";
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
    private readonly _typeRequete: string,
    private readonly _ordre: number,
    private readonly _typeRedactionActe?: string
  ) {
    super(code, libelle, categorie);
  }

  get typeRequete() {
    return this._typeRequete;
  }

  get typeRedactionActe() {
    return this._typeRedactionActe;
  }

  get ordre() {
    return this._ordre;
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

  public static getEnumFor(uuid: string): TypePieceJustificative {
    return EnumWithLibelle.getEnumFor(uuid, TypePieceJustificative);
  }

  public static getKeyForLibelle(nom: string) {
    return EnumWithComplete.getKeyForLibelle(TypePieceJustificative, nom);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypePieceJustificative);
  }

  public static getAllEnumsByTypeRequeteAsOptions(
    typeRequete: TypeRequete,
    typeRedactionActe?: TypeRedactionActe
  ): Options {
    const options =
      TypePieceJustificative.getAllEnumsAsOptions() as OptionAvecOrdre[];
    return options
      .filter(opt => {
        const typePieceJustificative = TypePieceJustificative.getEnumFor(
          opt.cle
        );
        opt.ordre = typePieceJustificative.ordre;
        return (
          typePieceJustificative?.typeRequete === typeRequete?.nom &&
          typePieceJustificative?.typeRedactionActe === typeRedactionActe
        );
      })
      .sort((opt1, opt2) => opt1.ordre - opt2.ordre);
  }
}
