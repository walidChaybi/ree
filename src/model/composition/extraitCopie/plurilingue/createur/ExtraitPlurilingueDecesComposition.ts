import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { getValeurOuVide } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { FicheActe, IFicheActe } from "../../../../etatcivil/acte/IFicheActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import { ExtraitPlurilingueCommunComposition } from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueDecesComposition {
  public static compositionExtraitPlurilingueDeDeces(
    acte: IFicheActe,
    validation: Validation,
    sousTypeRequete: SousTypeDelivrance,
    mentionsRetirees: string[],
    ctv?: string
  ): IExtraitPlurilingueComposition {
    const composition = {} as IExtraitPlurilingueComposition;

    ExtraitPlurilingueCommunComposition.composerPlurilingue(
      composition,
      acte,
      validation,
      sousTypeRequete,
      mentionsRetirees,
      ctv
    );

    composition.titulaire_1 =
      this.mappingTitulaireExtraitPlurilingueDecesComposition(
        acte,
        FicheActe.getTitulairesActeDansLOrdre(acte).titulaireActe1
      );

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueDecesComposition(
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): ITitulaireComposition {
    const compositionTitulaire = {} as ITitulaireComposition;

    ExtraitPlurilingueCommunComposition.composerTitulairePlurilingue(
      compositionTitulaire,
      acte,
      titulaire
    );

    compositionTitulaire.date_naissance =
      Evenement.formatageDateCompositionExtraitPlurilingue(titulaire.naissance);
    compositionTitulaire.lieu_naissance =
      TitulaireActe.getLieuDeRepriseOuLieuNaissance(
        titulaire,
        LieuxUtils.estPaysInconnu(titulaire.naissance?.pays)
      );
    compositionTitulaire.nom_dernier_conjoint = getValeurOuVide(
      titulaire.nomDernierConjoint
    );
    compositionTitulaire.prenoms_dernier_conjoint = getValeurOuVide(
      titulaire.prenomsDernierConjoint
    );
    compositionTitulaire.date_deces =
      Evenement.formatageDateCompositionExtraitPlurilingue(acte.evenement);
    compositionTitulaire.lieu_deces = Evenement.getLieuDeRepriseOuLieuEvenement(
      acte.evenement
    );

    return compositionTitulaire;
  }
}
