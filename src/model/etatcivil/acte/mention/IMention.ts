import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { NatureMention } from "../../enum/NatureMention";
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
  }
};
