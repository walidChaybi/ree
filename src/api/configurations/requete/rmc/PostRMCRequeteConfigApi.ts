import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ICriteresRMCRequeteDto } from "@model/rmc/requete/ICriteresRMCRequeteDto";
import { TRequeteTableauRMCDto } from "@model/rmc/requete/RequeteTableauRMC";

const URI = "/requetes/rmc";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_REQUETE: TConfigurationApi<
  typeof URI,
  ICriteresRMCRequeteDto<"CREATION" | "DELIVRANCE" | "INFORMATION" | "MISE_A_JOUR" | "">,
  IQuery,
  TRequeteTableauRMCDto[]
> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
