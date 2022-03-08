import { IFicheActe } from "../../../../../../../model/etatcivil/acte/IFicheActe";
import {
  IMention,
  Mention
} from "../../../../../../../model/etatcivil/acte/mention/IMention";
import { NatureMention } from "../../../../../../../model/etatcivil/enum/NatureMention";
import { TypeFiche } from "../../../../../../../model/etatcivil/enum/TypeFiche";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import messageManager from "../../../../../../common/util/messageManager";
import {
  getLibelle,
  getValeurOuVide
} from "../../../../../../common/util/Utils";
import { fournisseurDonneesBandeauFactory } from "../../../../../fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

export interface IMentionAffichage {
  texte: string;
  estPresent: boolean;
  nature: NatureMention;
  id: string;
  numeroOrdre: number;
}

export function mappingVersMentionAffichage(
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] {
  return mentionsApi
    .sort((a, b) => a.numeroOrdreExtrait - b.numeroOrdreExtrait)
    .map(el => ({
      nature: el.typeMention.nature,
      texte: Mention.getTexte(el),
      estPresent: !document.mentionsRetirees?.find(
        mentionRetiree => mentionRetiree.idMention === el.id
      ),
      id: el.id,
      numeroOrdre: el.numeroOrdreExtrait
    }));
}

export function mappingVersListe(mentionsAffichage: IMentionAffichage[]) {
  return mentionsAffichage
    .sort((a, b) => a.numeroOrdre - b.numeroOrdre)
    .map(el => {
      return {
        libelle: el.texte,
        checkbox: el.estPresent,
        id: el.id
      };
    });
}

export function getEnumNatureMentionOuAutre(id: string) {
  if (id) {
    return NatureMention.getEnumFor(id);
  } else {
    return NatureMention.getEnumFromLibelle(NatureMention, "Autres");
  }
}

export function miseAJourMention(
  mentionSelect: IMentionAffichage | undefined,
  mentions: IMentionAffichage[],
  index: number,
  setMentionSelect: React.Dispatch<
    React.SetStateAction<IMentionAffichage | undefined>
  >,
  setMentions: React.Dispatch<
    React.SetStateAction<IMentionAffichage[] | undefined>
  >
) {
  // Si le texte est vide, on remet le texte de la liste
  if (mentionSelect?.texte === "") {
    messageManager.showWarningAndClose(
      getLibelle("Le texte de la mention est obligatoire")
    );
    const temp = { ...mentionSelect };
    temp.texte = mentions[index].texte;
    setMentionSelect(temp);
  } else {
    const temp = [...mentions];
    temp[index].nature = NatureMention.getEnumOrEmpty(mentionSelect?.nature);
    temp[index].texte = getValeurOuVide(mentionSelect?.texte);
    setMentions(temp);
  }
}

export function modificationEffectue(
  mentions?: IMentionAffichage[],
  mentionsApi?: IMention[],
  document?: IDocumentReponse
) {
  if (mentions && mentionsApi && document) {
    return (
      JSON.stringify(mentions) ===
      JSON.stringify(mappingVersMentionAffichage(mentionsApi, document))
    );
  } else return false;
}

export function handleReorga(
  mentions: IMentionAffichage[] | undefined,
  setMentions: any,
  oldIndex: number,
  newIndex: number
) {
  if (mentions) {
    const newList = [...mentions];
    const item = newList[oldIndex];
    newList.splice(oldIndex, 1);
    newList.splice(newIndex, 0, item);
    newList.forEach((el, index) => {
      el.numeroOrdre = index + 1;
    });
    setMentions(newList);
  }
}

export function handleCheckBox(
  mentions: IMentionAffichage[] | undefined,
  setMentions: any,
  id: string
) {
  if (mentions) {
    const index = mentions.findIndex(el => el.id === id);
    if (index !== -1) {
      const newListe = [...mentions];
      newListe[index].estPresent = !mentions[index].estPresent;
      setMentions(newListe);
    }
  }
}

