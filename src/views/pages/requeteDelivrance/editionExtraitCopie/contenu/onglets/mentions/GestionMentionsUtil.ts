import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IMentionAffichage, modificationEffectuee } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { Mention } from "@model/etatcivil/acte/mention/Mention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  INatureMention,
  NatureMention,
  natureMentionExtraitPlurilingueMariage,
  natureMentionExtraitPlurilingueNaissance
} from "@model/etatcivil/enum/NatureMention";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Options } from "@util/Type";
import AfficherMessage from "../../../../../../../utils/AfficherMessage";

const miseAJourMention = (
  mentionSelect: IMentionAffichage | undefined,
  mentions: IMentionAffichage[],
  index: number,
  setMentionSelect: React.Dispatch<React.SetStateAction<IMentionAffichage | undefined>>,
  setMentions: React.Dispatch<React.SetStateAction<IMentionAffichage[] | undefined>>,
  estExtraitPlurilingue: boolean
) => {
  // Si le texte est vide, on remet le texte de la liste
  if (mentionSelect?.texte === "") {
    AfficherMessage.avertissement("Le texte de la mention est obligatoire", { fermetureAuto: true });
    const temp = { ...mentionSelect };
    temp.texte = mentions[index].texte;
    setMentionSelect(temp);
  } else {
    const temp = [...mentions];
    temp[index].nature = mentionSelect?.nature as INatureMention;
    let texte = mentionSelect?.texte ?? "";
    if (estExtraitPlurilingue) {
      texte = getTextePlurilingueAPartirTexte(mentionSelect?.texte, mentionSelect?.nature);
    }
    temp[index].texte = texte;
    setMentions(temp);
  }
};

export const getTextePlurilingueAPartirTexte = (texte?: string, nature?: INatureMention | null): string => `${nature?.code} ${texte}`;

export const getTexteAPartirMentionPlurilingue = (texteMentionPlurilingue?: string): string => {
  if (!texteMentionPlurilingue) return "";

  const matches = new RegExp(/(?:Mar|Div|D|Sc|A) ([\W\w\s]*)/gm).exec(texteMentionPlurilingue);
  return matches?.[1] ?? "";
};

export const handleReorga = (mentions: IMentionAffichage[] | undefined, setMentions: any, oldIndex: number, newIndex: number) => {
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
};

export const handleCheckBox = (mentions: IMentionAffichage[] | undefined, setMentions: any, index: number) => {
  if (mentions && index >= 0) {
    const newListe = [...mentions];
    newListe[index].estPresent = !mentions[index].estPresent;
    setMentions(newListe);
  }
};

export const selectionneEtMiseAJour = (
  mentions: IMentionAffichage[] | undefined,
  mentionSelect: IMentionAffichage | undefined,
  setMentionSelect: React.Dispatch<React.SetStateAction<IMentionAffichage | undefined>>,
  index: number,
  estExtraitPlurilingue: boolean
) => {
  // Sélection de la mention
  if (mentionSelect?.numeroOrdre === index + 1) {
    setMentionSelect(undefined);
  } else if (mentions?.[index]) {
    const mention = { ...mentions?.[index] };
    if (estExtraitPlurilingue) {
      mention.texte = getTexteAPartirMentionPlurilingue(mention.texte);
    }
    setMentionSelect(mention);
  }
};

export const handleBlur = (
  mentions: IMentionAffichage[] | undefined,
  mentionSelect: IMentionAffichage | undefined,
  mentionsApi: Mention[] | undefined,
  setMentionSelect: React.Dispatch<React.SetStateAction<IMentionAffichage | undefined>>,
  setMentions: React.Dispatch<React.SetStateAction<IMentionAffichage[] | undefined>>,
  estExtraitPlurilingue: boolean
) => {
  if (mentions && mentionsApi && mentionSelect) {
    const indexMention = mentions.findIndex(el => el.id === mentionSelect?.id);
    const indexMentionApi = mentionsApi.findIndex(el => el.id === mentionSelect?.id);

    // Si opposableAuTiers change, on réadapte le texte si il n'a pas été changé
    if (texteNonModifieNatureChangePasDeTexteDelivrance(mentions[indexMention], mentionSelect, mentionsApi[indexMentionApi])) {
      miseAjourEnFonctionNature(mentions, indexMention, mentionSelect, mentionsApi, indexMentionApi, setMentionSelect, setMentions);
    }

    // Mise à jour du texte et du select
    if (
      indexMention !== -1 &&
      (mentions[indexMention].texte !== mentionSelect?.texte || mentionSelect?.nature !== mentions[indexMention].nature)
    ) {
      miseAJourMention(mentionSelect, mentions, indexMention, setMentionSelect, setMentions, estExtraitPlurilingue);
    }
  }
};

