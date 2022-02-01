import { ExtraitCopieActeTexteMariageComposition } from "../../../../../../model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { IExtraitCopieComposition } from "../../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../../../model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "../../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../../model/requete/enum/Validation";

export const creationCompositionExtraitCopieActeTexte = function (
  acteComplet: IFicheActe,
  choixDelivrance: ChoixDelivrance,
  sousTypeRequete: SousTypeDelivrance,
  validation: Validation
) {
  let composition;
  if (acteComplet.nature === NatureActe.MARIAGE) {
    composition = ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexte(
      acteComplet,
      choixDelivrance,
      sousTypeRequete,
      validation,
      ChoixDelivrance.estChoixDelivranceAvecFiliation(choixDelivrance),
      ChoixDelivrance.estChoixDelivranceCopie(choixDelivrance),
      ChoixDelivrance.estChoixDelivranceCopieArchive(choixDelivrance)
    );
  } else if (acteComplet.nature === NatureActe.DECES) {
    /* istanbul ignore next */
    // TODO ExtraitCopieActeTexteDecesComposition.creerExtraitCopieActeTexte
    composition = {
      nature_acte: "DECES",
      type_document: "EXTRAIT"
    } as IExtraitCopieComposition;
  } else if (acteComplet.nature === NatureActe.NAISSANCE) {
    /* istanbul ignore next */
    // TODO ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexte
    composition = {
      nature_acte: "NAISSANCE",
      type_document: "EXTRAIT"
    } as IExtraitCopieComposition;
  } else {
    /* istanbul ignore next */
    // TODO
    composition = {
      nature_acte: "TODO",
      type_document: "EXTRAIT"
    } as IExtraitCopieComposition;
  }

  return composition;
};
