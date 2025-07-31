import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITypeRegistreDto } from "@model/etatcivil/acte/ITypeRegistre";

const URI = "/types-registres/pocopas";

export const CONFIG_GET_POCOPAS: TConfigurationApi<typeof URI, undefined, undefined, ITypeRegistreDto[] | []> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
