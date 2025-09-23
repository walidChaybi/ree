import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { Filiation } from "@model/etatcivil/acte/Filiation";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { TitulaireAnalyseMarginale } from "@model/etatcivil/acte/TitulaireAnalyseMarginale";
import { Mention } from "@model/etatcivil/acte/mention/Mention";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { SCEAU_MINISTERE } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import DateUtils from "@util/DateUtils";
import { DEUX, SNP, SPC, triListeObjetsSurPropriete, TROIS, UN } from "@util/Utils";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";

export interface IMentionsExtraitPlurilingue {
  enonciations: string[];
  nombre_enonciations: number;
}

const NOMBRE_MAX_MENTIONS = 9;
const ETAT = "France";
const ETAT_CIVIL = "Service Central d'Etat Civil";
const REGEX = /^(.*)\s(désormais|né|née)\s(.*)$/gm;
const DESORMAIS = "désormais";
export class ExtraitPlurilingueCommunComposition {
  public static composerPlurilingue(
    composition: IExtraitPlurilingueComposition,
    acte: FicheActe,
    validation: EValidation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ) {
    composition.nature_acte = acte.nature;
    composition.etat = ETAT;
    composition.service_etat_civil = ETAT_CIVIL;
    composition.reference_acte = acte.referenceActe;
    composition.date_acte = Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement ?? undefined);

    composition.date_delivrance = DateUtils.getDateComposeFromDate(new Date());

    composition.autres_enonciations_acte = ExtraitPlurilingueCommunComposition.mappingMentionsExtraitPlurilingue(
      ExtraitPlurilingueCommunComposition.getMentionsAAfficher(mentionsRetirees, acte.mentions)
    );

    composition.filigrane_erreur = acte.estEnErreur() || this.nombreMentionsMax(acte, mentionsRetirees);
    composition.filigrane_incomplet = acte.estIncomplet();
    ExtraitPlurilingueCommunComposition.ajouteCTV(sousTypeRequete, composition, ctv);
    composition.pas_de_bloc_signature = ExtraitPlurilingueCommunComposition.pasDeBlocSignature(validation);
    composition.sceau_ministere = ParametreBaseRequete.depuisCle(SCEAU_MINISTERE)?.libelle ?? "";
  }

  public static composerTitulairePlurilingue(compositionTitulaire: ITitulaireComposition, acte: FicheActe, titulaire: TitulaireActe) {
    const parentDirectMasculin = titulaire.filiations.find(
      filiation => filiation.lienParente === "PARENT" && filiation.sexe === "MASCULIN"
    );
    const parentDirectFeminin = titulaire.filiations.find(filiation => filiation.lienParente === "PARENT" && filiation.sexe === "FEMININ");

    compositionTitulaire.nom = this.getNomOuVide(acte, titulaire);
    compositionTitulaire.prenoms = this.getPrenomOuVide(acte, titulaire);
    compositionTitulaire.sexe = ExtraitPlurilingueCommunComposition.getSexeOuVideOuTiret(titulaire)[0];
    compositionTitulaire.nom_pere = this.getNomOuVideFiliation(parentDirectMasculin);
    compositionTitulaire.prenoms_pere = this.getPrenomOuVideFiliation(parentDirectMasculin);
    compositionTitulaire.nom_mere = this.getNomOuVideFiliation(parentDirectFeminin);
    compositionTitulaire.prenoms_mere = this.getPrenomOuVideFiliation(parentDirectFeminin);
  }

  public static pasDeBlocSignature(validation: EValidation): boolean {
    if (validation === EValidation.E) {
      return true;
    } else {
      return false;
    }
  }

  public static mappingMentionsExtraitPlurilingue(mentions?: Mention[]): IMentionsExtraitPlurilingue {
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

  public static getMentionsAAfficher(idMentionsRetirees: string[], mentions: Mention[] | undefined): Mention[] {
    if (!mentions) return [];

    return triListeObjetsSurPropriete(
      mentions.filter(
        mention => mention.textes?.texteMentionPlurilingue && !idMentionsRetirees.some(idMentionRetiree => idMentionRetiree === mention.id)
      ),
      "numeroOrdreExtrait"
    );
  }

  public static ajouteCTV(sousTypeRequete: SousTypeDelivrance, composition: IExtraitPlurilingueComposition, ctv?: string) {
    if (SousTypeDelivrance.estRDD(sousTypeRequete)) {
      composition.code_CTV = ctv ?? "";
    }
  }

  public static nombreMentionsMax(acte: FicheActe, idMentionsRetirees: string[]): boolean {
    return this.getMentionsAAfficher(idMentionsRetirees, acte.mentions).length > NOMBRE_MAX_MENTIONS;
  }

  public static getPrenomOuVide(acte: FicheActe, titulaire: TitulaireActe): string {
    const titulaireAM = this.getTitulaireAM(acte, titulaire);

    if (!titulaireAM?.prenoms.length || titulaireAM.prenoms[0] === SPC) return "";

    return titulaireAM.prenoms.join(", ");
  }

  public static getNomOuVide(acte: FicheActe, titulaire: TitulaireActe): string {
    const titulaireAM = this.getTitulaireAM(acte, titulaire);

    if (!titulaireAM?.nom || titulaireAM?.nom === SNP) return "";

    return this.getNom(titulaireAM.nom);
  }

  static getTitulaireAM(acte: FicheActe, titulaireActe: TitulaireActe): TitulaireAnalyseMarginale | undefined {
    return acte.getAnalyseMarginaleLaPlusRecente()?.titulaires?.find(titulaireAM => titulaireAM.ordre === titulaireActe.ordre);
  }

  public static getNom(nomTitulaire: string | null): string {
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

  public static getSexeOuVideOuTiret(titulaire?: TitulaireActe): string {
    switch (titulaire?.sexe) {
      case "MASCULIN":
      case "FEMININ":
        return ESexe[titulaire.sexe];

      case "INDETERMINE":
      case "INCONNU":
        return "-";
      default:
        return "";
    }
  }

  public static getNomOuVideFiliation(filiation?: Filiation): string {
    if (!filiation?.nom || filiation.nom === SNP) return "";

    return this.getNom(filiation.nom);
  }

  public static getPrenomOuVideFiliation(filiation?: Filiation): string {
    if (!filiation?.prenoms.length || filiation.prenoms[0] === SPC) return "";

    return filiation.prenoms.join(", ");
  }
}
