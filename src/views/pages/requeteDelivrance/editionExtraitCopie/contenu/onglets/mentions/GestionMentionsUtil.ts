import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import {
  IMentionAffichage,
  modificationEffectue
} from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  NatureMention,
  natureMentionExtraitPlurilingueMariage,
  natureMentionExtraitPlurilingueNaissance
} from "@model/etatcivil/enum/NatureMention";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import messageManager from "@util/messageManager";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { fournisseurDonneesBandeauFactory } from "../../../../../fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

export function mappingVersListe(mentionsAffichage: IMentionAffichage[]) {
  return mentionsAffichage
    .sort((a, b) => a.numeroOrdre - b.numeroOrdre)
    .map(mentionAffichage => {
      return {
        libelle: mentionAffichage.texte,
        checkbox: mentionAffichage.estPresent,
        id: mentionAffichage.id,
        aPoubelle: mentionAffichage.aPoubelle,
        nouveau: mentionAffichage.nouveau
      };
    });
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
  >,
  estExtraitPlurilingue: boolean
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
    let texte = getValeurOuVide(mentionSelect?.texte);
    if (estExtraitPlurilingue) {
      texte = Mention.getPlurilingueAPartirTexte(
        mentionSelect?.texte,
        mentionSelect?.nature
      );
    }
    temp[index].texte = texte;
    setMentions(temp);
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
  index: number
) {
  if (mentions) {
    const newListe = [...mentions];
    newListe[index].estPresent = !mentions[index].estPresent;
    setMentions(newListe);
  }
}

