import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { FicheActe } from "../../../../etatcivil/acte/FicheActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import { ExtraitPlurilingueCommunComposition } from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueMariageComposition {
  public static compositionExtraitPlurilingueDeMariage(
    acte: FicheActe,
    validation: EValidation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    ExtraitPlurilingueCommunComposition.composerPlurilingue(composition, acte, validation, sousTypeRequete, mentionsRetirees, ctv);

    composition.lieu_acte = Evenement.getLieuDeRepriseOuLieuEvenement(acte.evenement ?? undefined);

    composition.titulaire_1 = this.mappingTitulaireExtraitPlurilingueMariageComposition(
      acte,
      acte.titulaires.find(titulaire => titulaire.sexe === "MASCULIN")
    );

    composition.titulaire_2 = this.mappingTitulaireExtraitPlurilingueMariageComposition(
      acte,
      acte.titulaires.find(titulaire => titulaire.sexe === "FEMININ")
    );

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueMariageComposition(
    acte: FicheActe,
    titulaire: TitulaireActe | undefined
  ): ITitulaireComposition | undefined {
    if (titulaire) {
      return {
        nom_avant_mariage: ExtraitPlurilingueCommunComposition.getNomOuVide(acte, titulaire),
        nom_apres_mariage: titulaire.nomApresMariage ?? "",
        prenoms: ExtraitPlurilingueCommunComposition.getPrenomOuVide(acte, titulaire),
        date_naissance: Evenement.formatageDateCompositionExtraitPlurilingue(titulaire.naissance ?? undefined),
        lieu_naissance: titulaire.getLieuDeRepriseOuLieuNaissance(LieuxUtils.estPaysInconnu(titulaire.naissance?.pays))
      };
    }
  }
}
