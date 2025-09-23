import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { ETypeExtrait, TypeExtrait } from "../enum/TypeExtrait";

export interface ICorpsExtraitRectification {
  type: TypeExtrait;
  texte: string;
}

export interface IRectificationCorpsExtraitDto {
  type: keyof typeof ETypeExtrait;
  texte: string;
}

export class RectificationCorpsExtrait {
  private static readonly champsObligatoires: (keyof IRectificationCorpsExtraitDto)[] = ["type", "texte"];

  private constructor(
    public readonly type: keyof typeof ETypeExtrait,
    public readonly texte: string
  ) {}

  public static readonly depuisDto = (rectification: IRectificationCorpsExtraitDto): RectificationCorpsExtrait | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IRectificationCorpsExtraitDto", rectification, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IRectificationCorpsExtraitDto", rectification, "type", ETypeExtrait):
        return null;
    }

    return new RectificationCorpsExtrait(rectification.type, rectification.texte);
  };
}
