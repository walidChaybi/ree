import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { TRequeteRMCAutoDto } from "@model/rmc/requete/RequeteRMCAuto";
import { IEnveloppeCriteresRMCAutoRequete } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";

const URI = "/requetes/rmcauto";

interface IQuery {
  range?: string;
}

interface IResultatRMCAutoRequete {
  resultatsRecherche: TRequeteRMCAutoDto[];
}

export const CONFIG_POST_RMC_AUTO_REQUETE: TConfigurationApi<
  typeof URI,
  IEnveloppeCriteresRMCAutoRequete,
  IQuery,
  IResultatRMCAutoRequete
> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
