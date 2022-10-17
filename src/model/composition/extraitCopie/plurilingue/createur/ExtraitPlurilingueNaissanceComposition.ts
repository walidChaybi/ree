import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { SCEAU_MINISTERE } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { Validation } from "@model/requete/enum/Validation";
import { getDateComposeFromDate } from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";
import { FicheActe, IFicheActe } from "../../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../etatcivil/enum/NatureActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import {
  ETAT,
  ETAT_CIVIL,
  ExtraitPlurilingueCommunComposition,
  FONCTION_AGENT
} from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueNaissanceComposition {
  public static compositionExtraitPlurilingueDeNaissance(
    acte: IFicheActe,
    validation: Validation,
    mentionsRetirees: string[]
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    composition.nature_acte = NatureActe.getKey(acte.nature);
    composition.etat = ETAT;
    composition.service_etat_civil = ETAT_CIVIL;
    composition.reference_acte = FicheActe.getReference(acte);
    composition.date_acte =
      Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement);

    composition.titulaire_1 =
      this.mappingTitulaireExtraitPlurilingueNaissanceComposition(
        acte,
        FicheActe.getTitulairesActeDansLOrdre(acte).titulaireActe1
      );

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
    composition.code_CTV = "52976 - 36UTD"; //TODO
    composition.pas_de_bloc_signature =
      ExtraitPlurilingueCommunComposition.pasDeBlocSignature(validation);
    composition.sceau_ministere =
      ParametreBaseRequete.getEnumFor(SCEAU_MINISTERE)?.libelle;

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueNaissanceComposition(
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): ITitulaireComposition {
    return {
      nom: ExtraitPlurilingueCommunComposition.getNomDerniereAnalyseMarginale(
        acte,
        titulaire
      ),
      prenoms: TitulaireActe.getPrenoms(titulaire),
      sexe: TitulaireActe.getSexeOuVide(titulaire)[0],
      date_naissance: Evenement.formatageDateCompositionExtraitPlurilingue(
        titulaire.naissance
      ),
      lieu_naissance: TitulaireActe.getLieuDeRepriseOuLieuNaissance(titulaire),
      nom_pere: getValeurOuVide(
        TitulaireActe.getParentDirectMasculin(titulaire)?.nom
      ),
      prenom_pere: this.getPrenom(
        TitulaireActe.getParentDirectMasculin(titulaire)
      ),
      nom_mere: getValeurOuVide(
        TitulaireActe.getParentDirectFeminin(titulaire)?.nom
      ),
      prenom_mere: this.getPrenom(
        TitulaireActe.getParentDirectFeminin(titulaire)
      )
    };
  }

  public static getPrenom(titulaire?: ITitulaireActe) {
    return getValeurOuVide(TitulaireActe.getPrenoms(titulaire));
  }
}
