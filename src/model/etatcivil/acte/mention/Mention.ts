import { champsObligatoiresDuDtoAbsents } from "@model/commun/dtoUtils";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import DateUtils from "@util/DateUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IMentionMiseAJourDto } from "../../../../views/common/hook/acte/mentions/MiseAJourMentionsApiHook";
import {
  MARIAGE,
  NatureMention,
  natureMentionExtraitPlurilingueMariage,
  natureMentionExtraitPlurilingueNaissance
} from "../../enum/NatureMention";
import { IEvenementDto } from "../IEvenement";
import { ITexteMention } from "./ITexteMention";
import { ITypeMention, TypeMention } from "./ITypeMention";

const REMPLACEMENT_SI_INTROUVABLE = "XXXXXXXXXX";

export interface IMentionDto {
  id: string;
  numeroOrdre: number;
  numeroOrdreExtrait?: number;
  typeMention: { idTypeMention: string };
  evenement?: IEvenementDto;
  textes: ITexteMention;
}

export class Mention {
  private static readonly champsObligatoires: (keyof IMentionDto)[] = ["id", "numeroOrdre", "typeMention", "textes"];

  private constructor(
    public readonly id: string,
    public readonly numeroOrdre: number,
    public readonly numeroOrdreExtrait: number | null,
    public readonly typeMention: ITypeMention,
    public readonly evenement: IEvenementDto | null,
    public readonly textes: ITexteMention
  ) {}

  public static readonly depuisDto = (mention: IMentionDto): Mention | null => {
    if (champsObligatoiresDuDtoAbsents("IMentionDto", mention, this.champsObligatoires)) return null;

    const typeMention = TypeMention.depuisIdTypeMention(mention.typeMention.idTypeMention);

    if (!typeMention) return null;

    return new Mention(
      mention.id,
      mention.numeroOrdre,
      mention.numeroOrdreExtrait ?? null,
      typeMention,
      mention.evenement ?? null,
      mention.textes
    );
  };

  public readonly getTexteCopie = (): string => {
    const texteMention = this.textes.texteMention ? `${this.textes.texteMention} ` : "";
    const texteApposition = this.textes.texteApposition ? `${this.textes.texteApposition} ` : "";
    const texteOEC = this.textes.texteOEC ? `${this.textes.texteOEC} ` : "";

    return `${texteMention}${texteApposition}${texteOEC}`;
  };

  public readonly getTexteExtrait = (): string => {
    const texteMention = this.textes.texteMention ?? "";

    if (this.textes.texteMentionDelivrance) {
      return this.textes.texteMentionDelivrance;
    } else if (this.typeMention.natureMention?.opposableAuTiers) {
      const texteApposition = this.textes.texteApposition ? ` ${this.textes.texteApposition}` : "";

      return `${texteMention}${texteApposition}`;
    } else {
      return texteMention;
    }
  };

  public readonly mettreAJourTextePlurilingueAPartirMention = () => {
    if (this.textes.texteMentionPlurilingue) return;

    const nature = NatureMention.getCodePourNature(this.typeMention.natureMention?.code);

    const date = this.evenement?.annee
      ? DateUtils.getDateStringFromDateCompose(
          {
            annee: this.evenement.annee.toString(),
            mois: this.evenement.mois?.toString(),
            jour: this.evenement.jour?.toString()
          },
          "-"
        )
      : REMPLACEMENT_SI_INTROUVABLE;

    let lieu;
    if (!this.evenement?.ville && !this.evenement?.region && !this.evenement?.pays && !this.evenement?.lieuReprise) {
      lieu = REMPLACEMENT_SI_INTROUVABLE;
    } else {
      lieu =
        this.evenement.lieuReprise ??
        LieuxUtils.getLieu(this.evenement.ville, this.evenement.region, this.evenement.pays, this.evenement.arrondissement);
    }

    let texteMention = `${nature} ${date} ${lieu}`;
    if (this.typeMention.natureMention === NatureMention.depuisCode(MARIAGE)) {
      const conjoint = this.getConjoint();
      if (conjoint) {
        texteMention += ` ${conjoint}`;
      }
    }
    this.textes.texteMentionPlurilingue = texteMention;
  };

  private readonly getConjoint = (): string => {
    let texte;
    let conjoint = "";
    if (this.textes?.texteMentionDelivrance?.includes("avec")) {
      texte = this.textes?.texteMentionDelivrance;
    }
    if (this.textes?.texteMention?.includes("avec")) {
      texte = this.textes?.texteMention;
    }
    if (texte) {
      const regex = /avec ([^.]*[^'A-ZÀ-Ý .-]) *([A-ZÀ-Ý' -]*).?/gm;
      const matches = new RegExp(regex).exec(texte);
      if (matches?.[2]) {
        conjoint = matches[2];
      }
      if (matches?.[1]) {
        conjoint += ` ${matches[1]}`;
      }
    } else {
      conjoint = REMPLACEMENT_SI_INTROUVABLE;
    }
    return conjoint;
  };

  public readonly versMentionMiseAJourDto = (): IMentionMiseAJourDto => ({
    id: this.id,
    numeroOrdreExtrait: this.numeroOrdreExtrait!, // point d'exclamation à supprimer
    textes: {
      texteMentionDelivrance: this.textes.texteMentionDelivrance
    },
    typeMention: {
      idTypeMention: this.typeMention.id,
      idNatureMention: this.typeMention.natureMention?.id
    }
  });
}

export const filtrerFormaterEtTrierMentionsPlurilingues = (mentions: Mention[], natureActe?: keyof typeof ENatureActe): Mention[] => {
  const naturesMentionsSelonNatureActe =
    natureActe === "NAISSANCE" ? natureMentionExtraitPlurilingueNaissance : natureMentionExtraitPlurilingueMariage;
  const mentionsFiltrees = mentions.filter(
    mention =>
      Boolean(mention.textes?.texteMentionPlurilingue) ||
      naturesMentionsSelonNatureActe.includes(mention.typeMention.natureMention?.code ?? "")
  );

  mentionsFiltrees.forEach(mention => mention.mettreAJourTextePlurilingueAPartirMention());

  return mentionsFiltrees.every(mention => mention.numeroOrdreExtrait !== null)
    ? triListeObjetsSurPropriete(mentionsFiltrees, "numeroOrdreExtrait")
    : triListeObjetsSurPropriete(mentionsFiltrees, "numeroOrdre");
};
