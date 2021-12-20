import { IExtraitCopieComposition } from "../../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../../model/requete/enum/ChoixDelivrance";

export const creationCompositionCopie = function (
  acteComplet: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  let composition;

  if (acteComplet.corpsText) {
    // Acte Texte (la nature est passée en paramètre)
    // TODO CopieActeTexteComposition.creerCopie(acteComplet, acteComplet.nature)
    composition = {
      type_document: "COPIE"
    } as IExtraitCopieComposition;
  } else {
    // Acte Image
    // TODO composition = CopieActeImageComposition.creerCopie(acteComplet)
    composition = {
      nature_acte: "MARIAGE",
      type_document: "COPIE",
      corps_image: ["fake"]
    } as IExtraitCopieComposition;
  }
  return composition;
};
