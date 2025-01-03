import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { ITexteMention } from "@model/etatcivil/acte/mention/ITexteMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";

export interface MentionPourRenumerotation {
  numeroOrdreExtrait: number;
  numeroOrdre: number;
  textes: ITexteMention;
  typeMention: ITypeMention;
  id: string;
  estRenumerote?: boolean;
  aSupprimer?: boolean;
}

export class GestionnaireRenumerotationMentions {
  public renumerotationMentions(mentionsSurEcran: IMentionAffichage[], mentionsEnBase: IMention[], typeDocument: string) {
    let res: MentionPourRenumerotation[] = [];
    mentionsEnBase.forEach(el => res.push({ ...el }));
    res = res.filter(
      // Les mentions sont réellement supprimé de la base seulement si elles
      // sont supprimés et qu'elles étaient spécifiques à ce document
      mention => !(!mentionsSurEcran.find(MsE => MsE.id === mention.id) && this.contientTexteLieAuDocument(mention, typeDocument))
    );

    this.remplacerNumeroOrdreExtrait(res);
    this.numerotationMentionsEnBase(mentionsSurEcran, res);
    this.numerotationMentionsAbsenteEnBase(mentionsSurEcran, res, typeDocument);

    return res;
  }

  private contientTexteLieAuDocument(mention: MentionPourRenumerotation, typeDocument: string) {
    return (
      (mention.textes.texteMentionDelivrance && DocumentDelivrance.estExtraitAvecOuSansFilliation(typeDocument)) ||
      (mention.textes.texteMentionPlurilingue && DocumentDelivrance.estExtraitPlurilingue(typeDocument))
    );
  }

  private remplacerNumeroOrdreExtrait(mentionsEnBase: MentionPourRenumerotation[]) {
    if (mentionsEnBase.some(mention => !mention.numeroOrdreExtrait)) {
      mentionsEnBase.forEach(mention => (mention.numeroOrdreExtrait = mention.numeroOrdre));
    }
  }

  private numerotationMentionsEnBase(mentionsSurEcran: IMentionAffichage[], mentionsEnBase: MentionPourRenumerotation[]) {
    const mentionsEnBaseSurEcran = mentionsSurEcran.filter(mention => mentionsEnBase.map(mentionMap => mentionMap.id).includes(mention.id));

    mentionsEnBaseSurEcran.forEach((mention, index) => {
      mentionsEnBase.sort((a, b) => a.numeroOrdreExtrait - b.numeroOrdreExtrait);
      const indexMentionCourante = mentionsEnBase.findIndex(el => el.id === mention.id);
      if (mentionsEnBaseSurEcran[0].id === mention.id) {
        this.numerotationMentionsEnBaseSiPremiere(mentionsSurEcran, mentionsEnBase, indexMentionCourante);
      } else {
        this.numerotationMentionsEnBaseSiPasPremiere(mentionsSurEcran, mentionsEnBase, indexMentionCourante, mentionsEnBaseSurEcran, index);
      }
    });
    mentionsEnBase.sort((a, b) => a.numeroOrdreExtrait - b.numeroOrdreExtrait);
    mentionsEnBase.forEach(mention => (mention.estRenumerote = false));
  }

  private numerotationMentionsEnBaseSiPremiere(
    mentionsSurEcran: IMentionAffichage[],
    mentionsEnBase: MentionPourRenumerotation[],
    indexMentionCourante: number
  ) {
    let i = 0;
    let c = 1;
    while (i < indexMentionCourante) {
      if (!mentionsSurEcran.map(mentionMap => mentionMap.id).includes(mentionsEnBase[i].id)) {
        mentionsEnBase[i].numeroOrdreExtrait = c;
        mentionsEnBase[i].estRenumerote = true;
        c++;
      }
      i++;
    }
    mentionsEnBase[indexMentionCourante].numeroOrdreExtrait = c;
    mentionsEnBase[indexMentionCourante].estRenumerote = true;
  }

