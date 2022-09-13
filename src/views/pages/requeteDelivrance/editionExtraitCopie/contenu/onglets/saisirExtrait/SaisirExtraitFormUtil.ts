import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";

export function parentMemeSexeOuExtraitPlurilingue(
  titulaires: ITitulaireActe[],
  documentsReponses: IDocumentReponse[]
) {
  return (
    titulaires.some(
      el => el != null && TitulaireActe.genreIndetermineOuParentDeMemeSexe(el)
    ) &&
    documentsReponses.some(
      el =>
        el.typeDocument ===
        DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE)
    )
  );
}
