import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import {
  CommunExtraitOuCopieActeTexteComposition,
  ICreerExtraitCopieActeTexteAvantCompositionParams
} from "./CommunExtraitOuCopieActeTexteComposition";

export class CopieActeTexteDecesComposition {
  public static creerCopieActeTexteDeces(
    params: ICreerExtraitCopieActeTexteAvantCompositionParams
  ) {
    const natureActe = NatureActe.getKey(NatureActe.DECES);
    const corpsTexte = params.acte.corpsTexte?.texte;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte: params.acte,
      natureActe,
      choixDelivrance: params.choixDelivrance,
      sousTypeRequete: params.requete.sousType,
      validation: params.validation,
      corpsTexte,
      mentionsRetirees: params.mentionsRetirees,
      ctv: params.ctv
    });
  }
}
