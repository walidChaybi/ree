import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IResultatRMCActeDto } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { ICriteresRMCDto } from "@model/rmc/commun/IRMCFormulaire";

const URI = "/acte/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_ARCHIVE: TConfigurationApi<typeof URI, ICriteresRMCDto, IQuery, IResultatRMCActeDto[]> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
