import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { Evenement } from "@model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { getValeurOuVide } from "@util/Utils";
import { FicheActe, IFicheActe } from "../../../../etatcivil/acte/IFicheActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";
import { ExtraitPlurilingueCommunComposition } from "./ExtraitPlurilingueCommunComposition";

export class ExtraitPlurilingueMariageComposition {
  public static compositionExtraitPlurilingueDeMariage(
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

    composition.lieu_acte = Evenement.getLieu(acte.evenement);

    composition.titulaire_1 =
      this.mappingTitulaireExtraitPlurilingueMariageComposition(
        acte,
        FicheActe.getTitulaireMasculinOuAutre(acte)
      );

    composition.titulaire_2 =
      this.mappingTitulaireExtraitPlurilingueMariageComposition(
        acte,
        FicheActe.getTitulaireFemininOuAutre(acte)
      );

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueMariageComposition(
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): ITitulaireComposition {
    return {
      nom_avant_mariage: getValeurOuVide(
        ExtraitPlurilingueCommunComposition.getNomDerniereAnalyseMarginale(
          acte,
          titulaire
        )
      ),
      nom_apres_mariage: getValeurOuVide(titulaire.nomApresMariage),
      prenoms: TitulaireActe.getPrenoms(titulaire),
      date_naissance: Evenement.formatageDateCompositionExtraitPlurilingue(
        titulaire.naissance
      ),
      lieu_naissance: TitulaireActe.getLieuNaissance(titulaire)
    };
  }
}
