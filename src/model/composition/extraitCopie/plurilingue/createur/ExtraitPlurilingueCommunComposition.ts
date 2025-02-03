import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { AnalyseMarginale } from "@model/etatcivil/acte/IAnalyseMarginale";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { ITitulaireActe, TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { SCEAU_MINISTERE } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import DateUtils from "@util/DateUtils";
import { DEUX, TROIS, UN, getPremiereLettreDunMot } from "@util/Utils";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";

export interface IMentionsExtraitPlurilingue {
  enonciations: string[];
  nombre_enonciations: number;
}

export const NOMBRE_MAX_MENTIONS = 9;
export const ETAT = "France";
export const ETAT_CIVIL = "Service Central d'Etat Civil";
export const REGEX = /(.*)\s(désormais|né|née)\s(.*)/gm;
export const DESORMAIS = "désormais";
export const NE = "né";
export const NEE = "née";
export class ExtraitPlurilingueCommunComposition {
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
    composition.date_acte = Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement);

    composition.date_delivrance = DateUtils.getDateComposeFromDate(new Date());

    composition.autres_enonciations_acte = ExtraitPlurilingueCommunComposition.mappingMentionsExtraitPlurilingue(
      ExtraitPlurilingueCommunComposition.getMentionsAAfficher(mentionsRetirees, acte.mentions)
    );

    composition.filigrane_erreur = FicheActe.estEnErreur(acte) || this.nombreMentionsMax(acte, mentionsRetirees);
    composition.filigrane_incomplet = FicheActe.estIncomplet(acte);
    ExtraitPlurilingueCommunComposition.ajouteCTV(sousTypeRequete, composition, ctv);
    composition.pas_de_bloc_signature = ExtraitPlurilingueCommunComposition.pasDeBlocSignature(validation);
    composition.sceau_ministere = ParametreBaseRequete.depuisCle(SCEAU_MINISTERE)?.libelle ?? "";
  }

  public static composerTitulairePlurilingue(compositionTitulaire: ITitulaireComposition, acte: IFicheActe, titulaire: ITitulaireActe) {
    compositionTitulaire.nom = this.getNomOuVide(acte, titulaire);
    compositionTitulaire.prenoms = this.getPrenomOuVide(acte, titulaire);
    compositionTitulaire.sexe = getPremiereLettreDunMot(ExtraitPlurilingueCommunComposition.getSexeOuVideOuTiret(titulaire));
    compositionTitulaire.nom_pere = this.getNomOuVideFiliation(TitulaireActe.getParentDirectMasculin(titulaire));
    compositionTitulaire.prenoms_pere = this.getPrenomOuVideFiliation(TitulaireActe.getParentDirectMasculin(titulaire));
    compositionTitulaire.nom_mere = this.getNomOuVideFiliation(TitulaireActe.getParentDirectFeminin(titulaire));
    compositionTitulaire.prenoms_mere = this.getPrenomOuVideFiliation(TitulaireActe.getParentDirectFeminin(titulaire));
  }

  public static pasDeBlocSignature(validation: Validation): boolean {
    if (validation === Validation.E) {
      return true;
    } else {
      return false;
    }
  }

  public static mappingMentionsExtraitPlurilingue(mentions?: IMention[]): IMentionsExtraitPlurilingue {
    let i = 0;
    const mentionExtraitPlurilingue: IMentionsExtraitPlurilingue = {
      enonciations: [],
      nombre_enonciations: 0
    };

    if (mentions?.length) {
      for (i; i < mentions.length; i++) {
        if (mentionExtraitPlurilingue.nombre_enonciations === NOMBRE_MAX_MENTIONS) {
          break;
        }

        const textMention = mentions[i].textes.texteMentionPlurilingue;
        mentionExtraitPlurilingue.enonciations.push(textMention ?? "");
        mentionExtraitPlurilingue.nombre_enonciations = i + 1;
      }
    } else {
      mentionExtraitPlurilingue.enonciations.push("--");
      mentionExtraitPlurilingue.nombre_enonciations = 0;
    }

    return mentionExtraitPlurilingue;
  }

  public static getMentionsAAfficher(idMentionsRetirees: string[], mentions: IMention[] | undefined): IMention[] {
    let mentionsFiltrees = Mention.filtreAvecTexteMentionPlurilingue(mentions);

    mentionsFiltrees = mentionsFiltrees
      .filter(mention => {
        return !idMentionsRetirees.some(idMentionRetiree => idMentionRetiree === mention.id);
      })
      .sort((mention1, mentions2) => mention1.numeroOrdreExtrait - mentions2.numeroOrdreExtrait);

    return mentionsFiltrees;
  }

  public static ajouteCTV(sousTypeRequete: SousTypeDelivrance, composition: IExtraitPlurilingueComposition, ctv?: string) {
    if (SousTypeDelivrance.estRDD(sousTypeRequete)) {
      composition.code_CTV = ctv ?? "";
    }
  }

  public static nombreMentionsMax(acte: IFicheActe, idMentionsRetirees: string[]): boolean {
    return this.getMentionsAAfficher(idMentionsRetirees, acte.mentions).length > NOMBRE_MAX_MENTIONS;
  }

  public static getNomDerniereAnalyseMarginale(acte: IFicheActe, titulaire: ITitulaireActe): string | undefined {
    const titulaires = FicheActe.getAnalyseMarginaleLaPlusRecente(acte)?.titulaires;

    return titulaires?.find(titulaireAnalyseMarginale => {
      return titulaireAnalyseMarginale.ordre === titulaire.ordre;
    })?.nom;
  }

  public static getPrenomOuVide(acte: IFicheActe, titulaire: ITitulaireActe): string {
    let prenom = "";
    const titulaireAM = this.getTitulaireAM(acte, titulaire);

    if (titulaireAM) {
      if (TitulaireActe.prenomAbsentOuNomEgalSPC(titulaireAM)) {
        prenom = "";
      } else {
        prenom = TitulaireActe.getPrenomsSeparerPar(titulaireAM);
      }
    }
    return prenom;
  }

  public static getNomOuVide(acte: IFicheActe, titulaire: ITitulaireActe): string {
    const titulaireAM = this.getTitulaireAM(acte, titulaire);

    if (titulaireAM) {
      if (TitulaireActe.nomAbsentOuNomEgalSNP(titulaireAM)) {
        return "";
      } else {
        return this.getNom(titulaireAM.nom);
      }
    } else {
      return "";
    }
  }

  public static getTitulaireAM(acte: IFicheActe, titulaire: ITitulaireActe): ITitulaireActe | undefined {
    const titulairesAnalyseMarginale = AnalyseMarginale.getTitulairesAM(acte.analyseMarginales);

    return this.getTitulaireParOrdre(titulairesAnalyseMarginale, titulaire.ordre);
  }

  public static getTitulaireParOrdre(titulaires: ITitulaireActe[] | undefined, ordre: number): ITitulaireActe | undefined {
    return titulaires?.find(titulaire => {
      return titulaire.ordre === ordre;
    });
  }

  public static getNom(nomTitulaire?: string): string {
    let nom = "";

    if (nomTitulaire) {
      const matches = new RegExp(REGEX).exec(nomTitulaire);
      if (matches) {
        nom = this.formatSansDesormaisOuNeOuNee(matches);
      } else {
        nom = nomTitulaire;
      }
    }

    return nom;
  }

  public static formatSansDesormaisOuNeOuNee(matches: string[]): string {
    if (matches[DEUX] === DESORMAIS) {
      return matches[TROIS];
    } else {
      return matches[UN];
    }
  }

  public static getSexeOuVideOuTiret(titulaire?: ITitulaireActe): string {
    let sexe = "";
    if (titulaire?.sexe) {
      if (titulaire.sexe === Sexe.FEMININ || titulaire.sexe === Sexe.MASCULIN) {
        sexe = titulaire.sexe.libelle;
      } else {
        sexe = "-";
      }
    }

    return sexe;
  }

  public static getNomOuVideFiliation(filiation?: IFiliation): string {
    let nom = "";
    if (filiation) {
      if (TitulaireActe.nomAbsentOuNomEgalSNP(filiation)) {
        nom = "";
      } else {
        nom = this.getNom(filiation.nom);
      }
    }

    return nom;
  }

  public static getPrenomOuVideFiliation(filiation?: IFiliation): string {
    let prenom = "";
    if (filiation) {
      if (TitulaireActe.prenomAbsentOuNomEgalSPC(filiation)) {
        prenom = "";
      } else {
        prenom = TitulaireActe.getPrenomsSeparerPar(filiation);
      }
    }
    return prenom;
  }
}
