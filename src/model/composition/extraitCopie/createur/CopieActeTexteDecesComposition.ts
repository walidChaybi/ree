import { getValeurOuVide } from "@util/Utils";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import {
  CommunExtraitOuCopieActeTexteComposition,
  ICreerExtraitCopieActeTexteAvantCompositionParams
} from "./CommunExtraitOuCopieActeTexteComposition";

export class CopieActeTexteDecesComposition {
  public static creerCopieActeTexteDeces(
    params: ICreerExtraitCopieActeTexteAvantCompositionParams
  ) {
    const avecFiliation = params.avecFiliation ? params.avecFiliation : false;
    const copie = params.copie ? params.copie : false;
    const archive = params.archive ? params.archive : false;
    const natureActe = NatureActe.getKey(NatureActe.DECES);
    const corpsTexte = params.acte.corpsTexte?.texte;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte: params.acte,
      natureActe,
      choixDelivrance: getValeurOuVide(params.requete.choixDelivrance),
      sousTypeRequete: params.requete.sousType,
      validation: params.validation,
      avecFiliation,
      copie,
      archive,
      corpsTexte,
      mentionsRetirees: params.mentionsRetirees,
      ctv: params.ctv
    });
  }
}
