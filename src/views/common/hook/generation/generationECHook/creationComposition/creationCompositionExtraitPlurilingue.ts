import { ITitulaireComposition } from "@model/composition/commun/ITitulaireComposition";
import { ExtraitPlurilingueMariageComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueMariageComposition";
import { IExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/IExtraitPlurilingueComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { Validation } from "@model/requete/enum/Validation";

export const creationCompositionExtraitPlurilingue = function (
  acteComplet: IFicheActe,
  validation: Validation,
  mentionsRetirees?: string[],
  choixDelivranceEC?: ChoixDelivrance
): IExtraitPlurilingueComposition {
  let composition = {} as IExtraitPlurilingueComposition;

  switch (acteComplet.nature) {
    case NatureActe.MARIAGE:
      composition =
        ExtraitPlurilingueMariageComposition.compositionExtraitPlurilingueDeMariage(
          acteComplet,
          validation,
          mentionsRetirees
        );
      break;
    case NatureActe.NAISSANCE:
      //TODO
      composition.nature_acte = NatureActe.getKey(acteComplet.nature);
      composition.titulaire_1 = acteComplet
        .titulaires[0] as ITitulaireComposition;
      break;
    case NatureActe.DECES:
      //TODO
      composition.nature_acte = NatureActe.getKey(acteComplet.nature);
      composition.titulaire_2 = acteComplet
        .titulaires[1] as ITitulaireComposition;
      break;
    default:
      composition = {
        nature_acte: "TODO"
      } as IExtraitPlurilingueComposition;
      //TODO
      break;
  }

  return composition;
};
