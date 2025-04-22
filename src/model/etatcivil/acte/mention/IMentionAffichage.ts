import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentReponse, IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { estNonRenseigne, shallowEgalTableau } from "@util/Utils";
import { gestionnaireRenumerotationMentions } from "@utilMetier/mention/GestionnaireRenumerotationMentions";
import { IMention, Mention } from "./IMention";
import { ITypeMention, TypeMention } from "./ITypeMention";

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

export const mappingVersMentionsApi = (mentionsApi: IMention[], mentionsAffichage: IMentionAffichage[], typeDocument: string) => {
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
  mentionsApi?: IMention[],
  document?: IDocumentReponse,
  natureActe?: NatureActe
): boolean =>
  Boolean(
    mentions && mentionsApi && document && !shallowEgalTableau(mentions, mappingVersMentionAffichage(mentionsApi, document, natureActe))
  );

export const mappingVersMentionAffichage = (
  mentionsApi: IMention[],
  documentReponse: IDocumentReponse,
  natureActe?: NatureActe
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
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] => {
  const mentions = Mention.filtreAvecTexteMentionEtTexteMentionDelivrance(mentionsApi);

  Mention.trierMentionsNumeroOrdreExtraitOuOrdreApposition(mentions);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: Mention.getTexteExtrait(mentionApi),
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait,
    estSupprimable: estNonRenseigne(mentionApi.textes.texteMention),
    estModifiable: false
  }));
};

const mappingVersMentionAffichagePourExtraitPlurilingue = (
  mentionsApi: IMention[],
  document: IDocumentReponse,
  natureActe?: NatureActe
): IMentionAffichage[] => {
  const mentions = Mention.filtrerFormaterEtTrierMentionsPlurilingues(mentionsApi, natureActe);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: mentionApi.textes.texteMentionPlurilingue ?? "",
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait,
    estSupprimable: estNonRenseigne(mentionApi.textes.texteMention),
    estModifiable: false
  }));
};

const mappingVersMentionAffichagePourCopieIntegrale = (mentionsApi: IMention[], document: IDocumentReponse): IMentionAffichage[] => {
  const mentions = Mention.trierMentionsNumeroOrdreApposition([...mentionsApi]);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: Mention.getTexteCopie(mentionApi),
    estPresent: !DocumentReponse.estMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdre,
    estSupprimable: mentionApi.textes.texteMention === null,
    estModifiable: false
  }));
};
