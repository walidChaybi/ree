import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SCEAU_MINISTERE } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { getDateComposeFromDate } from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";

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

  public static ajouteCTV(
    sousTypeRequete: SousTypeDelivrance,
    composition: IExtraitPlurilingueComposition,
    ctv?: string
  ) {
    if (SousTypeDelivrance.estRDD(sousTypeRequete)) {
      composition.code_CTV = ctv ? ctv : "";
    }
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

  public static composerPlurilingue(
    composition: IExtraitPlurilingueComposition,
    acte: IFicheActe,
    validation: Validation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ) {
    composition.nature_acte = NatureActe.getKey(acte.nature);
    composition.etat = ETAT;
    composition.service_etat_civil = ETAT_CIVIL;
    composition.reference_acte = FicheActe.getReference(acte);
    composition.date_acte =
      Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement);

    composition.date_delivrance = getDateComposeFromDate(new Date());

    composition.autres_enonciations_acte =
      ExtraitPlurilingueCommunComposition.mappingMentionsExtraitPlurilingue(
        ExtraitPlurilingueCommunComposition.getMentionsAAfficher(
          mentionsRetirees,
          acte.mentions
        )
      );

    composition.fonction_agent = FONCTION_AGENT;
    composition.filigrane_erreur = FicheActe.estEnErreur(acte);
    composition.filigrane_incomplet = FicheActe.estIncomplet(acte);
    ExtraitPlurilingueCommunComposition.ajouteCTV(
      sousTypeRequete,
      composition,
      ctv
    );
    composition.pas_de_bloc_signature =
      ExtraitPlurilingueCommunComposition.pasDeBlocSignature(validation);
    composition.sceau_ministere =
      ParametreBaseRequete.getEnumFor(SCEAU_MINISTERE)?.libelle;
  }
}
