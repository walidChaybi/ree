import { ADRESSE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IGetAdressesParams {
  q: string;
  limit?: number;
  type?: string;
}

export interface IAdresseDto {
  properties: {
    label: string;
    id: string;
    name: string;
    city: string;
    context: string;
    type: string;
  };
}

const URI = "/geocodage/search";

export const CONFIG_GET_ADRESSES: TConfigurationApi<typeof URI, undefined, IGetAdressesParams, { features: IAdresseDto[] }> = {
  api: ADRESSE_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
