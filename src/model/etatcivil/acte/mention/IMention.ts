import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { getDateStringFromDateCompose } from "@util/DateUtils";
import { DEUX, getValeurOuVide, UN } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  MARIAGE,
  NATIONALITE,
  NatureMention,
  natureMentionExtraitPlurilingueMariage,
  natureMentionExtraitPlurilingueNaissance
} from "../../enum/NatureMention";
import { StatutMention } from "../../enum/StatutMention";
import { IEvenement } from "../IEvenement";
import { IAutoriteEtatCivil } from "./IAutoriteEtatCivil";
import { ITexteMention } from "./ITexteMention";
import { ITitulaireMention } from "./ITitulaireMention";
import { ITypeMention } from "./ITypeMention";

const REMPLACEMENT_SI_INTROUVABLE = "XXXXXXXXXX";
const AVEC = "avec";
export interface IMention {
  id: string;
  numeroOrdre: number;
  numeroOrdreExtrait: number;
  villeApposition: string;
  regionApposition: string;
  dateApposition: Date;
  dateCreation: Date;
  statut: StatutMention;
  dateStatut: Date;
  titulaires: ITitulaireMention[];
  typeMention: ITypeMention;
  autoriteEtatCivil: IAutoriteEtatCivil;
  evenement: IEvenement;
  textes: ITexteMention;
}

