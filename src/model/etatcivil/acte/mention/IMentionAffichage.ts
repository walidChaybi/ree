import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentReponse, IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { shallowEgalTableau, triListeObjetsSurPropriete } from "@util/Utils";
import { gestionnaireRenumerotationMentions } from "@utilMetier/mention/GestionnaireRenumerotationMentions";
import { ITypeMention, TypeMention } from "./ITypeMention";
import { filtrerFormaterEtTrierMentionsPlurilingues, Mention } from "./Mention";

export interface IMentionAffichage {
  texte: string;
  estPresent: boolean;
  nature: INatureMention | null;
  id: string;
  numeroOrdre: number;
  estSupprimable: boolean;
  estModifiable: boolean;
  nouveau?: boolean;
}

export const mappingVersMentionsApi = (mentionsApi: Mention[], mentionsAffichage: IMentionAffichage[], typeDocument: string) => {
  const mentionsRetirees: string[] = [];
  const mentionsAEnvoyer: any[] = [];
  const mentionsRenumerotees = gestionnaireRenumerotationMentions.renumerotationMentions(mentionsAffichage, mentionsApi, typeDocument);
  mentionsRenumerotees.forEach(mR => {
    const mention = mentionsAffichage.find(mA => mA.id === mR.id);
    const mentionAAjouter = {
      numeroOrdreExtrait: mR.numeroOrdreExtrait,
      textes: {
        texteMentionDelivrance: mR.textes.texteMentionDelivrance,
        texteMentionPlurilingue: mR.textes.texteMentionPlurilingue
      },
      typeMention: {
        idNatureMention: mR.typeMention.natureMention?.id,
        // FIXME: Gros problème de typage. mR n'a pas toujours le type que renumerotationMentions lui donne
        idTypeMention:
          mR.typeMention.id || TypeMention.getIdTypeMentionDepuisIdNature(mR.typeMention["idNatureMention" as keyof ITypeMention] as string)
      },
      id: mR.id
    };
    if (mention) {
      if (DocumentDelivrance.estExtraitPlurilingue(typeDocument)) {
        mentionAAjouter.textes.texteMentionPlurilingue = mention.texte;
      } else {
        mentionAAjouter.textes.texteMentionDelivrance = mention.texte;
      }
      mentionAAjouter.typeMention.idNatureMention = mention.nature?.id ?? "";
      mentionsAEnvoyer.push(mentionAAjouter);
      if (!mention.estPresent) {
        mentionsRetirees.push(mention.id);
      }
    } else {
      mentionsAEnvoyer.push(mentionAAjouter);
    }
  });

  return { mentionsAEnvoyer, mentionsRetirees };
};

export const modificationEffectuee = (
  mentions?: IMentionAffichage[],
  mentionsApi?: Mention[],
  document?: IDocumentReponse,
  natureActe?: keyof typeof ENatureActe
): boolean =>
  Boolean(
    mentions && mentionsApi && document && !shallowEgalTableau(mentions, mappingVersMentionAffichage(mentionsApi, document, natureActe))
  );

export const mappingVersMentionAffichage = (
  mentionsApi: Mention[],
  documentReponse: IDocumentReponse,
  natureActe?: keyof typeof ENatureActe
): IMentionAffichage[] => {
  switch (DocumentDelivrance.depuisId(documentReponse.typeDocument)?.code) {
    case ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE:
      return mappingVersMentionAffichagePourCopieIntegrale(mentionsApi, documentReponse);
    case ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION:
    case ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION:
      return mappingVersMentionAffichagePourExtraitAvecOuSansFiliation(mentionsApi, documentReponse);
    case ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE:
      return mappingVersMentionAffichagePourExtraitPlurilingue(mentionsApi, documentReponse, natureActe);
    default:
      return [];
  }
};

const mappingVersMentionAffichagePourExtraitAvecOuSansFiliation = (
  mentionsApi: Mention[],
  document: IDocumentReponse
): IMentionAffichage[] => {
  const mentions = mentionsApi.filter(mention => mention.textes?.texteMention ?? mention.textes?.texteMentionDelivrance);

  const mentionsTriees = mentions.every(mention => mention.numeroOrdreExtrait !== null)
    ? triListeObjetsSurPropriete(mentions, "numeroOrdreExtrait")
    : triListeObjetsSurPropriete(mentions, "numeroOrdre");

  return mentionsTriees.map(mentionApi => ({
    nature: mentionApi.typeMention.natureMention,
    texte: mentionApi.getTexteExtrait(),
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait!, // TOREFACTOR: supprimer le point d'exclamation
    estSupprimable: !mentionApi.textes.texteMention,
    estModifiable: false
  }));
};

const mappingVersMentionAffichagePourExtraitPlurilingue = (
  mentionsApi: Mention[],
  document: IDocumentReponse,
  natureActe?: keyof typeof ENatureActe
): IMentionAffichage[] => {
  const mentions = filtrerFormaterEtTrierMentionsPlurilingues(mentionsApi, natureActe);

  return mentions.map(mentionApi => ({
    nature: mentionApi.typeMention.natureMention,
    texte: mentionApi.textes.texteMentionPlurilingue ?? "",
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait!, // TOREFACTOR: supprimer le point d'exclamation
    estSupprimable: !mentionApi.textes.texteMention,
    estModifiable: false
  }));
};

const mappingVersMentionAffichagePourCopieIntegrale = (mentionsApi: Mention[], document: IDocumentReponse): IMentionAffichage[] => {
  const mentions = triListeObjetsSurPropriete(mentionsApi, "numeroOrdre");

  return mentions.map(mentionApi => ({
    nature: mentionApi.typeMention.natureMention,
    texte: mentionApi.getTexteCopie(),
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdre,
    estSupprimable: mentionApi.textes.texteMention === null,
    estModifiable: false
  }));
};
