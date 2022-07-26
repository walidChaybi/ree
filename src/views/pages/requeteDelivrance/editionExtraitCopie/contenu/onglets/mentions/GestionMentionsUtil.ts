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
import messageManager from "../../../../../../common/util/messageManager";
import {
  getLibelle,
  getValeurOuVide,
  shallowEgalTableau
} from "../../../../../../common/util/Utils";
import { fournisseurDonneesBandeauFactory } from "../../../../../fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

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
  const estCopie = DocumentDelivrance.estCopieIntegrale(document.typeDocument);

  !estCopie
    ? Mention.trierMentionsNumeroOrdreExtrait(mentionsApi)
    : Mention.trierMentionsNumeroOrdre(mentionsApi);

  return mentionsApi.map((mentionApi: IMention) => ({
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
    aPoubelle: mentionApi.textes.texteMention === null
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
        mentionsAEnvoyer.push({
          numeroOrdreExtrait: mA.numeroOrdre,
          textes: { texteMentionDelivrance: mA.texte },
          typeMention: {
            nature: {
              id: NatureMention.getUuidFromNature(mA.nature)
            }
          },
          id: mA.id
        });
      } else {
        mentionsRetirees.push(mA.id);
      }
    } else {
      mentionsAEnvoyer.push({
        numeroOrdreExtrait: mA.numeroOrdre,
        textes: { texteMentionDelivrance: mA.texte },
        typeMention: {
          nature: {
            id: NatureMention.getUuidFromNature(mA.nature)
          }
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
  document?: IDocumentReponse
) {
  if (mentions && mentionsApi && document) {
    if (
      !shallowEgalTableau(
        mentions,
        mappingVersMentionAffichage(mentionsApi, document)
      )
    ) {
      return true;
    } else {
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
      el.numeroOrdre = index;
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
  estdeverrouille: boolean,
  mentionsApi?: IMention[],
  mentions?: IMentionAffichage[],
  document?: IDocumentReponse
) {
  if (DocumentDelivrance.estCopieIntegrale(document?.typeDocument)) {
    return (
      !estdeverrouille ||
      (estdeverrouille &&
        !modificationEffectue(mentions, mentionsApi, document))
    );
  } else {
    return !modificationEffectue(mentions, mentionsApi, document);
  }
}

export function getValeurEstdeverrouillerCommencement(
  document?: IDocumentReponse
) {
  if (document?.mentionsRetirees) {
    return document.mentionsRetirees.length > 0;
  } else {
    return false;
  }
}

export function validerMentions(
  mentions: IMentionAffichage[] | undefined,
  sauvegarderMentions: () => void,
  mentionsApi?: IMention[],
  acte?: IFicheActe,
  document?: IDocumentReponse
) {
  const estDocumentCopieIntegrale = DocumentDelivrance.estCopieIntegrale(
    document?.typeDocument
  );

  const estDocumentExtrait = DocumentDelivrance.estExtraitAvecOuSansFilliation(
    document?.typeDocument
  );

  if (
    estDocumentCopieIntegrale &&
    modificationEffectue(mentions, mentionsApi, document)
  ) {
    confirmation(
      `Vous avez choisi de décocher des mentions.
        Celle-ci ne seront pas éditées sur la copie intégrale de l'acte choisi.`,
      sauvegarderMentions
    );
  } else if (
    !estDocumentCopieIntegrale &&
    FicheActe.acteEstACQouOP2ouOP3(acte) &&
    FicheActe.estActeNaissance(acte) &&
    aucuneMentionsNationalite(mentions)
  ) {
    confirmation(
      `Aucune mention de nationalité n'a été cochée. 
        Voulez-vous continuer ?`,
      sauvegarderMentions
    );
  } else if (
    document?.typeDocument &&
    estDocumentExtrait &&
    Mention.ilExisteUneMentionInterdite(
      getMentionSelectionnees(mentions, mentionsApi),
      acte?.nature,
      DocumentDelivrance.getEnumForUUID(document.typeDocument)
    )
  ) {
    confirmation(
      `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter. 
        Voulez-vous continuer ?`,
      sauvegarderMentions
    );
  } else {
    sauvegarderMentions();
  }
}

function confirmation(message: string, fonction: any) {
  if (window.confirm(message)) {
    fonction();
  }
}

export function getMentionSelectionnees(
  mentionsAffichage?: IMentionAffichage[],
  mentionsApi?: IMention[]
): IMention[] {
  return mentionsApi ? mentionsApi.filter(mentionApi => mentionApi) : []; // TODO
}
