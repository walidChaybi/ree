/* v8 ignore start */
import { OptionAvecOrdre } from "@util/Type";
import { TypeRedactionActe } from "../../etatcivil/enum/TypeRedactionActe";
import { TypeRequete } from "./TypeRequete";

export const CODE_TRANSCRIPTION_ACTE = "TRANSCRIPTION_ACTE";
export const CODE_TRANSCRIPTION_TITULAIRE_ACTE = "TRANSCRIPTION_TITULAIRE_ACTE";
export const CODE_TRANSCRIPTION_PARENT_TITULAIRE_ACTE = "TRANSCRIPTION_PARENT_TITULAIRE_ACTE";
export const CODE_TRANSCRIPTION_AUTRE = "TRANSCRIPTION_AUTRE";

export interface ITypePieceJustificative {
  id: string;
  categorie: string;
  code: string;
  libelle: string;
  typeRequete: string;
  typeRedactionActe: string;
  ordre: number;
  usageRECE: boolean;
  usageTeleprocedure: boolean;
}

export class TypePieceJustificative {
  private static liste: ITypePieceJustificative[] | null = null;

  public static init(typePieceJustificative: ITypePieceJustificative[]) {
    if (TypePieceJustificative.liste !== null) {
      return;
    }

    TypePieceJustificative.liste = typePieceJustificative;
  }

  public static depuisId(id: string): ITypePieceJustificative | null {
    return TypePieceJustificative.liste?.find(typePieceJustificative => typePieceJustificative.id === id) ?? null;
  }

  public static depuisLibelle(libelle: string): ITypePieceJustificative | null {
    return TypePieceJustificative.liste?.find(typePieceJustificative => typePieceJustificative.libelle === libelle) ?? null;
  }

  public static versOptions(typeRequete: TypeRequete, typeRedactionActe?: TypeRedactionActe): OptionAvecOrdre[] {
    return (
      TypePieceJustificative.liste
        ?.filter(
          typePieceJustificative =>
            typePieceJustificative?.typeRequete === typeRequete?.nom && typePieceJustificative?.typeRedactionActe === typeRedactionActe
        )
        .map(
          (typePieceJustificative): OptionAvecOrdre => ({
            cle: typePieceJustificative.id,
            libelle: typePieceJustificative.libelle,
            ordre: typePieceJustificative.ordre
          })
        )
        .sort((opt1, opt2) => opt1.ordre - opt2.ordre) ?? []
    );
  }
}
/* v8 ignore end */
