import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { FicheActe } from "../../../../etatcivil/acte/FicheActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import { ExtraitPlurilingueCommunComposition } from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueDecesComposition {
  public static compositionExtraitPlurilingueDeDeces(
    acte: FicheActe,
    validation: EValidation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    ExtraitPlurilingueCommunComposition.composerPlurilingue(composition, acte, validation, sousTypeRequete, mentionsRetirees, ctv);

    composition.titulaire_1 = this.mappingTitulaireExtraitPlurilingueDecesComposition(acte, acte.titulaires[0]);

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueDecesComposition(acte: FicheActe, titulaire: TitulaireActe): ITitulaireComposition {
    const compositionTitulaire = {} as ITitulaireComposition;

    ExtraitPlurilingueCommunComposition.composerTitulairePlurilingue(compositionTitulaire, acte, titulaire);

    compositionTitulaire.date_naissance = Evenement.formatageDateCompositionExtraitPlurilingue(titulaire.naissance ?? undefined);
    compositionTitulaire.lieu_naissance = titulaire.getLieuDeRepriseOuLieuNaissance(LieuxUtils.estPaysInconnu(titulaire.naissance?.pays));
    compositionTitulaire.nom_dernier_conjoint = titulaire.nomDernierConjoint ?? "";
    compositionTitulaire.prenoms_dernier_conjoint = titulaire.prenomsDernierConjoint ?? "";
    compositionTitulaire.date_deces = Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement ?? undefined);
    compositionTitulaire.lieu_deces = Evenement.getLieuDeRepriseOuLieuEvenement(acte.evenement ?? undefined);

    return compositionTitulaire;
  }
}
