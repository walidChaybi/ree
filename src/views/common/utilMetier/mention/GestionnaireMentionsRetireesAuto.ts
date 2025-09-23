import { Mention } from "@model/etatcivil/acte/mention/Mention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  ANNULATION_EVENEMENT,
  ANNULATION_MARIAGE,
  ANNULATION_MENTION,
  ANNULATION_PACS,
  CODE_RC,
  CODE_RC_RADIE,
  DISSOLUTION_PACS,
  DIVORCE,
  EXTRANEITE,
  MARIAGE,
  MODIFICATION_PACS,
  NATIONALITE,
  PACS,
  REPRISE_VIE_COMMUNE,
  SEPARATION_CORPS,
  natureRetireesMariageAvecFilliation,
  natureRetireesMariagePlurilingue,
  natureRetireesMariageSansFilliation,
  natureRetireesNaissanceAvecFillation,
  natureRetireesNaissancePlurilingue,
  natureRetireesNaissanceSansFillation
} from "@model/etatcivil/enum/NatureMention";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DEUX, triListeObjetsSurPropriete } from "@util/Utils";

type IMentionAvecRetiree = Mention & { retiree?: boolean };

class GestionnaireMentionsRetireesAuto {
  public getIdsMentionsRetirees(
    mentions: IMentionAvecRetiree[],
    choixDelivrance?: ChoixDelivrance,
    natureActe?: keyof typeof ENatureActe
  ): string[] {
    const mentionsTriees = mentions.every(mention => mention.numeroOrdreExtrait !== null)
      ? triListeObjetsSurPropriete(mentions, "numeroOrdreExtrait")
      : triListeObjetsSurPropriete(mentions, "numeroOrdre");

    if (choixDelivrance && natureActe && !ChoixDelivrance.estCopieIntegrale(choixDelivrance)) {
      if (ChoixDelivrance.estAvecOuSansFiliation(choixDelivrance)) {
        switch (natureActe) {
          case "NAISSANCE":
            this.deselectionnerRadieParPaire(this.garderMentionsNonRetiree(mentionsTriees));
            this.deselectionnerAnnulationParPaire(this.garderMentionsNonRetiree(mentionsTriees));
            this.deselectionneSituationFamilialePassee(this.garderMentionsNonRetiree(mentionsTriees));

            this.deselectionneExtraneite(this.garderMentionsNonRetiree(mentionsTriees));
            break;
          case "MARIAGE":
            this.deselectionnerAnnulationParPaire(this.garderMentionsNonRetiree(mentionsTriees));
            break;
        }
      } else {
        this.deselectionnerAnnulationParPaire(mentionsTriees);
        if (natureActe === "NAISSANCE") {
          this.deselectionneSituationFamilialePassee(this.garderMentionsNonRetiree(mentionsTriees));
        }
      }
      this.deselectionneMentionsSpecifiques(this.garderMentionsNonRetiree(mentionsTriees), choixDelivrance, natureActe);
      this.deselectionneMentionsIncompatibleAvecActe(this.garderMentionsNonRetiree(mentionsTriees), natureActe);
    }

    return this.formaterMentionsRetirees(mentionsTriees);
  }

  public garderMentionsNonRetiree(mentions: IMentionAvecRetiree[]) {
    return mentions.filter(mention => !mention.retiree);
  }

  public formaterMentionsRetirees(mentions: IMentionAvecRetiree[]) {
    return mentions.filter(mention => mention.retiree).map(mention => mention.id);
  }

  public deselectionnerRadieParPaire(mentionsTriees: IMentionAvecRetiree[]) {
    let indexRCTrouve: number | undefined;
    let i = 0;
    while (i < mentionsTriees.length) {
      if (mentionsTriees[i].typeMention.natureMention?.code === CODE_RC) {
        if (indexRCTrouve) {
          break;
        }
        indexRCTrouve = i;
      }
      if (mentionsTriees[i].typeMention.natureMention?.code === CODE_RC_RADIE) {
        if (indexRCTrouve !== undefined) {
          mentionsTriees[i].retiree = true;
          mentionsTriees[indexRCTrouve].retiree = true;
        }
        indexRCTrouve = undefined;
      }
      i++;
    }
  }

  public deselectionnerAnnulationParPaire(mentionsTriees: IMentionAvecRetiree[]) {
    let index = 0;
    while (
      mentionsTriees[index + 1] &&
      (mentionsTriees[index + 1].typeMention.natureMention?.code === ANNULATION_EVENEMENT ||
        mentionsTriees[index + 1].typeMention.natureMention?.code === ANNULATION_MENTION)
    ) {
      mentionsTriees[index].retiree = true;
      mentionsTriees[index + 1].retiree = true;
      index += DEUX;
    }
  }

