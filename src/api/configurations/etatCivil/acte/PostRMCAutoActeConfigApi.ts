import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ICriteresRMCAutoActeInscription } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IResultatRMCActeDto } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";

const URI = "/acte/rmcauto";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_AUTO_ACTE: TConfigurationApi<typeof URI, ICriteresRMCAutoActeInscription, IQuery, IResultatRMCActeDto[]> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
