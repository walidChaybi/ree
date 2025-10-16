import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";

const URI = "/types-registres/transcription/postes";

export const CONFIG_GET_POSTES: TConfigurationApi<typeof URI, undefined, undefined, ITypeRegistreDto[] | []> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
