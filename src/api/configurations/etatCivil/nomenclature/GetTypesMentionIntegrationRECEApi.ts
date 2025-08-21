import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

export interface ITypeMentionIntegrationDto {
  idTypeMention: string;
  affecteAnalyseMarginale: boolean;
  texteMention: string;
}

const URI = "/types-mentions/integration-registre-electronique";

const CONFIG_GET_TYPES_MENTION_INTEGRATION_RECE: TConfigurationApi<typeof URI, undefined, undefined, ITypeMentionIntegrationDto> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

export default CONFIG_GET_TYPES_MENTION_INTEGRATION_RECE;
