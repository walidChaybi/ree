import {
  FicheActe,
  IFicheActe
} from "../../../../../../../model/etatcivil/acte/IFicheActe";
import {
  IMention,
  Mention
} from "../../../../../../../model/etatcivil/acte/mention/IMention";
import { NatureMention } from "../../../../../../../model/etatcivil/enum/NatureMention";
import { TypeFiche } from "../../../../../../../model/etatcivil/enum/TypeFiche";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import { IMentionsResultat } from "../../../../../../common/hook/acte/mentions/MentionsApiHook";
import { IMiseAJourDocumentMentionParams } from "../../../../../../common/hook/acte/mentions/MiseAJourDocumentMentionApiHook";
import { IMiseAJourMentionsParams } from "../../../../../../common/hook/acte/mentions/MiseAJourMentionsApiHook";
import messageManager from "../../../../../../common/util/messageManager";
import {
  getLibelle,
  getValeurOuVide,
  shallowEgalTableau
} from "../../../../../../common/util/Utils";
import { fournisseurDonneesBandeauFactory } from "../../../../../fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { GestionMentionsProps } from "./GestionMentions";

export interface IMentionAffichage {
  texte: string;
  estPresent: boolean;
  nature: NatureMention;
  id: string;
  numeroOrdre: number;
  aPoubelle: boolean;
}

export function mappingVersMentionAffichage(
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] {
  const estCopie = DocumentDelivrance.typeDocumentEstCopie(
    document.typeDocument
  );
  return mentionsApi
    .sort((a, b) =>
      estCopie
        ? a.numeroOrdre - b.numeroOrdre
        : a.numeroOrdreExtrait - b.numeroOrdreExtrait
    )
    .map(mentionApi => ({
      nature: mentionApi.typeMention.nature,
      texte: estCopie
        ? Mention.getTexteCopie(mentionApi)
        : Mention.getTexteExtrait(mentionApi),
      estPresent: !document.mentionsRetirees?.find(
        mentionRetiree => mentionRetiree.idMention === mentionApi.id
      ),
      id: mentionApi.id,
      numeroOrdre: estCopie
        ? mentionApi.numeroOrdre
        : mentionApi.numeroOrdreExtrait,
      aPoubelle: mentionApi.textes.texteMention === ""
    }));
}

