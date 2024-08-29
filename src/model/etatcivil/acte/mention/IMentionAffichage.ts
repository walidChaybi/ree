import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { estNonRenseigne, shallowEgalTableau } from "@util/Utils";
import { gestionnaireRenumerotationMentions } from "@utilMetier/mention/GestionnaireRenumerotationMentions";
import { StatutMention } from "./../../enum/StatutMention";
import { IMention, Mention } from "./IMention";
import { ITypeMention, TypeMention } from "./ITypeMention";

export interface IMentionAffichage {
  texte: string;
  estPresent: boolean;
  nature: NatureMention;
  id: string;
  numeroOrdre: number;
  estSupprimable: boolean;
  estModifiable: boolean;
  nouveau?: boolean;
}

export const mappingVersMentionsApi = (
  mentionsApi: IMention[],
  mentionsAffichage: IMentionAffichage[],
  typeDocument: string
) => {
  const mentionsRetirees: string[] = [];
  const mentionsAEnvoyer: any[] = [];
  const mentionsRenumerote =
    gestionnaireRenumerotationMentions.renumerotationMentions(
      mentionsAffichage,
      mentionsApi,
      typeDocument
    );

  mentionsRenumerote.forEach(mR => {
    const mention = mentionsAffichage.find(mA => mA.id === mR.id);
    const mentionAAjouter = {
      numeroOrdreExtrait: mR.numeroOrdreExtrait,
      textes: {
        texteMentionDelivrance: mR.textes.texteMentionDelivrance,
        texteMentionPlurilingue: mR.textes.texteMentionPlurilingue
      },
      typeMention: {
        idNatureMention: NatureMention.getUuidFromNature(
          mR.typeMention.natureMention
        ),
        idTypeMention: TypeMention.getIdTypeMentionDepuisIdNature(
          mR.typeMention["idNatureMention" as keyof ITypeMention] as string
        )
      },
      id: mR.id
    };
    if (mention) {
      if (DocumentDelivrance.estExtraitPlurilingue(typeDocument)) {
        mentionAAjouter.textes.texteMentionPlurilingue = mention.texte;
      } else {
        mentionAAjouter.textes.texteMentionDelivrance = mention.texte;
      }
      mentionAAjouter.typeMention.idNatureMention =
        NatureMention.getUuidFromNature(mention.nature);
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

export const modificationEffectue = (
  mentions?: IMentionAffichage[],
  mentionsApi?: IMention[],
  document?: IDocumentReponse,
  natureActe?: NatureActe
) => {
  if (mentions && mentionsApi && document) {
    if (
      !shallowEgalTableau(
        mentions,
        mappingVersMentionAffichage(mentionsApi, document, natureActe)
      )
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const mappingVersMentionAffichage = (
  mentionsApi: IMention[],
  document: IDocumentReponse,
  natureActe?: NatureActe
): IMentionAffichage[] => {
  let mentionsPourAffichage: IMentionAffichage[] = [];

  if (DocumentDelivrance.estCopieIntegrale(document.typeDocument)) {
    mentionsPourAffichage = mappingVersMentionAffichagePourCopieIntegrale(
      mentionsApi,
      document
    );
  } else if (
    DocumentDelivrance.estExtraitAvecOuSansFilliation(document.typeDocument)
  ) {
    mentionsPourAffichage =
      mappingVersMentionAffichagePourExtraitAvecOuSansFiliation(
        mentionsApi,
        document
      );
  } else if (DocumentDelivrance.estExtraitPlurilingue(document.typeDocument)) {
    mentionsPourAffichage = mappingVersMentionAffichagePourExtraitPlurilingue(
      mentionsApi,
      document,
      natureActe
    );
  }

  return mentionsPourAffichage;
};

export const mappingVersMentionAffichagePourExtraitAvecOuSansFiliation = (
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] => {
  const mentions =
    Mention.filtreAvecTexteMentionEtTexteMentionDelivrance(mentionsApi);

  Mention.trierMentionsNumeroOrdreExtraitOuOrdreApposition(mentions);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: Mention.getTexteExtrait(mentionApi),
    estPresent: DocumentReponse.nEstPasMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait,
    estSupprimable: estNonRenseigne(mentionApi.textes.texteMention),
    estModifiable: false
  }));
};

export const mappingVersMentionAffichagePourExtraitPlurilingue = (
  mentionsApi: IMention[],
  document: IDocumentReponse,
  natureActe?: NatureActe
): IMentionAffichage[] => {
  const mentions = Mention.filtrerFormaterEtTrierMentionsPlurilingues(
    mentionsApi,
    natureActe
  );

  // @ts-ignore le texteMentionPlurilingue n'est pas undefined
  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: mentionApi.textes.texteMentionPlurilingue,
    estPresent: DocumentReponse.nEstPasMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait,
    aPoubelle: estNonRenseigne(mentionApi.textes.texteMention)
  }));
};

export const mappingVersMentionAffichagePourCopieIntegrale = (
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] => {
  const mentions = Mention.trierMentionsNumeroOrdreApposition([...mentionsApi]);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.natureMention,
    texte: Mention.getTexteCopie(mentionApi),
    estPresent: DocumentReponse.nEstPasMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdre,
    estSupprimable: mentionApi.textes.texteMention === null,
    estModifiable: false
  }));
};

export const mappingVersMentionAffichagePourMiseAJour = (
  mentions: IMention[]
): IMentionAffichage[] => {
  return mentions.reduce<IMentionAffichage[]>(
    (mentionsSelectionnees, mention) => {
      if (mention.textes.texteMention) {
        mentionsSelectionnees.push({
          id: mention.id,
          numeroOrdre: mention.numeroOrdre,
          texte: mention.textes.texteMention,
          estPresent: mention.statut === StatutMention.BROUILLON,
          nature: mention.typeMention.natureMention,
          estSupprimable: true,
          estModifiable: true
        });
      }
      return mentionsSelectionnees;
    },
    []
  );
};
