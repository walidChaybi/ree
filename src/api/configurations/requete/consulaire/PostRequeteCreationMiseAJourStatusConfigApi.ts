import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IPostMajStatutRequeteConsulaireParams {
  libelleAction: string;
  statutRequete: string;
  idRequete: string;
}

const URI = "/requetes/action/majStatut";

export const CONFIG_POST_MAJ_STATUT_REQUETE_CONSULAIRE: TConfigurationApi<
  typeof URI,
  undefined,
  IPostMajStatutRequeteConsulaireParams,
  string
> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
