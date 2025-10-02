import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";

export interface IPhraseSignatureProjectActeDto {
  idPhraseSignature: string;
  phraseSignature: string;
}

export type TPhraseSignatureProjectActePostDto = Omit<IPhraseSignatureProjectActeDto, "idPhraseSignature">;

export class PhraseSignatureProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IPhraseSignatureProjectActeDto)[] = ["idPhraseSignature", "phraseSignature"];
  private constructor(
    public readonly idPhraseSignature: string,
    public readonly phraseSignature: string
  ) {}

  public static readonly depuisDto = (phraseSignature: IPhraseSignatureProjectActeDto): PhraseSignatureProjetActeTranscrit | null => {
    if (champsObligatoiresDuDtoAbsents("IPhraseSignatureProjectActeDto", phraseSignature, this.champsObligatoires)) return null;

    return new PhraseSignatureProjetActeTranscrit(phraseSignature.idPhraseSignature, phraseSignature.phraseSignature);
  };
}
