import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITitulaireActeDto } from "@model/etatcivil/acte/TitulaireActe";

const URI = "/acte/:idActe/titulaire";

const CONFIG_GET_TITULAIRES_ACTE: TConfigurationApi<typeof URI, undefined, undefined, ITitulaireActeDto[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

export default CONFIG_GET_TITULAIRES_ACTE;
