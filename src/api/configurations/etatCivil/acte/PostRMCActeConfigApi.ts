import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IRMCActeInscriptionDto } from "@model/form/rmc/RMCActeInscriptionForm";
import { IResultatRMCActeDto } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";

const URI = "/acte/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_ACTE: TConfigurationApi<typeof URI, IRMCActeInscriptionDto, IQuery, IResultatRMCActeDto[]> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
