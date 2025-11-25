/* v8 ignore start : Pas testable car utilisé dans views*/
import { REQUETE_API_V3 } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IRequeteInformationTableauDto } from "@model/requete/IRequeteTableauInformation";

const URI = "/requetes-information/mes-requetes";

interface IQueryParams {
  tri: string;
  sens: string;
  range: string;
}

const CONFIG_GET_MES_REQUETES_INFORMATION: TConfigurationApi<typeof URI, undefined, IQueryParams, IRequeteInformationTableauDto[]> = {
  api: REQUETE_API_V3,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

export default CONFIG_GET_MES_REQUETES_INFORMATION;
/* v8 ignore stop */
