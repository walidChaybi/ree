import { COMPOSITION_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/composition/ACTE_TEXTE/1";

export interface ICorpsCompositionActePDF {
  nature_acte?: string;
  texte_corps_acte?: string;
  mentions?: string;
  titulaires?: string;
}

export interface IReponseCompositionActePDF {
  contenu: string;
  nbPages: number;
}

export const CONFIG_POST_COMPOSITION_ACTE_TEXTE: TConfigurationApi<
  typeof URI,
  ICorpsCompositionActePDF,
  undefined,
  IReponseCompositionActePDF
> = {
  api: COMPOSITION_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
