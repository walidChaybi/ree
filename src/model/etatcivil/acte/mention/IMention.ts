import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { DocumentDelivrance } from "../../../requete/enum/DocumentDelivrance";
import {
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../requete/enum/DocumentDelivranceConstante";
import { NatureActe } from "../../enum/NatureActe";
import {
  ADOPTION,
  ANNULATION_ACTE,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MARIAGE,
  ANNULATION_MENTION,
  ANNULATION_PACS,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  CODE_RC_RADIE,
  LIEN_FILIATION_HORS_ADOPTION,
  NATIONALITE,
  NatureMention,
  RECTIFICATION,
  REPRISE_VIE_COMMUNE
} from "../../enum/NatureMention";
import { StatutMention } from "../../enum/StatutMention";
import { IEvenement } from "../IEvenement";
import { IAutoriteEtatCivil } from "./IAutoriteEtatCivil";
import { ITexteMention } from "./ITexteMention";
import { ITitulaireMention } from "./ITitulaireMention";
import { ITypeMention } from "./ITypeMention";

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

const mentionNaissanceInterditePourExtraitAvecFiliation = [
  REPRISE_VIE_COMMUNE,
  ANNULATION_MARIAGE,
  ANNULATION_PACS,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  CODE_RC_RADIE,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  LIEN_FILIATION_HORS_ADOPTION,
  RECTIFICATION,
  ANNULATION_ACTE
];

const mentionsMariageInterdites = [
  CHANGEMENT_NOM,
  LIEN_FILIATION_HORS_ADOPTION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  RECTIFICATION,
  ANNULATION_ACTE,
  ANNULATION_MARIAGE
];

const mentionsInterdites = {
  Naissance: {
    [CODE_EXTRAIT_AVEC_FILIATION]:
      mentionNaissanceInterditePourExtraitAvecFiliation,
    [CODE_EXTRAIT_SANS_FILIATION]: [
      ...mentionNaissanceInterditePourExtraitAvecFiliation,
      NATIONALITE,
      ADOPTION
    ]
  },
  Mariage: {
    [CODE_EXTRAIT_AVEC_FILIATION]: mentionsMariageInterdites,
    [CODE_EXTRAIT_SANS_FILIATION]: mentionsMariageInterdites
  }
};

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
  trierMentions(mentions: IMention[]) {
    mentions.sort((mention1, mentions2) =>
      mention1.numeroOrdreExtrait
        ? mention1.numeroOrdreExtrait - mentions2.numeroOrdreExtrait
        : mention1.numeroOrdre - mentions2.numeroOrdre
    );
  },
  trierMentionsNumeroOrdre(mentions: IMention[]) {
    mentions.sort(
      (mention1, mentions2) => mention1.numeroOrdre - mentions2.numeroOrdre
    );
  },
  trierMentionsNumeroOrdreExtrait(mentions: IMention[]) {
    mentions.sort((mention1, mentions2) =>
      mention1.numeroOrdreExtrait && mentions2.numeroOrdreExtrait
        ? mention1.numeroOrdreExtrait - mentions2.numeroOrdreExtrait
        : mention1.numeroOrdre - mentions2.numeroOrdre
    );
  },
  ilExisteUneMentionInterdite(
    mentions: IMention[],
    natureActe?: NatureActe,
    document?: DocumentDelivrance
  ): boolean {
    return (
      //@ts-ignore
      mentionsInterdites[`${natureActe?.libelle}`]?.[document?.code]?.find(
        (codeMention: string) =>
          mentions.find(
            mention => mention?.typeMention?.codeType === codeMention
          )
      ) != null
    );
  }
};
