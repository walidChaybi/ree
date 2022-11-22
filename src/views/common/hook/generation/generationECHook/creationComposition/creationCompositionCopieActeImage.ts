import { CopieActeImageComposition } from "@model/composition/extraitCopie/createur/CopieActeImageComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getLibelle } from "@util/Utils";

export const creationCompositionCopieActeImage = function (
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  choixDelivrance: ChoixDelivrance,
  validation: Validation,
  ctv: string
) {
  let composition;
  if (acte.type === TypeActe.IMAGE) {
    const natureActe = acte.nature.libelle;

    const corpsImage = acte.corpsImage;
    const erreur =
      Validation.E === validation
        ? getLibelle(
            "L'absence d'informations ne permet pas de générer la copie."
          )
        : undefined;
    composition = CopieActeImageComposition.creerCopieActeImage({
      acte,
      natureActe,
      choixDelivrance,
      requete,
      validation,
      corpsImage,
      erreur,
      ctv
    });
  }
  return composition;
};
