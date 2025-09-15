import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITypeRegistrePocopaDto } from "@model/etatcivil/acte/TypeRegistre";

const URI = "/types-registres/pocopas";

export const CONFIG_GET_POSTES: TConfigurationApi<typeof URI, undefined, undefined, ITypeRegistrePocopaDto[] | []> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
