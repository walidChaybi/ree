import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IResultatRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { ICriteresRMCDto } from "@model/rmc/commun/IRMCFormulaire";

const URI = "/repertoirecivil/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_INSCRIPTION: TConfigurationApi<
  typeof URI,
  ICriteresRMCDto,
  IQuery,
  (IResultatRMCInscriptionDto<"PACS"> | IResultatRMCInscriptionDto<"RC"> | IResultatRMCInscriptionDto<"RCA">)[]
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
