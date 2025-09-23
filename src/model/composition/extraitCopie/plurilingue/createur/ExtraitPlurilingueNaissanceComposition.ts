import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { FicheActe } from "../../../../etatcivil/acte/FicheActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import { ExtraitPlurilingueCommunComposition } from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueNaissanceComposition {
  public static compositionExtraitPlurilingueDeNaissance(
    acte: FicheActe,
    validation: EValidation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    ExtraitPlurilingueCommunComposition.composerPlurilingue(composition, acte, validation, sousTypeRequete, mentionsRetirees, ctv);

    composition.titulaire_1 = this.mappingTitulaireExtraitPlurilingueNaissanceComposition(acte, acte.titulaires[0]);

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueNaissanceComposition(acte: FicheActe, titulaire: TitulaireActe): ITitulaireComposition {
    const compositionTitulaire = {} as ITitulaireComposition;

    ExtraitPlurilingueCommunComposition.composerTitulairePlurilingue(compositionTitulaire, acte, titulaire);

    compositionTitulaire.date_naissance = Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement ?? undefined);
    compositionTitulaire.lieu_naissance = Evenement.getLieuDeRepriseOuLieuEvenement(acte.evenement ?? undefined);

    return compositionTitulaire;
  }
}