const miseAjourEnFonctionNature = (
  mentions: IMentionAffichage[],
  indexMention: number,
  mentionSelect: IMentionAffichage,
  mentionsApi: Mention[],
  indexMentionApi: number,
  setMentionSelect: any,
  setMentions: any
) => {
  const newMentions = [...mentions];
  const texte = texteEnFonctionOpposableAuTiers(mentions[indexMention], mentionSelect, mentionsApi[indexMentionApi]);
  newMentions[indexMention].texte = texte ?? "";
  const newSelect = { ...mentionSelect };
  newSelect.texte = texte ?? "";
  setMentionSelect(newSelect);
  setMentions(newMentions);
};

const texteEnFonctionOpposableAuTiers = (mention?: IMentionAffichage, mentionSelect?: IMentionAffichage, mentionApi?: Mention) => {
  let res = mention?.texte;
  if (mentionSelect?.nature?.opposableAuTiers && !mention?.nature?.opposableAuTiers) {
    res = `${mentionApi?.textes.texteMention} ${mentionApi?.textes.texteApposition}`;
  } else if (!mentionSelect?.nature?.opposableAuTiers && mention?.nature?.opposableAuTiers) {
    res = mentionApi?.textes.texteMention;
  }
  return res;
};

const texteNonModifieNatureChangePasDeTexteDelivrance = (
  mention?: IMentionAffichage,
  mentionSelect?: IMentionAffichage,
  mentionApi?: Mention
) => {
  return (
    mention &&
    mentionApi &&
    mentionSelect &&
    mentionApi.getTexteExtrait() === mentionSelect?.texte &&
    mentionSelect?.nature !== mention.nature &&
    !mentionApi.textes.texteMentionDelivrance
  );
};

const aucuneMentionsAffichageNationalite = (mentions?: IMentionAffichage[]) => {
  return mentions?.filter(el => el.estPresent).every(mention => mention.nature?.libelle !== "Nationalité");
};

export const aucuneMentionsNationalite = (mentionsRetirees?: string[], mentions?: Mention[]) => {
  return mentions?.filter(el => !mentionsRetirees?.includes(el.id)).every(el => el.typeMention.natureMention?.libelle !== "Nationalité");
};

export const boutonReinitialiserEstDisabled = (
  estdeverrouille: boolean,
  mentionsApi?: Mention[],
  mentions?: IMentionAffichage[],
  document?: IDocumentReponse,
  natureActe?: keyof typeof ENatureActe
) => {
  if (DocumentDelivrance.estCopieIntegrale(document?.typeDocument)) {
    return !estdeverrouille || (estdeverrouille && !modificationEffectuee(mentions, mentionsApi, document, natureActe));
  } else {
    return !modificationEffectuee(mentions, mentionsApi, document, natureActe);
  }
};

export const getValeurEstdeverrouillerCommencement = (document?: IDocumentReponse) => {
  if (document?.mentionsRetirees) {
    return document.mentionsRetirees.length > 0;
  } else {
    return false;
  }
};

