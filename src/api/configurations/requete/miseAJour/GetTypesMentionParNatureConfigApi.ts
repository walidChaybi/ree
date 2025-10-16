import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { ITypeMentionDto } from "@api/configurations/etatCivil/nomenclature/GetTypesMentionConfigApi";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/types-mentions/:natureActe";

export const CONFIG_GET_TYPES_MENTION_PAR_NATURE: TConfigurationApi<typeof URI, undefined, undefined, ITypeMentionDto[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
