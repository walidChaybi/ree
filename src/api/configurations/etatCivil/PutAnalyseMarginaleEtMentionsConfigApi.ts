import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { IMentionEnregistree } from "@hook/acte/EnregistrerMentionsApiHook";
import { TConfigurationApi } from "@model/api/Api";
import { IMiseAJourAnalyseMarginaleDto } from "./PutMiseAJourAnalyseMarginaleConfigApi";

const URI = "/acte/:idActe/mentions-et-analyse-marginale";

export interface IEnregistrerAnalyseMarginaleEtMentionDto {
  mentionCreationList: IMentionEnregistree[];
  analyseMarginale: IMiseAJourAnalyseMarginaleDto | null;
}

export const CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS: TConfigurationApi<typeof URI, IEnregistrerAnalyseMarginaleEtMentionDto> = {
  api: ETATCIVIL_API,
  methode: "PUT",
  uri: URI
};
