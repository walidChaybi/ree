import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IRMCActeInscriptionDto } from "@model/form/rmc/RMCActeInscriptionForm";
import { IResultatRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";

const URI = "/repertoirecivil/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_INSCRIPTION: TConfigurationApi<
  typeof URI,
  IRMCActeInscriptionDto,
  IQuery,
  (IResultatRMCInscriptionDto<"PACS"> | IResultatRMCInscriptionDto<"RC"> | IResultatRMCInscriptionDto<"RCA">)[]
> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