export const validerMentions = (
  mentions: IMentionAffichage[] | undefined,
  sauvegarderMentions: () => void,
  mentionsApi?: Mention[],
  acte?: FicheActe,
  document?: IDocumentReponse
) => {
  const estDocumentCopieIntegrale = DocumentDelivrance.estCopieIntegrale(document?.typeDocument);

  const messageControleMention = controleMentions(mentions, acte, document);

  if (estDocumentCopieIntegrale && modificationEffectuee(mentions, mentionsApi, document, acte?.nature)) {
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
};

const controleMentions = (mentions?: IMentionAffichage[], acte?: FicheActe, document?: IDocumentReponse) => {
  const estExtraitAvecFilliation = DocumentDelivrance.estExtraitAvecFilliation(document?.typeDocument);

  const estDocumentExtrait = DocumentDelivrance.estExtraitAvecOuSansFilliation(document?.typeDocument);
  let message = "";
  if (
    estExtraitAvecFilliation &&
    acte?.registre &&
    ["OP2", "OP3", "ACQ"].includes(acte.registre.famille) &&
    acte.nature === "NAISSANCE" &&
    aucuneMentionsAffichageNationalite(mentions)
  ) {
    message = `Aucune mention de nationalité n'a été cochée.\n\n`;
  }
  if (
    document?.typeDocument &&
    estDocumentExtrait &&
    NatureMention.ilExisteUneMentionInterdite(
      getNaturesMentionsAffichage(mentions),
      acte?.nature,
      DocumentDelivrance.depuisId(document.typeDocument)
    )
  ) {
    message += `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter.\n\n`;
  }
  if (message) {
    message += `Voulez-vous continuer ?`;
  }
  return message;
};

export const validerMentionsPlusieursDocuments = (callback: () => void, acte?: FicheActe, documents?: IDocumentReponse[]) => {
  const messageControleMention = controleMentionsPlusieursDocs(acte, documents);
  if (messageControleMention) {
    if (window.confirm(messageControleMention)) {
      callback();
    }
  } else {
    callback();
  }
};

const controleMentionsPlusieursDocs = (acte?: FicheActe, documents?: IDocumentReponse[]) => {
  let message = "";
  documents?.forEach(document => {
    const estExtraitAvecFilliation = DocumentDelivrance.estExtraitAvecFilliation(document?.typeDocument);

    const estDocumentExtrait = DocumentDelivrance.estExtraitAvecOuSansFilliation(document?.typeDocument);
    if (
      estExtraitAvecFilliation &&
      acte?.registre &&
      ["OP2", "OP3", "ACQ"].includes(acte.registre.famille) &&
      acte?.nature === "NAISSANCE" &&
      aucuneMentionsNationalite(
        document.mentionsRetirees?.map(mentionRetiree => mentionRetiree.idMention),
        acte?.mentions
      )
    ) {
      message = `Aucune mention de nationalité n'a été cochée pour le document ${document.nom}\n\n`;
    }
    if (
      document?.typeDocument &&
      estDocumentExtrait &&
      NatureMention.ilExisteUneMentionInterdite(
        getNaturesMentions(
          document.mentionsRetirees?.map(mentionRetiree => mentionRetiree.idMention),
          acte?.mentions
        ),
        acte?.nature,
        DocumentDelivrance.depuisId(document.typeDocument)
      )
    ) {
      message += `
        Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter pour le document ${document.nom}\n\n`;
    }
  });
  if (message) {
    message += `Voulez-vous continuer ?`;
  }
  return message;
};

const getNaturesMentionsAffichage = (mentionsAffichage?: IMentionAffichage[]): (INatureMention | null)[] => {
  return mentionsAffichage?.filter(mentionAffichage => mentionAffichage.estPresent).map(mentionAffichage => mentionAffichage.nature) ?? [];
};

export const getNaturesMentions = (mentionsRetirees?: string[], mentions?: Mention[]): (INatureMention | null)[] => {
  return mentions?.filter(mention => !mentionsRetirees?.includes(mention.id)).map(mention => mention.typeMention.natureMention) ?? [];
};

export const getOptionsMentions = (estExtraitPlurilingue: boolean, natureActe?: keyof typeof ENatureActe): Options => {
  if (!estExtraitPlurilingue) {
    return natureActe
      ? NatureMention.versOptions(TypeMention.getNatureMention(TypeMention.getTypeMentionParNatureActe(natureActe)))
      : NatureMention.versOptions();
  }

  let codesNaturesPourOptions: string[] = [];
  switch (natureActe) {
    case "NAISSANCE":
      codesNaturesPourOptions = natureMentionExtraitPlurilingueNaissance;
      break;
    case "MARIAGE":
      codesNaturesPourOptions = natureMentionExtraitPlurilingueMariage;
      break;
    default:
      break;
  }

  return NatureMention.versOptions(
    codesNaturesPourOptions.reduce((natures: INatureMention[], codeNature: string) => {
      const natureMention = NatureMention.depuisCode(codeNature);
      if (natureMention) {
        natures.push(natureMention);
      }

      return natures;
    }, [])
  );
};
