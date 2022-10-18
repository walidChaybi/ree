import { ExtraitPlurilingueMariageComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueMariageComposition";
import { ExtraitPlurilingueNaissanceComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueNaissanceComposition";
import { IExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/IExtraitPlurilingueComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";

export const creationCompositionExtraitPlurilingue = function (
  acteComplet: IFicheActe,
  validation: Validation,
  sousTypeRequete: SousTypeDelivrance,
  mentionsRetirees: string[],
  ctv?: string
): IExtraitPlurilingueComposition {
  let composition = {} as IExtraitPlurilingueComposition;

  switch (acteComplet.nature) {
    case NatureActe.MARIAGE:
      composition =
        ExtraitPlurilingueMariageComposition.compositionExtraitPlurilingueDeMariage(
          acteComplet,
          validation,
          sousTypeRequete,
          mentionsRetirees,
          ctv
        );
      break;
    case NatureActe.NAISSANCE:
      composition =
        ExtraitPlurilingueNaissanceComposition.compositionExtraitPlurilingueDeNaissance(
          acteComplet,
          validation,
          sousTypeRequete,
          mentionsRetirees,
          ctv
        );
      break;
    case NatureActe.DECES:
      //TODO
      composition.nature_acte = NatureActe.getKey(acteComplet.nature);
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
