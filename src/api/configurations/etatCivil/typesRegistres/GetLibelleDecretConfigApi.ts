import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/types-registres/:idTypeRegistre/libelle-decret";

interface IReponse {
  libelleDecret: string;
}

export const CONFIG_GET_LIBELLE_DECRET: TConfigurationApi<typeof URI, undefined, undefined, IReponse> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
