import { CommunExtraitOuCopieActeTexteComposition } from "@model/composition/extraitCopie/createur/CommunExtraitOuCopieActeTexteComposition";
import { CopieActeTexteDecesComposition } from "@model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
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
  switch (acteComplet.nature) {
    case NatureActe.MARIAGE:
      composition =
        ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage(
          {
            acte: acteComplet,
            requete,
            validation,
            mentionsRetirees,
            choixDelivrance,
            ctv
          }
        );
      break;
    case NatureActe.DECES:
      composition = CopieActeTexteDecesComposition.creerCopieActeTexteDeces({
        acte: acteComplet,
        requete,
        validation,
        mentionsRetirees,
        choixDelivrance,
        ctv
      });
      break;
    case NatureActe.NAISSANCE:
      composition =
        ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
          {
            acte: acteComplet,
            requete,
            validation,
            mentionsRetirees,
            choixDelivrance,
            ctv
          }
        );
      break;
    default:
      composition =
        CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
          acte: acteComplet,
          natureActe: acteComplet.nature.libelle,
          choixDelivrance,
          sousTypeRequete: requete.sousType,
          validation,
          mentionsRetirees: [],
          ctv
        });
      break;
  }

  return composition;
};
