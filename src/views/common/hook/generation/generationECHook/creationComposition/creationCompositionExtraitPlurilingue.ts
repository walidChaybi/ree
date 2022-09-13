import { ExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";

export const creationCompositionExtraitPlurilingue = function (
  acteComplet: IFicheActe
) {
  return ExtraitPlurilingueComposition.creerExtraitPlurilingue(acteComplet);
};
