import { CommunExtraitOuCopieActeTexteComposition } from "@model/composition/extraitCopie/createur/CommunExtraitOuCopieActeTexteComposition";
import { CopieActeTexteDecesComposition } from "@model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";

export const creationCompositionExtraitCopieActeTexte = (
  acteComplet: FicheActe,
  requete: IRequeteDelivrance,
  validation: EValidation,
  mentionsRetirees: string[],
  choixDelivranceEC: ChoixDelivrance,
  ctv = "ctv absent"
) => {
  switch (acteComplet.nature) {
    case "MARIAGE":
      return ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage({
        acte: acteComplet,
        requete,
        validation,
        mentionsRetirees,
        choixDelivrance: choixDelivranceEC,
        ctv
      });
    case "DECES":
      return CopieActeTexteDecesComposition.creerCopieActeTexteDeces({
        acte: acteComplet,
        requete,
        validation,
        mentionsRetirees,
        choixDelivrance: choixDelivranceEC,
        ctv
      });
    case "NAISSANCE":
      return ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance({
        acte: acteComplet,
        requete,
        validation,
        mentionsRetirees,
        choixDelivrance: choixDelivranceEC,
        ctv
      });
    default:
      return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
        acte: acteComplet,
        natureActe: ENatureActe[acteComplet.nature].toUpperCase(),
        sousTypeRequete: requete.sousType,
        validation,
        mentionsRetirees: [],
        choixDelivrance: choixDelivranceEC,
        ctv
      });
  }
};
