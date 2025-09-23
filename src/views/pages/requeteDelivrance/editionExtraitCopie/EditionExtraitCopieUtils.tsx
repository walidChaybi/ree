import { IGenerationECParams } from "@hook/generation/generationECHook/generationECHook";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { filtrerFormaterEtTrierMentionsPlurilingues } from "@model/etatcivil/acte/mention/Mention";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { gestionnaireMentionsRetireesAuto } from "@utilMetier/mention/GestionnaireMentionsRetireesAuto";

export const getParamsCreationEC = (typeDocument: string, requete: IRequeteDelivrance, acte: FicheActe | null): IGenerationECParams => {
  const choixDelivrance = DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument);
  const paramsCreationEC: IGenerationECParams = {
    requete,
    validation: EValidation.O,
    pasDAction: true,
    choixDelivrance,
    mentionsRetirees: []
  };
  if (DocumentDelivrance.estCopieIntegrale(typeDocument)) {
    paramsCreationEC.idActe = acte?.id;
  } else {
    let mentions = acte?.mentions ?? [];
    if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
      mentions = filtrerFormaterEtTrierMentionsPlurilingues(acte?.mentions ?? [], acte?.nature);
    }
    paramsCreationEC.acte = acte ?? undefined;
    paramsCreationEC.mentionsRetirees.push(
      ...gestionnaireMentionsRetireesAuto.getIdsMentionsRetirees(mentions, choixDelivrance, acte?.nature)
    );
  }
  return paramsCreationEC;
};
