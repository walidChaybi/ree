import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

export interface IFormuleIntegrationDto {
  idTypeMention: string;
  affecteAnalyseMarginale: boolean;
  texteFormule: string;
}

const URI = "/types-mentions/formule-integration-registre-electronique";

const CONFIG_GET_FORMULE_INTEGRATION_RECE: TConfigurationApi<typeof URI, undefined, undefined, IFormuleIntegrationDto> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

export default CONFIG_GET_FORMULE_INTEGRATION_RECE;
