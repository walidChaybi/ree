import { GEO_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IGetDepartementsParams {
  nom: string;
}

export interface IDepartementDto {
  nom: string;
  code: string;
}

const URI = "/departements?limit=5";

export const CONFIG_GET_DEPARTEMENT: TConfigurationApi<typeof URI, undefined, IGetDepartementsParams, IDepartementDto[] | []> = {
  api: GEO_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
