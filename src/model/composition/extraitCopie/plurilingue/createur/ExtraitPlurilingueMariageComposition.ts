import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { SCEAU_MINISTERE } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { Validation } from "@model/requete/enum/Validation";
import { getDateComposeFromDate, IDateCompose } from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { FicheActe, IFicheActe } from "../../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../etatcivil/enum/NatureActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";

export interface IMentionsExtraitPlurilingue {
  enonciations: string[];
  nombre_enonciations: number;
}

export const nombreMaxMentions = 6;

export class ExtraitPlurilingueMariageComposition {
  public static compositionExtraitPlurilingueDeMariage(
    acte: IFicheActe,
    validation: Validation,
    mentionsRetirees?: string[]
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    composition.nature_acte = NatureActe.getKey(acte.nature);
    composition.etat = "FRANCE";
    composition.service_etat_civil = "Service Central d'Etat Civil";
    composition.reference_acte = FicheActe.getReference(acte);
    composition.date_acte = this.formatageDateCompositionExtraitPlurilingue(
      acte.evenement
    );
    composition.lieu_acte = this.getLieu(acte.evenement);

    composition.titulaire_1 =
      this.mappingTitulaireExtraitPlurilingueMariageComposition(
        FicheActe.getTitulaireMasculinOuAutre(acte)
      );

    composition.titulaire_2 =
      this.mappingTitulaireExtraitPlurilingueMariageComposition(
        FicheActe.getTitulaireFemininOuAutre(acte)
      );

    composition.date_delivrance = getDateComposeFromDate(new Date());

    composition.autres_enonciations_acte =
      this.mappingMentionsExtraitPlurilingue(
        this.mentionAAfficher(mentionsRetirees, acte)
      );

    composition.fonction_agent = "L'officier de l'état civil";
    composition.filigrane_erreur =
      FicheActe.titulairesDeMemeSexe(acte) ||
      FicheActe.aGenreTitulaireIndetermine(acte);
    composition.filigrane_incomplet = FicheActe.estIncomplet(acte);
    composition.code_CTV = "52976 - 36UTD";
    composition.pas_de_bloc_signature = this.pasDeBlocSignature(validation);
    composition.sceau_ministere =
      ParametreBaseRequete.getEnumFor(SCEAU_MINISTERE)?.libelle;

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueMariageComposition(
    titulaire: ITitulaireActe
  ): ITitulaireComposition {
    return {
      nom_avant_mariage: getValeurOuVide(titulaire.nomAvantMariage),
      nom_apres_mariage: getValeurOuVide(titulaire.nomApresMariage),
      prenoms: TitulaireActe.getPrenoms(titulaire),
      date_naissance: this.formatageDateCompositionExtraitPlurilingue(
        titulaire.naissance
      ),
      lieu_naissance: TitulaireActe.getLieuNaissance(titulaire)
    };
  }

  public static pasDeBlocSignature(validation: Validation) {
    if (validation === Validation.E) {
      return true;
    } else {
      return false;
    }
  }

  public static mentionAAfficher(
    mentionsRetirees: string[] | undefined,
    acte: IFicheActe
  ) {
    if (mentionsRetirees) {
      return this.getMentionsAAfficher(acte.mentions, mentionsRetirees);
    } else {
      return acte.mentions;
    }
  }

  public static formatageDateCompositionExtraitPlurilingue(
    evenement?: IEvenement
  ): IDateCompose {
    return {
      jour: getValeurOuVide(evenement?.jour),
      mois: getValeurOuVide(evenement?.mois),
      annee: getValeurOuVide(evenement?.annee)
    };
  }

  public static mappingMentionsExtraitPlurilingue(mentions?: IMention[]) {
    let i = 0;
    const mentionExtraitPlurilingue: IMentionsExtraitPlurilingue = {
      enonciations: [],
      nombre_enonciations: 0
    };

    if (mentions?.length && mentions.length <= nombreMaxMentions) {
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

  public static getLieu(evenement?: IEvenement): string {
    return evenement
      ? LieuxUtils.getLieu(evenement.ville, evenement.region, evenement.pays)
      : "";
  }

  public static getMentionsAAfficher(
    mentions: IMention[],
    idMentionsRetirees: string[]
  ): IMention[] {
    let mentionsFiltrees = Mention.filtreAvecTexteMentionPlurilingue(mentions);

    mentionsFiltrees = mentionsFiltrees.filter(mention => {
      return !idMentionsRetirees.some(
        idMentionRetiree => idMentionRetiree === mention.id
      );
    });

    return mentionsFiltrees;
  }
}
