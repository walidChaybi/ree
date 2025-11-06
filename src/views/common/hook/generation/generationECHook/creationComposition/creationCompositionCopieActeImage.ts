import { CopieActeImageComposition } from "@model/composition/extraitCopie/createur/CopieActeImageComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IImage } from "@model/etatcivil/acte/imageActe/IImage";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";

export const creationCompositionCopieActeImage = function (
  acte: FicheActe,
  requete: IRequeteDelivrance,
  choixDelivrance: ChoixDelivrance,
  validation: EValidation,
  ctv: string,
  images: IImage[]
) {
  if (acte.type !== ETypeActe.IMAGE) return undefined;

  const erreur = validation === EValidation.E ? "L'absence d'informations ne permet pas de générer la copie." : undefined;

  return CopieActeImageComposition.creerCopieActeImage({
    acte,
    natureActe: ENatureActe[acte.nature],
    choixDelivrance,
    requete,
    validation,
    images,
    erreur,
    ctv
  });
};
