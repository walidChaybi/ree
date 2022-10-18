import { CopieActeTexteDecesComposition } from "@model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getValeurOuVide } from "@util/Utils";

export const creationCompositionExtraitCopieActeTexte = function (
  acteComplet: IFicheActe,
  requete: IRequeteDelivrance,
  validation: Validation,
  mentionsRetirees: string[],
  choixDelivranceEC: ChoixDelivrance,
  ctv = "ctv absent"
) {
  let composition;
  const choixDelivrance = getValeurOuVide(choixDelivranceEC);
  if (acteComplet.nature === NatureActe.MARIAGE) {
    composition =
      ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage(
        {
          acte: acteComplet,
          requete,
          validation,
          mentionsRetirees,
          avecFiliation: ChoixDelivrance.estAvecFiliation(choixDelivrance),
          copie: ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance),
          archive: ChoixDelivrance.estCopieArchive(choixDelivrance),
          ctv
        }
      );
  } else if (acteComplet.nature === NatureActe.DECES) {
    composition = CopieActeTexteDecesComposition.creerCopieActeTexteDeces({
      acte: acteComplet,
      requete,
      validation,
      mentionsRetirees,
      avecFiliation: ChoixDelivrance.estAvecFiliation(choixDelivrance),
      copie: ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance),
      archive: ChoixDelivrance.estCopieArchive(choixDelivrance),
      ctv
    });
  } else if (acteComplet.nature === NatureActe.NAISSANCE) {
    composition =
      ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
        {
          acte: acteComplet,
          requete,
          validation,
          mentionsRetirees,
          avecFiliation: ChoixDelivrance.estAvecFiliation(choixDelivrance),
          copie: ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance),
          archive: ChoixDelivrance.estCopieArchive(choixDelivrance),
          ctv
        }
      );
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