export function selectionneEtMiseAJour(
  mentions: IMentionAffichage[] | undefined,
  mentionSelect: IMentionAffichage | undefined,
  setMentionSelect: React.Dispatch<
    React.SetStateAction<IMentionAffichage | undefined>
  >,
  index: number,
  estExtraitPlurilingue: boolean
) {
  // Sélection de la mention
  if (mentionSelect?.numeroOrdre === index + 1) {
    setMentionSelect(undefined);
  } else {
    if (mentions?.[index]) {
      const mention = { ...mentions?.[index] };
      if (estExtraitPlurilingue) {
        mention.texte = getValeurOuVide(
          Mention.getTexteAPartirPlurilingue(mention.texte)
        );
      }
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
  >,
  estExtraitPlurilingue: boolean
) {
  if (mentions && mentionsApi && mentionSelect) {
    const indexMention = mentions.findIndex(el => el.id === mentionSelect?.id);
    const indexMentionApi = mentionsApi.findIndex(
      el => el.id === mentionSelect?.id
    );

    // Si opposableAuTiers change, on réadapte le texte si il n'a pas été changé
    if (
      texteNonModifieNatureChangePasDeTexteDelivrance(
        mentions[indexMention],
        mentionSelect,
        mentionsApi[indexMentionApi]
      )
    ) {
      miseAjourEnFonctionNature(
        mentions,
        indexMention,
        mentionSelect,
        mentionsApi,
        indexMentionApi,
        setMentionSelect,
        setMentions
      );
    }

    // Mise à jour du texte et du select
    if (
      indexMention !== -1 &&
      (mentions[indexMention].texte !== mentionSelect?.texte ||
        mentionSelect?.nature !== mentions[indexMention].nature)
    ) {
      miseAJourMention(
        mentionSelect,
        mentions,
        indexMention,
        setMentionSelect,
        setMentions,
        estExtraitPlurilingue
      );
    }
  }
}

export function miseAjourEnFonctionNature(
  mentions: IMentionAffichage[],
  indexMention: number,
  mentionSelect: IMentionAffichage,
  mentionsApi: IMention[],
  indexMentionApi: number,
  setMentionSelect: any,
  setMentions: any
) {
  const newMentions = [...mentions];
  const texte = texteEnFonctionOpposableAuTiers(
    mentions[indexMention],
    mentionSelect,
    mentionsApi[indexMentionApi]
  );
  newMentions[indexMention].texte = getValeurOuVide(texte);
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

export function aucuneMentionsAffichageNationalite(
  mentions?: IMentionAffichage[]
) {
  return mentions
    ?.filter(el => el.estPresent)
    .every(
      mention =>
        mention.nature !==
        NatureMention.getEnumFromLibelle(NatureMention, "Nationalité")
    );
}

export function aucuneMentionsNationalite(
  mentionsRetirees?: string[],
  mentions?: IMention[]
) {
  return mentions
    ?.filter(el => !mentionsRetirees?.includes(el.id))
    .every(
      el =>
        el.typeMention.nature !==
        NatureMention.getEnumFromLibelle(NatureMention, "Nationalité")
    );
}

export function boutonReinitialiserEstDisabled(
  estdeverrouille: boolean,
  mentionsApi?: IMention[],
  mentions?: IMentionAffichage[],
  document?: IDocumentReponse,
  natureActe?: NatureActe
) {
  if (DocumentDelivrance.estCopieIntegrale(document?.typeDocument)) {
    return (
      !estdeverrouille ||
      (estdeverrouille &&
        !modificationEffectue(mentions, mentionsApi, document, natureActe))
    );
  } else {
    return !modificationEffectue(mentions, mentionsApi, document, natureActe);
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

  const messageControleMention = controleMentions(mentions, acte, document);

  if (
    estDocumentCopieIntegrale &&
    modificationEffectue(mentions, mentionsApi, document, acte?.nature)
  ) {
    if (
      window.confirm(
        `Vous avez choisi de décocher des mentions.
        Celle-ci ne seront pas éditées sur la copie intégrale de l'acte choisi.`
      )
    ) {
      sauvegarderMentions();
    }
  } else if (messageControleMention) {
    if (window.confirm(messageControleMention)) {
      sauvegarderMentions();
    }
  } else {
    sauvegarderMentions();
  }
}

function controleMentions(
  mentions?: IMentionAffichage[],
  acte?: IFicheActe,
  document?: IDocumentReponse
) {
  const estExtraitAvecFilliation = DocumentDelivrance.estExtraitAvecFilliation(
    document?.typeDocument
  );

  const estDocumentExtrait = DocumentDelivrance.estExtraitAvecOuSansFilliation(
    document?.typeDocument
  );
  let message = "";
  if (
    estExtraitAvecFilliation &&
    FicheActe.acteEstACQouOP2ouOP3(acte) &&
    FicheActe.estActeNaissance(acte) &&
    aucuneMentionsAffichageNationalite(mentions)
  ) {
    message = getLibelle(`Aucune mention de nationalité n'a été cochée.\n\n`);
  }
  if (
    document?.typeDocument &&
    estDocumentExtrait &&
    NatureMention.ilExisteUneMentionInterdite(
      getNaturesMentionsAffichage(mentions),
      acte?.nature,
      DocumentDelivrance.getEnumForUUID(document.typeDocument)
    )
  ) {
    message += getLibelle(
      `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter.\n\n`
    );
  }
  if (message) {
    message += getLibelle(`Voulez-vous continuer ?`);
  }
  return message;
}

export function validerMentionsPlusieursDocuments(
  callback: () => void,
  acte?: IFicheActe,
  documents?: IDocumentReponse[]
) {
  const messageControleMention = controleMentionsPlusieursDocs(acte, documents);
  if (messageControleMention) {
    if (window.confirm(messageControleMention)) {
      callback();
    }
  } else {
    callback();
  }
}

function controleMentionsPlusieursDocs(
  acte?: IFicheActe,
  documents?: IDocumentReponse[]
) {
  let message = "";
  documents?.forEach(document => {
    const estExtraitAvecFilliation =
      DocumentDelivrance.estExtraitAvecFilliation(document?.typeDocument);

    const estDocumentExtrait =
      DocumentDelivrance.estExtraitAvecOuSansFilliation(document?.typeDocument);
    if (
      estExtraitAvecFilliation &&
      FicheActe.acteEstACQouOP2ouOP3(acte) &&
      FicheActe.estActeNaissance(acte) &&
      aucuneMentionsNationalite(
        document.mentionsRetirees?.map(
          mentionRetiree => mentionRetiree.idMention
        ),
        acte?.mentions
      )
    ) {
      message = `${getLibelle(
        "Aucune mention de nationalité n'a été cochée pour le document"
      )} ${document.nom}\n\n`;
    }
    if (
      document?.typeDocument &&
      estDocumentExtrait &&
      NatureMention.ilExisteUneMentionInterdite(
        getNaturesMentions(
          document.mentionsRetirees?.map(
            mentionRetiree => mentionRetiree.idMention
          ),
          acte?.mentions
        ),
        acte?.nature,
        DocumentDelivrance.getEnumForUUID(document.typeDocument)
      )
    ) {
      message += `${getLibelle(
        "Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter pour le document"
      )} ${document.nom}\n\n`;
    }
  });
  if (message) {
    message += getLibelle(`Voulez-vous continuer ?`);
  }
  return message;
}

export function getNaturesMentionsAffichage(
  mentionsAffichage?: IMentionAffichage[]
): NatureMention[] {
  return mentionsAffichage
    ? mentionsAffichage
        .filter(mentionAffichage => mentionAffichage.estPresent)
        .map(mentionAffichage => mentionAffichage.nature)
    : [];
}

export function getNaturesMentions(
  mentionsRetirees?: string[],
  mentions?: IMention[]
): NatureMention[] {
  return mentions
    ? mentions
        .filter(mention => !mentionsRetirees?.includes(mention.id))
        .map(mention => mention.typeMention.nature)
    : [];
}

export function getOptionsMentions(
  estExtraitPlurilingue: boolean,
  natureActe?: NatureActe
) {
  if (estExtraitPlurilingue) {
    if (natureActe === NatureActe.NAISSANCE) {
      return NatureMention.getEnumsAsOptions(
        natureMentionExtraitPlurilingueNaissance.map(el =>
          NatureMention.getEnumFromCode(NatureMention, el)
        )
      );
    } else if (natureActe === NatureActe.MARIAGE) {
      return NatureMention.getEnumsAsOptions(
        natureMentionExtraitPlurilingueMariage.map(el =>
          NatureMention.getEnumFromCode(NatureMention, el)
        )
      );
    } else return [];
  } else {
    // Un TypeMention est lié à une nature d'acte. Ce qui permet de récuperer les Nature
    return natureActe
      ? NatureMention.getEnumsAsOptions(
          TypeMention.getNaturesMentionPourActe(natureActe)
        )
      : NatureMention.getAllEnumsAsOptions();
  }
}
