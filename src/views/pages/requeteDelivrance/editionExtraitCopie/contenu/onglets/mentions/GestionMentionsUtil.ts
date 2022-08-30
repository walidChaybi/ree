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
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../../../model/requete/IDocumentReponse";
import messageManager from "../../../../../../common/util/messageManager";
import {
  getLibelle,
  getValeurOuVide,
  shallowEgalTableau
} from "../../../../../../common/util/Utils";
import { fournisseurDonneesBandeauFactory } from "../../../../../fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { gestionnaireRenumerotationMentions } from "./GestionnaireRenumerotationMentions";

export interface IMentionAffichage {
  texte: string;
  estPresent: boolean;
  nature: NatureMention;
  id: string;
  numeroOrdre: number;
  aPoubelle: boolean;
  nouveau?: boolean;
}

export function mappingVersMentionAffichage(
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] {
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
  }
  // TODO plurilingue
  //  else if(DocumentDelivrance.estExtraitPlurilingue()){
  //   mentionsPourAffichage = ...
  // }

  return mentionsPourAffichage;
}

export function mappingVersMentionAffichagePourExtraitAvecOuSansFiliation(
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] {
  const mentions =
    Mention.filtreSansTexteMentionNiTexteMentionDelivrance(mentionsApi);

  Mention.trierMentionsNumeroOrdreExtraitOuOrdreApposition(mentions);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.nature,
    texte: Mention.getTexteExtrait(mentionApi),
    estPresent: DocumentReponse.nEstPasMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdreExtrait,
    aPoubelle: mentionApi.textes.texteMention === null
  }));
}

export function mappingVersMentionAffichagePourCopieIntegrale(
  mentionsApi: IMention[],
  document: IDocumentReponse
): IMentionAffichage[] {
  const mentions = Mention.trierMentionsNumeroOrdreApposition([...mentionsApi]);

  return mentions.map((mentionApi: IMention) => ({
    nature: mentionApi.typeMention.nature,
    texte: Mention.getTexteCopie(mentionApi),
    estPresent: DocumentReponse.nEstPasMentionRetiree(document, mentionApi),
    id: mentionApi.id,
    numeroOrdre: mentionApi.numeroOrdre,
    aPoubelle: mentionApi.textes.texteMention === null
  }));
}

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

export function mappingVersMentionApi(mention: IMention) {
  return {
    numeroOrdreExtrait: mention.numeroOrdreExtrait,
    textes: {
      texteMentionDelivrance: mention.textes.texteMentionDelivrance
    },
    typeMention: {
      nature: {
        id: NatureMention.getUuidFromNature(mention.typeMention.nature)
      }
    },
    id: mention.id
  };
}

export function mappingVersMentionsApi(
  mentionsApi: IMention[],
  mentionsAffichage: IMentionAffichage[],
  typeDocument: string
) {
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
        texteMentionDelivrance: mR.textes.texteMentionDelivrance
      },
      typeMention: {
        nature: {
          id: NatureMention.getUuidFromNature(mR.typeMention.nature)
        }
      },
      id: mR.id
    };
    if (mention) {
      mentionAAjouter.textes.texteMentionDelivrance = mention.texte;
      mentionAAjouter.typeMention.nature.id = NatureMention.getUuidFromNature(
        mention.nature
      );
      mentionsAEnvoyer.push(mentionAAjouter);
      if (!mention.estPresent) {
        mentionsRetirees.push(mention.id);
      }
    } else {
      mentionsAEnvoyer.push(mentionAAjouter);
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
  index: number
) {
  // Sélection de la mention
  if (mentionSelect?.numeroOrdre === index + 1) {
    setMentionSelect(undefined);
  } else {
    const mention = mentions?.[index];
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
        setMentions
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

  const messageControleMention = controleMentions(mentions, acte, document);

  if (
    estDocumentCopieIntegrale &&
    modificationEffectue(mentions, mentionsApi, document)
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
    aucuneMentionsNationalite(mentions)
  ) {
    message = `Aucune mention de nationalité n'a été cochée.\n\n`;
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
    message += `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter.\n\n`;
  }
  if (message) {
    message += `Voulez-vous continuer ?`;
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
