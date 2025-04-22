import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/donnees-pour-televerification";

type TReponse = {
  idActe: string;
  nomTitulaire1: string;
  nomTitulaire2?: string;
  anneeEvenement: number;
  natureActe: string;
}[];

export const CONFIG_POST_RECUPERER_DONNEES_POUR_TELEVERIFICATION: TConfigurationApi<typeof URI, string[], undefined, TReponse> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI
};
