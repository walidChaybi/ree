import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IParametreBaseRequeteDTO } from "@model/parametres/enum/ParametresBaseRequete";

const URI = "/parametres";

const CONFIG_GET_PARAMETRES_BASE_REQUETE: TConfigurationApi<typeof URI, string[], undefined, IParametreBaseRequeteDTO[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};

export default CONFIG_GET_PARAMETRES_BASE_REQUETE;