export function mappingVersListe(mentionsAffichage: IMentionAffichage[]) {
  return mentionsAffichage
    .sort((a, b) => a.numeroOrdre - b.numeroOrdre)
    .map(el => {
      return {
        libelle: el.texte,
        checkbox: el.estPresent,
        id: el.id,
        aPoubelle: el.aPoubelle
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

export function mappingVersMentionsApi(
  mentionsApi: IMention[],
  mentionsAffichage: IMentionAffichage[]
) {
  const mentionsRetirees: string[] = [];
  const mentionsAEnvoyer: any[] = [];
  mentionsAffichage.forEach(mA => {
    const mention = mentionsApi.find(mApi => mA.id === mApi.id);
    if (mention) {
      if (mA.estPresent) {
        const mentionFormater = mention as any;
        mentionFormater.numeroOrdreExtrait = mA.numeroOrdre;
        mentionFormater.textes.texteMentionDelivrance = mA.texte;
        mentionFormater.typeMention.nature =
          NatureMention.mappingNatureVersNomenclatureDto(mA.nature);
        mentionsAEnvoyer.push(mentionFormater);
      } else {
        mentionsRetirees.push(mA.id);
      }
    } else {
      mentionsAEnvoyer.push({
        numeroOrdreExtrait: mA.numeroOrdre,
        textes: { texteMentionDelivrance: mA.texte },
        typeMention: {
          nature: NatureMention.mappingNatureVersNomenclatureDto(mA.nature)
        }
      });
    }
  });
  return { mentionsAEnvoyer, mentionsRetirees };
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
  document?: IDocumentReponse,
  setIsDirty?: any
) {
  if (mentions && mentionsApi && document) {
    if (
      !shallowEgalTableau(
        mentions,
        mappingVersMentionAffichage(mentionsApi, document)
      )
    ) {
      if (setIsDirty) {
        setIsDirty(true);
      }
      return true;
    } else {
      if (setIsDirty) {
        setIsDirty(false);
      }
      return false;
    }
  } else {
    return false;
  }
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
    Mention.getTexteExtrait(mentionApi) === mentionSelect?.texte &&
    mentionSelect?.nature !== mention.nature &&
    !mentionApi.textes.texteMentionDelivrance
  );
}

export function getRegistreActe(acte: IFicheActe) {
  const fournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(TypeFiche.ACTE, acte);
  return fournisseurDonneesBandeau.getRegistre();
}

export function aucuneMentionsNationalite(mentions?: IMentionAffichage[]) {
  return mentions
    ?.filter(el => el.estPresent)
    .every(
      el =>
        el.nature !==
        NatureMention.getEnumFromLibelle(NatureMention, "Nationalité")
    );
}

export function boutonReinitialiserEstDisabled(
  estDeverouille: boolean,
  setIsDirty: () => void,
  mentionsApi?: IMention[],
  mentions?: IMentionAffichage[],
  document?: IDocumentReponse
) {
  if (DocumentDelivrance.typeDocumentEstCopie(document?.typeDocument)) {
    return (
      !estDeverouille ||
      (estDeverouille &&
        !modificationEffectue(mentions, mentionsApi, document, setIsDirty))
    );
  } else {
    return !modificationEffectue(mentions, mentionsApi, document, setIsDirty);
  }
}

export function getValeurEstDeverouillerCommencement(
  document?: IDocumentReponse
) {
  if (document?.mentionsRetirees) {
    return document.mentionsRetirees.length > 0;
  } else {
    return false;
  }
}

export function saveMentions(
  mentionsApi: IMentionsResultat | undefined,
  mentions: IMentionAffichage[] | undefined,
  props: React.PropsWithChildren<GestionMentionsProps>,
  setMentionsAEnvoyerParams: React.Dispatch<
    React.SetStateAction<IMiseAJourMentionsParams | undefined>
  >,
  setDocumentMajParams: React.Dispatch<
    React.SetStateAction<IMiseAJourDocumentMentionParams | undefined>
  >
) {
  if (mentionsApi && mentionsApi.mentions && mentions && props.document) {
    const { mentionsAEnvoyer, mentionsRetirees } = mappingVersMentionsApi(
      mentionsApi.mentions,
      mentions
    );
    if (modificationEffectue(mentions, mentionsApi.mentions, props.document)) {
      if (
        DocumentDelivrance.typeDocumentEstCopie(props.document?.typeDocument)
      ) {
        // TODO generer la copie
      } else {
        setMentionsAEnvoyerParams({
          idActe: getValeurOuVide(props.acte?.id),
          mentions: mentionsAEnvoyer
        });
      }
      setDocumentMajParams({
        idDocument: props.document.id,
        mentionsRetirees
      });
    } else {
      setDocumentMajParams({
        idDocument: props.document.id
      });
    }
  }
}

export function validerMentions(
  props: React.PropsWithChildren<GestionMentionsProps>,
  mentions: IMentionAffichage[] | undefined,
  sauvegarderMentions: () => void,
  mentionsApi?: IMention[]
) {
  if (DocumentDelivrance.typeDocumentEstCopie(props.document?.typeDocument)) {
    if (
      modificationEffectue(mentions, mentionsApi, props.document) &&
      window.confirm(`Vous avez choisi de décocher des mentions.
        Celle-ci ne seront pas éditées sur la copie intégrale de l'acte choisi.`)
    ) {
      sauvegarderMentions();
    }
  } else {
    if (
      FicheActe.acteEstACQouOP2ouOP3(props.acte) &&
      FicheActe.estActeNaissance(props.acte) &&
      aucuneMentionsNationalite(mentions)
    ) {
      if (
        window.confirm(`Aucune mention de nationalité n'a été cochée. 
        Voulez-vous continuer ?`)
      ) {
        sauvegarderMentions();
      }
    } else {
      sauvegarderMentions();
    }
  }
}
