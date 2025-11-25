import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { ListeItem } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";

export const mappingMentionAffichageVersListeItem = (mentionsAffichage: IMentionAffichage[]): ListeItem[] => {
  return mentionsAffichage
    .sort((a, b) => a.numeroOrdre - b.numeroOrdre)
    .map(mentionAffichage => {
      return {
        libelle: mentionAffichage.texte,
        checkbox: mentionAffichage.estPresent,
        id: mentionAffichage.id,
        estSupprimable: mentionAffichage.estSupprimable,
        estModifiable: mentionAffichage.estModifiable,
        nouveau: mentionAffichage.nouveau
      };
    });
};
