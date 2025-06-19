import { IActeApiHookResultat } from "@hook/acte/ActeApiHook";
import { IGenerationECParams } from "@hook/generation/generationECHook/generationECHook";
import { Mention } from "@model/etatcivil/acte/mention/IMention";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { gestionnaireMentionsRetireesAuto } from "@utilMetier/mention/GestionnaireMentionsRetireesAuto";

export const getParamsCreationEC = (
  typeDocument: string,
  requete: IRequeteDelivrance,
  resultatInformationsActeApiHook?: IActeApiHookResultat
): IGenerationECParams => {
  const choixDelivrance = DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument);
  const paramsCreationEC: IGenerationECParams = {
    requete,
    validation: Validation.O,
    pasDAction: true,
    choixDelivrance,
    mentionsRetirees: []
  };
  if (DocumentDelivrance.estCopieIntegrale(typeDocument)) {
    paramsCreationEC.idActe = resultatInformationsActeApiHook?.acte?.id;
  } else {
    let mentions = resultatInformationsActeApiHook?.acte?.mentions ? resultatInformationsActeApiHook?.acte?.mentions : [];
    if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
      mentions = Mention.filtrerFormaterEtTrierMentionsPlurilingues(
        resultatInformationsActeApiHook?.acte?.mentions ? resultatInformationsActeApiHook?.acte?.mentions : [],
        resultatInformationsActeApiHook?.acte?.nature
      );
    }
    paramsCreationEC.acte = resultatInformationsActeApiHook?.acte;
    paramsCreationEC.mentionsRetirees.push(
      ...gestionnaireMentionsRetireesAuto.getIdsMentionsRetirees(mentions, choixDelivrance, resultatInformationsActeApiHook?.acte?.nature)
    );
  }
  return paramsCreationEC;
};
