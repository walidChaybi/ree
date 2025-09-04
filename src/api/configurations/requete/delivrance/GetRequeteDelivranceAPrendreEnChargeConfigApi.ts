/* v8 ignore start : Pas testable car utilisé dans views*/
import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/delivrance/requete-a-prendre-en-charge";

const CONFIG_GET_REQUETE_DELIVRANCE_A_PRENDRE_EN_CHARGE: TConfigurationApi<typeof URI, undefined, undefined, string> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

export default CONFIG_GET_REQUETE_DELIVRANCE_A_PRENDRE_EN_CHARGE;
/* v8 ignore stop */
