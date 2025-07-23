import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ICriteresRMCAutoActeInscription } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IResultatRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";

const URI = "/repertoirecivil/rmcauto";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_AUTO_INSCRIPTION: TConfigurationApi<
  typeof URI,
  ICriteresRMCAutoActeInscription,
  IQuery,
  (IResultatRMCInscriptionDto<"PACS"> | IResultatRMCInscriptionDto<"RC"> | IResultatRMCInscriptionDto<"RCA">)[]
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
