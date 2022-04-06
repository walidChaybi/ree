import { CopieActeImageComposition } from "../../../../../../model/composition/extraitCopie/createur/CopieActeImageComposition";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { TypeActe } from "../../../../../../model/etatcivil/enum/TypeActe";
import { ChoixDelivrance } from "../../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../../model/requete/enum/Validation";
import { getLibelle } from "../../../../util/Utils";

export const creationCompositionCopieActeImage = function (
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance,
  sousTypeRequete: SousTypeDelivrance,
  validation: Validation
) {
  let composition;

  if (acte.type === TypeActe.IMAGE) {
    const natureActe = acte.nature.libelle;
    const avecFiliation = ChoixDelivrance.estAvecFiliation(choixDelivrance);
    const copie = true;
    const archive = ChoixDelivrance.estCopieArchive(choixDelivrance);
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
      sousTypeRequete,
      validation,
      avecFiliation,
      copie,
      archive,
      corpsImage,
      erreur
    });
  }
  return composition;
};
