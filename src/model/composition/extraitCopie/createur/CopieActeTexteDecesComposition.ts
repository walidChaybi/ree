import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { Validation } from "../../../requete/enum/Validation";
import { IRequeteDelivrance } from "../../../requete/IRequeteDelivrance";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

export class CopieActeTexteDecesComposition {
  public static creerCopieActeTexteDeces(
    acte: IFicheActe,
    requete: IRequeteDelivrance,
    validation: Validation,
    mentionsRetirees: string[],
    avecFiliation = false,
    copie = false,
    archive = false
  ) {
    const natureActe = NatureActe.getKey(NatureActe.DECES);
    const corpsTexte = acte.corpsTexte?.texte;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte,
      natureActe,
      choixDelivrance: getValeurOuVide(requete.choixDelivrance),
      sousTypeRequete: requete.sousType,
      validation,
      avecFiliation,
      copie,
      archive,
      corpsTexte,
      mentionsRetirees
    });
  }
}
