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

export class ExtraitPlurilingueNaissanceComposition {
  public static compositionExtraitPlurilingueDeNaissance(
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
      this.mappingTitulaireExtraitPlurilingueNaissanceComposition(
        acte,
        FicheActe.getTitulairesActeDansLOrdre(acte).titulaireActe1
      );

    return composition;
  }

  public static mappingTitulaireExtraitPlurilingueNaissanceComposition(
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): ITitulaireComposition {
    return {
      nom: ExtraitPlurilingueCommunComposition.getNomOuVide(acte, titulaire),
      prenoms: ExtraitPlurilingueCommunComposition.getPrenomOuVide(
        acte,
        titulaire
      ),
      sexe: ExtraitPlurilingueCommunComposition.getSexeOuVideOuTiret(
        titulaire
      )[0],
      date_naissance: Evenement.formatageDateCompositionExtraitPlurilingue(
        titulaire.naissance
      ),
      lieu_naissance: Evenement.getLieuDeRepriseOuLieuEvenement(acte.evenement),
      nom_pere: ExtraitPlurilingueCommunComposition.getNomOuVideFiliation(
        TitulaireActe.getParentDirectMasculin(titulaire)
      ),
      prenom_pere: ExtraitPlurilingueCommunComposition.getPrenomOuVideFiliation(
        TitulaireActe.getParentDirectMasculin(titulaire)
      ),
      nom_mere: ExtraitPlurilingueCommunComposition.getNomOuVideFiliation(
        TitulaireActe.getParentDirectFeminin(titulaire)
      ),
      prenom_mere: ExtraitPlurilingueCommunComposition.getPrenomOuVideFiliation(
        TitulaireActe.getParentDirectFeminin(titulaire)
      )
    };
  }

  public static getPrenom(titulaire?: ITitulaireActe) {
    return getValeurOuVide(TitulaireActe.getPrenoms(titulaire));
  }
}