  public deselectionneMentionsSpecifiques(
    mentions: IMentionAvecRetiree[],
    choixDelivrance: ChoixDelivrance,
    natureActe: keyof typeof ENatureActe
  ) {
    let mentionsRetirees: string[] = [];
    switch (natureActe) {
      case "NAISSANCE":
        if (ChoixDelivrance.estAvecFiliation(choixDelivrance)) {
          mentionsRetirees = natureRetireesNaissanceAvecFillation;
        } else if (ChoixDelivrance.estSansFiliation(choixDelivrance)) {
          mentionsRetirees = natureRetireesNaissanceSansFillation;
        } else if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
          mentionsRetirees = natureRetireesNaissancePlurilingue;
        }
        break;
      case "MARIAGE":
        if (ChoixDelivrance.estAvecFiliation(choixDelivrance)) {
          mentionsRetirees = natureRetireesMariageAvecFilliation;
        } else if (ChoixDelivrance.estSansFiliation(choixDelivrance)) {
          mentionsRetirees = natureRetireesMariageSansFilliation;
        } else if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
          mentionsRetirees = natureRetireesMariagePlurilingue;
        }
        break;
    }
    mentions.forEach(mention => {
      if (mentionsRetirees.includes(mention.typeMention.natureMention?.code ?? "")) {
        mention.retiree = true;
      }
    });
  }

  public deselectionneMentionsIncompatibleAvecActe(mentions: IMentionAvecRetiree[], natureActe: keyof typeof ENatureActe) {
    mentions.forEach(mention => {
      if (mention.typeMention.natureActe !== natureActe && mention.typeMention.natureActe !== "INCONNUE") {
        mention.retiree = true;
      }
    });
  }

  public deselectionneExtraneite(mentions: IMentionAvecRetiree[]) {
    const indexExtraRecente = mentions.map(mention => mention.typeMention.natureMention?.code).lastIndexOf(EXTRANEITE);
    if (indexExtraRecente >= 0) {
      let index = 0;
      while (index < indexExtraRecente) {
        if (mentions[index].typeMention.natureMention?.code === EXTRANEITE) {
          mentions[index].retiree = true;
        }
        index++;
      }
      while (index < mentions.length) {
        if (mentions[index].typeMention.natureMention?.code === NATIONALITE) {
          mentions[indexExtraRecente].retiree = true;
        }
        index++;
      }
    }
  }

  private trouveDernierEvenementFamiliale(mentions: IMentionAvecRetiree[], mentionsContexte: string[]) {
    let lastIndex = -1;
    mentions.forEach((el, index) => {
      if (mentionsContexte.includes(el.typeMention.natureMention?.code ?? "")) {
        lastIndex = index;
      }
    });
    return lastIndex;
  }

  public deselectionneSituationFamilialePassee(mentions: IMentionAvecRetiree[]) {
    const mentionsContexte = [PACS, MODIFICATION_PACS, DISSOLUTION_PACS, MARIAGE, SEPARATION_CORPS, DIVORCE];

    const mentionsFiltrees = mentions.filter(mention => !mention.retiree);

    const indexDernierEvenementFamiliale = this.trouveDernierEvenementFamiliale(mentionsFiltrees, mentionsContexte);

    if (indexDernierEvenementFamiliale !== -1) {
      switch (mentions[indexDernierEvenementFamiliale].typeMention.natureMention?.code) {
        case DIVORCE:
          this.derniereMentionDivorce(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
        case PACS:
          this.derniereMentionPACS(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
        case DISSOLUTION_PACS:
          this.derniereMentionDissolutionPACS(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
        case MODIFICATION_PACS:
          this.derniereMentionModificationPACS(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
        case MARIAGE:
          this.derniereMentionMariage(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
        case SEPARATION_CORPS:
          this.derniereMentionSeparationCorps(mentionsFiltrees, indexDernierEvenementFamiliale, mentionsContexte);
          break;
      }
    }
  }

  private derniereMentionDivorce(mentions: IMentionAvecRetiree[], indexDernierEvenementFamiliale: number, mentionsContexte: string[]) {
    let index = indexDernierEvenementFamiliale - 1;
    let mariagePassee = false;
    while (index >= 0) {
      if (
        (mentions[index].typeMention.natureMention?.code !== MARIAGE || mariagePassee) &&
        mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")
      ) {
        mentions[index].retiree = true;
      }
      if (mentions[index].typeMention.natureMention?.code === MARIAGE) {
        mariagePassee = true;
      }
      index--;
    }
  }

  private derniereMentionDissolutionPACS(
    mentions: IMentionAvecRetiree[],
    indexDernierEvenementFamiliale: number,
    mentionsContexte: string[]
  ) {
    let index = indexDernierEvenementFamiliale - 1;
    let modificationPACSPassee = false;
    let PacsPasee = false;
    while (index >= 0) {
      if (
        (mentions[index].typeMention.natureMention?.code !== MODIFICATION_PACS || modificationPACSPassee || PacsPasee) &&
        (mentions[index].typeMention.natureMention?.code !== PACS || PacsPasee) &&
        mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")
      ) {
        mentions[index].retiree = true;
      }
      if (mentions[index].typeMention.natureMention?.code === MODIFICATION_PACS) {
        modificationPACSPassee = true;
      }
      if (mentions[index].typeMention.natureMention?.code === PACS) {
        PacsPasee = true;
      }
      index--;
    }
  }

  private derniereMentionModificationPACS(
    mentions: IMentionAvecRetiree[],
    indexDernierEvenementFamiliale: number,
    mentionsContexte: string[]
  ) {
    let index = indexDernierEvenementFamiliale - 1;
    let PacsPasee = false;
    while (index >= 0) {
      if (
        (mentions[index].typeMention.natureMention?.code !== PACS || PacsPasee) &&
        mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")
      ) {
        mentions[index].retiree = true;
      }
      if (mentions[index].typeMention.natureMention?.code === PACS) {
        PacsPasee = true;
      }
      index--;
    }
  }

  private derniereMentionPACS(mentions: IMentionAvecRetiree[], indexDernierEvenementFamiliale: number, mentionsContexte: string[]) {
    let index = indexDernierEvenementFamiliale;
    let trouve = false;
    while (index < mentions.length && !trouve) {
      if (mentions[index].typeMention.natureMention?.code === ANNULATION_PACS) {
        trouve = true;
      } else {
        index++;
      }
    }
    if (trouve) {
      mentions[index].retiree = true;
      mentions[indexDernierEvenementFamiliale].retiree = true;
      this.deselectionneSituationFamilialePassee(mentions);
    } else {
      index = indexDernierEvenementFamiliale - 1;
      while (index >= 0) {
        if (mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")) {
          mentions[index].retiree = true;
        }
        index--;
      }
    }
  }

  private derniereMentionMariage(mentions: IMentionAvecRetiree[], indexDernierEvenementFamiliale: number, mentionsContexte: string[]) {
    let index = indexDernierEvenementFamiliale;
    let trouve = false;
    while (index < mentions.length && !trouve) {
      if (mentions[index].typeMention.natureMention?.code === ANNULATION_MARIAGE) {
        trouve = true;
      } else {
        index++;
      }
    }
    if (trouve) {
      mentions[index].retiree = true;
      mentions[indexDernierEvenementFamiliale].retiree = true;
      this.deselectionneSituationFamilialePassee(mentions);
    } else {
      index = indexDernierEvenementFamiliale - 1;
      while (index >= 0) {
        if (mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")) {
          mentions[index].retiree = true;
        }
        index--;
      }
    }
  }

  private derniereMentionSeparationCorps(
    mentions: IMentionAvecRetiree[],
    indexDernierEvenementFamiliale: number,
    mentionsContexte: string[]
  ) {
    let index = indexDernierEvenementFamiliale;
    let trouve = false;
    while (index < mentions.length && !trouve) {
      if (mentions[index].typeMention.natureMention?.code === REPRISE_VIE_COMMUNE) {
        trouve = true;
      } else {
        index++;
      }
    }
    this.suiteSeparationCorps(trouve, mentions, index, indexDernierEvenementFamiliale, mentionsContexte);
  }

  private suiteSeparationCorps(
    trouve: boolean,
    mentions: IMentionAvecRetiree[],
    index: number,
    indexDernierEvenementFamiliale: number,
    mentionsContexte: string[]
  ) {
    if (trouve) {
      mentions[index].retiree = true;
      mentions[indexDernierEvenementFamiliale].retiree = true;
      this.deselectionneSituationFamilialePassee(mentions);
    } else {
      let mariagePassee = false;
      index = indexDernierEvenementFamiliale - 1;
      while (index >= 0) {
        if (
          (mentions[index].typeMention.natureMention?.code !== MARIAGE || mariagePassee) &&
          mentionsContexte.includes(mentions[index].typeMention.natureMention?.code ?? "")
        ) {
          mentions[index].retiree = true;
        }
        if (mentions[index].typeMention.natureMention?.code === MARIAGE) {
          mariagePassee = true;
        }
        index--;
      }
    }
    return index;
  }
}

export const gestionnaireMentionsRetireesAuto = new GestionnaireMentionsRetireesAuto();