export const Mention = {
  getTexteExtrait(mention: IMention): string {
    let texte = "";
    const texteMention = getValeurOuVide(mention.textes.texteMention);

    if (mention.textes) {
      if (mention.textes.texteMentionDelivrance) {
        texte = mention.textes.texteMentionDelivrance;
      } else if (
        NatureMention.estOpposableAuTiers(mention.typeMention.nature)
      ) {
        const texteApposition = mention.textes.texteApposition
          ? ` ${mention.textes.texteApposition}`
          : "";
        texte = `${texteMention}${texteApposition}`;
      } else {
        texte = texteMention;
      }
    }

    return texte;
  },
  getTexteCopie(mention: IMention): string {
    let texte = "";
    if (mention.textes) {
      const texteMention = mention.textes.texteMention
        ? `${mention.textes.texteMention} `
        : "";
      const texteApposition = mention.textes.texteApposition
        ? `${mention.textes.texteApposition} `
        : "";
      const texteOEC = mention.textes.texteOEC
        ? `${mention.textes.texteOEC} `
        : "";
      texte = `${texteMention}${texteApposition}${texteOEC}`;
    }
    return texte;
  },
  getTexteAPartirPlurilingue(texteMentionPlurilingue?: string): string {
    if (texteMentionPlurilingue) {
      const regex = /(?:Mar|Div|D|Sc|A) ([\W\w\s]*)/gm;
      const matches = new RegExp(regex).exec(texteMentionPlurilingue);
      if (matches?.[1]) {
        return matches?.[1];
      }
    }
    return "";
  },
  getPlurilingueAPartirTexte(texte?: string, nature?: NatureMention): string {
    return `${NatureMention.getCodePourNature(nature?.code)} ${texte}`;
  },
  trierMentionsNumeroOrdreApposition(mentions: IMention[]) {
    mentions.sort(
      (mention1, mentions2) => mention1.numeroOrdre - mentions2.numeroOrdre
    );

    return mentions;
  },
  mentionNationalitePresente(mentions: IMention[]): boolean {
    return Boolean(
      mentions.find(el => el.typeMention.nature.code === NATIONALITE)
    );
  },
  trierMentionsNumeroOrdreExtraitOuOrdreApposition(mentions: IMention[]) {
    const toutesLesMentionsOntUnNumeroOrdreExtrait: boolean = mentions.every(
      mention => mention.numeroOrdreExtrait != null
    );
    return toutesLesMentionsOntUnNumeroOrdreExtrait
      ? mentions.sort(
          (mention1, mentions2) =>
            mention1.numeroOrdreExtrait - mentions2.numeroOrdreExtrait
        )
      : this.trierMentionsNumeroOrdreApposition(mentions);
  },
  filtreAvecTexteMentionEtTexteMentionDelivrance(
    mentions?: IMention[]
  ): IMention[] {
    return mentions
      ? mentions.filter(
          mention =>
            mention.textes?.texteMention ||
            mention.textes?.texteMentionDelivrance
        )
      : [];
  },
  filtreAvecTexteMentionPlurilingue(mentions?: IMention[]): IMention[] {
    return mentions
      ? mentions.filter(mention => mention.textes?.texteMentionPlurilingue)
      : [];
  },
  filtrerTexteMentionPlurilingueEtNatureAdequat(
    natureActe?: NatureActe,
    mentions?: IMention[]
  ): IMention[] {
    const tableauNatureFiltrer =
      natureActe === NatureActe.NAISSANCE
        ? natureMentionExtraitPlurilingueNaissance
        : natureMentionExtraitPlurilingueMariage;
    return mentions
      ? mentions.filter(
          mention =>
            Boolean(mention.textes?.texteMentionPlurilingue) ||
            tableauNatureFiltrer.includes(mention.typeMention.nature.code)
        )
      : [];
  },
  formaterMentionsPlurilingue(mentions?: IMention[]) {
    mentions?.forEach(
      (mention: IMention) =>
        (mention.textes = {
          ...mention.textes,
          texteMentionPlurilingue: mention.textes.texteMentionPlurilingue
            ? mention.textes.texteMentionPlurilingue
            : Mention.getTextePlurilingueAPartirMention(mention)
        })
    );
  },
  getTextePlurilingueAPartirMention(mention: IMention): string {
    const nature = NatureMention.getCodePourNature(
      mention.typeMention.nature.code
    );

    let lieu;
    let date;
    if (mention.evenement) {
      date = mention.evenement.annee
        ? getDateStringFromDateCompose(
            {
              annee: mention.evenement.annee.toString(),
              mois: mention.evenement.mois?.toString(),
              jour: mention.evenement.jour?.toString()
            },
            "-"
          )
        : REMPLACEMENT_SI_INTROUVABLE;

      if (
        !mention.evenement.ville &&
        !mention.evenement.region &&
        !mention.evenement.pays &&
        !mention.evenement.lieuReprise
      ) {
        lieu = REMPLACEMENT_SI_INTROUVABLE;
      } else {
        lieu = mention.evenement.lieuReprise
          ? mention.evenement.lieuReprise
          : LieuxUtils.getLieu(
              mention.evenement.ville,
              mention.evenement.region,
              mention.evenement.pays,
              mention.evenement.arrondissement
            );
      }
    } else {
      lieu = REMPLACEMENT_SI_INTROUVABLE;
      date = REMPLACEMENT_SI_INTROUVABLE;
    }

    let texteMention = `${nature} ${date} ${lieu}`;
    if (
      mention.typeMention.nature ===
      NatureMention.getEnumFromCode(NatureMention, MARIAGE)
    ) {
      const conjoint = getConjoint(mention);
      if (conjoint) {
        texteMention += ` ${conjoint}`;
      }
    }
    return texteMention;
  }
};

function getConjoint(mention: IMention) {
  let texte;
  let conjoint = "";
  if (mention.textes?.texteMentionDelivrance?.includes(AVEC)) {
    texte = mention.textes?.texteMentionDelivrance;
  }
  if (mention.textes?.texteMention?.includes(AVEC)) {
    texte = mention.textes?.texteMention;
  }
  if (texte) {
    const regex = /avec ([^.]*[^'A-ZÀ-Ý .-]) *([A-ZÀ-Ý' -]*).?/gm;
    const matches = new RegExp(regex).exec(texte);
    if (matches?.[DEUX]) {
      conjoint = matches[DEUX];
    }
    if (matches?.[UN]) {
      conjoint += ` ${matches[UN]}`;
    }
  } else {
    conjoint = REMPLACEMENT_SI_INTROUVABLE;
  }
  return conjoint;
}