  private numerotationMentionsEnBaseSiPasPremiere(
    mentionsSurEcran: IMentionAffichage[],
    mentionsEnBase: MentionPourRenumerotation[],
    indexMentionCourante: number,
    mentionsEnBaseSurEcran: IMentionAffichage[],
    index: number
  ) {
    let i = mentionsEnBase.findIndex(el => el.id === mentionsEnBaseSurEcran[index - 1].id);

    let c = mentionsEnBase[i].numeroOrdreExtrait + 1;
    while (i < indexMentionCourante) {
      if (!mentionsSurEcran.map(mentionMap => mentionMap.id).includes(mentionsEnBase[i].id)) {
        mentionsEnBase[i].numeroOrdreExtrait = c;
        mentionsEnBase[i].estRenumerote = true;

        c++;
      }
      i++;
    }
    mentionsEnBase[indexMentionCourante].numeroOrdreExtrait = c;
    mentionsEnBase[indexMentionCourante].estRenumerote = true;

    if (mentionsEnBase[i].id === mentionsEnBaseSurEcran[mentionsEnBaseSurEcran.length - 1].id) {
      i = 0;
      c++;
      while (i < mentionsEnBase.length) {
        if (
          mentionsSurEcran.map(mentionMap => mentionMap.id).includes(mentionsEnBase[i].id) &&
          i !== indexMentionCourante &&
          !mentionsEnBase[i].estRenumerote
        ) {
          mentionsEnBase[i].numeroOrdreExtrait = c;
          mentionsEnBase[i].estRenumerote = true;

          c++;
        }
        i++;
      }
    }
  }

  private numerotationMentionsAbsenteEnBase(
    mentionsSurEcran: IMentionAffichage[],
    mentionsEnBase: MentionPourRenumerotation[],
    typeDocument: string
  ) {
    const mentionsSurEcranPasEnBase = mentionsSurEcran.filter(
      mention => !mentionsEnBase.map(mentionMap => mentionMap.id).includes(mention.id)
    );

    mentionsSurEcranPasEnBase.forEach(mention => {
      mentionsEnBase.sort((mentionA, mentionB) => mentionA.numeroOrdreExtrait - mentionB.numeroOrdreExtrait);

      if (mentionsSurEcran[0].id === mention.id) {
        mention.numeroOrdre = 1;
        mentionsEnBase.forEach(el => (el.numeroOrdreExtrait += 1));
      } else {
        const indexMention = mentionsSurEcran.findIndex(el => el.id === mention.id);

        const mentionEnBaseAvantMentionCourrante = mentionsEnBase.find(el => el.id === mentionsSurEcran[indexMention - 1].id);

        let numeroOrdreExtrait = mentionsSurEcran[indexMention - 1].numeroOrdre;
        if (mentionEnBaseAvantMentionCourrante) {
          numeroOrdreExtrait = mentionEnBaseAvantMentionCourrante.numeroOrdreExtrait + 1;
          mention.numeroOrdre = numeroOrdreExtrait;
        }

        let i = mentionsEnBase.findIndex(el => el.numeroOrdreExtrait === numeroOrdreExtrait);
        while (i >= 0 && i < mentionsEnBase.length) {
          mentionsEnBase[i].numeroOrdreExtrait += 1;
          i++;
        }
      }

      const estExtraitPlurilingue = DocumentDelivrance.estExtraitPlurilingue(typeDocument);
      const mentionAAjouter = {
        id: mention.id,
        numeroOrdreExtrait: mention.numeroOrdre,
        textes: {
          texteMentionDelivrance: estExtraitPlurilingue ? undefined : mention.texte,
          texteMentionPlurilingue: estExtraitPlurilingue ? mention.texte : undefined
        },
        typeMention: {
          idNatureMention: mention.nature?.id
        }
      };
      mentionsEnBase.push(mentionAAjouter as unknown as MentionPourRenumerotation);
    });
    mentionsEnBase.sort((a, b) => a.numeroOrdreExtrait - b.numeroOrdreExtrait);
  }
}

export const gestionnaireRenumerotationMentions = new GestionnaireRenumerotationMentions();