export function selectionneEtMiseAJour(
  mentions: IMentionAffichage[] | undefined,
  mentionSelect: IMentionAffichage | undefined,
  setMentionSelect: React.Dispatch<
    React.SetStateAction<IMentionAffichage | undefined>
  >,
  id: string
) {
  // Sélection de la mention
  if (mentionSelect?.id === id) {
    setMentionSelect(undefined);
  } else {
    const mention = mentions?.find(el => el.id === id);
    if (mention) {
      setMentionSelect(mention);
    }
  }
}

export function handleBlur(
  mentions: IMentionAffichage[] | undefined,
  mentionSelect: IMentionAffichage | undefined,
  mentionsApi: IMention[] | undefined,
  setMentionSelect: React.Dispatch<
    React.SetStateAction<IMentionAffichage | undefined>
  >,
  setMentions: React.Dispatch<
    React.SetStateAction<IMentionAffichage[] | undefined>
  >
) {
  if (mentions && mentionsApi && mentionSelect) {
    const indexMentions = mentions.findIndex(el => el.id === mentionSelect?.id);
    const indexMentionsApi = mentionsApi.findIndex(
      el => el.id === mentionSelect?.id
    );

    // Si opposableAuTiers change, on réadapte le texte si il n'a pas été changé
    if (
      texteNonModifieNatureChangePasDeTexteDelivrance(
        mentions[indexMentions],
        mentionSelect,
        mentionsApi[indexMentionsApi]
      )
    ) {
      miseAjourEnFonctionNature(
        mentions,
        indexMentions,
        mentionSelect,
        mentionsApi,
        indexMentionsApi,
        setMentionSelect,
        setMentions
      );
    }

    // Mise à jour du texte et du select
    if (
      indexMentions !== -1 &&
      (mentions[indexMentions].texte !== mentionSelect?.texte ||
        mentionSelect?.nature !== mentions[indexMentions].nature)
    ) {
      miseAJourMention(
        mentionSelect,
        mentions,
        indexMentions,
        setMentionSelect,
        setMentions
      );
    }
  }

}

export function miseAjourEnFonctionNature(
  mentions: IMentionAffichage[],
  indexMentions: number,
  mentionSelect: IMentionAffichage,
  mentionsApi: IMention[],
  indexMentionsApi: number,
  setMentionSelect: any,
  setMentions: any
) {
  const newMentions = [...mentions];
  const texte = texteEnFonctionOpposableAuTiers(
    mentions[indexMentions],
    mentionSelect,
    mentionsApi[indexMentionsApi]
  );
  newMentions[indexMentions].texte = getValeurOuVide(texte);
  const newSelect = { ...mentionSelect };
  newSelect.texte = getValeurOuVide(texte);
  setMentionSelect(newSelect);
  setMentions(newMentions);
}

export function texteEnFonctionOpposableAuTiers(
  mention?: IMentionAffichage,
  mentionSelect?: IMentionAffichage,
  mentionApi?: IMention
) {
  let res = mention?.texte;
  if (
    mentionSelect?.nature.opposableAuTiers &&
    !mention?.nature.opposableAuTiers
  ) {
    res = `${mentionApi?.textes.texteMention} ${mentionApi?.textes.texteApposition}`;
  } else if (
    !mentionSelect?.nature.opposableAuTiers &&
    mention?.nature.opposableAuTiers
  ) {
    res = mentionApi?.textes.texteMention;
  }
  return res;
}

export function texteNonModifieNatureChangePasDeTexteDelivrance(
  mention?: IMentionAffichage,
  mentionSelect?: IMentionAffichage,
  mentionApi?: IMention
) {
  return (
    mention &&
    mentionApi &&
    mentionSelect &&
    Mention.getTexte(mentionApi) === mentionSelect?.texte &&
    mentionSelect?.nature !== mention.nature &&
    !mentionApi.textes.texteMentionDelivrance
  );
}

export function getRegistreActe(acte: IFicheActe) {
  const fournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(TypeFiche.ACTE, acte);
  return fournisseurDonneesBandeau.getRegistre();
}
