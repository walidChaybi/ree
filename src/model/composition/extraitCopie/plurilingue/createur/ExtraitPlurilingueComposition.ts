import { IFicheActe } from "../../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../etatcivil/enum/NatureActe";
import { IExtraitPlurilingueComposition } from "../IExtraitPlurilingueComposition";

export interface ITitulairePlurilingueComposition {
  nom: string;
}

export class ExtraitPlurilingueComposition {
  public static creerExtraitPlurilingue(acte: IFicheActe) {
    const composition = {} as IExtraitPlurilingueComposition;

    composition.nature_acte = NatureActe.getKey(acte.nature);

    // TODO à compléter
    //   switch (acte.nature) {
    //     case NatureActe.MARIAGE:
    //       break;
    //       case NatureActe.NAISSANCE:
    //         break;
    // ...
    //     default:
    //       break;
    //   }

    // Pour test
    composition.titulaire = acte.titulaires[0];

    return composition;
  }
}
