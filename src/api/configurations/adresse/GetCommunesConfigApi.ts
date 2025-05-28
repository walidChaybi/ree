import { GEO_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IGetCommunesParams {
  nom: string;
}

export interface ICommuneDto {
  nom: string;
  code: string;
  _score: number;
  departement: {
    code: string;
    nom: string;
  };
}

const URI = "/communes?fields=departement&boost=population&limit=15";

export const CONFIG_GET_COMMUNES: TConfigurationApi<typeof URI, undefined, IGetCommunesParams, ICommuneDto[] | []> = {
  api: GEO_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
