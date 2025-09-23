import { ExtraitPlurilingueDecesComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueDecesComposition";
import { ExtraitPlurilingueMariageComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueMariageComposition";
import { ExtraitPlurilingueNaissanceComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueNaissanceComposition";
import { IExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/IExtraitPlurilingueComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";

export const creationCompositionExtraitPlurilingue = function (
  acteComplet: FicheActe,
  validation: EValidation,
  sousTypeRequete: SousTypeDelivrance,
  mentionsRetirees: string[],
  ctv?: string
): IExtraitPlurilingueComposition | undefined {
  switch (acteComplet.nature) {
    case "MARIAGE":
      return ExtraitPlurilingueMariageComposition.compositionExtraitPlurilingueDeMariage(
        acteComplet,
        validation,
        sousTypeRequete,
        mentionsRetirees,
        ctv
      );
    case "NAISSANCE":
      return ExtraitPlurilingueNaissanceComposition.compositionExtraitPlurilingueDeNaissance(
        acteComplet,
        validation,
        sousTypeRequete,
        mentionsRetirees,
        ctv
      );
    case "DECES":
      return ExtraitPlurilingueDecesComposition.compositionExtraitPlurilingueDeDeces(
        acteComplet,
        validation,
        sousTypeRequete,
        mentionsRetirees,
        ctv
      );
    default:
      break;
  }

  return undefined;
};
