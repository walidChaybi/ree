import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ICriteresRMCActesInscriptions } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IResultatRMCActeDto } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";

const URI = "/acte/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_ACTE: TConfigurationApi<typeof URI, ICriteresRMCActesInscriptions, IQuery, IResultatRMCActeDto[]> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
