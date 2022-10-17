import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { Validation } from "@model/requete/enum/Validation";
import { getValeurOuVide } from "@util/Utils";

export interface IMentionsExtraitPlurilingue {
  enonciations: string[];
  nombre_enonciations: number;
}

export const NOMBRE_MAX_MENTIONS = 6;
export const FONCTION_AGENT = "L'officier de l'état civil";
export const ETAT = "France";
export const ETAT_CIVIL = "Service Central d'Etat Civil";
export class ExtraitPlurilingueCommunComposition {
  public static pasDeBlocSignature(validation: Validation): boolean {
    if (validation === Validation.E) {
      return true;
    } else {
      return false;
    }
  }

  public static mappingMentionsExtraitPlurilingue(
    mentions?: IMention[]
  ): IMentionsExtraitPlurilingue {
    let i = 0;
    const mentionExtraitPlurilingue: IMentionsExtraitPlurilingue = {
      enonciations: [],
      nombre_enonciations: 0
    };

    if (mentions?.length && mentions.length <= NOMBRE_MAX_MENTIONS) {
      for (i; i < mentions.length; i++) {
        const textMention = mentions[i].textes.texteMentionPlurilingue;
        mentionExtraitPlurilingue.enonciations.push(
          getValeurOuVide(textMention)
        );
        mentionExtraitPlurilingue.nombre_enonciations = i + 1;
      }
    } else {
      mentionExtraitPlurilingue.enonciations.push("--");
      mentionExtraitPlurilingue.nombre_enonciations = 0;
    }

    return mentionExtraitPlurilingue;
  }

  public static getMentionsAAfficher(
    idMentionsRetirees: string[],
    mentions: IMention[]
  ): IMention[] {
    let mentionsFiltrees = Mention.filtreAvecTexteMentionPlurilingue(mentions);

    mentionsFiltrees = mentionsFiltrees.filter(mention => {
      return !idMentionsRetirees.some(
        idMentionRetiree => idMentionRetiree === mention.id
      );
    });

    return mentionsFiltrees;
  }

  public static getNomDerniereAnalyseMarginale(
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): string | undefined {
    const titulaires =
      FicheActe.getAnalyseMarginaleLaPlusRecente(acte)?.titulaires;

    return titulaires?.find(titulaireAnalyseMarginale => {
      return titulaireAnalyseMarginale.ordre === titulaire.ordre;
    })?.nom;
  }
}
