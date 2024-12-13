import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IPostMajStatutEtActionParams {
  libelleAction: string;
  statutRequete: string;
  idRequete: string;
}

const URI = "/requetes/action/majStatut";

export const CONFIG_POST_MAJ_STATUT_ET_ACTION: TConfigurationApi<typeof URI, undefined, IPostMajStatutEtActionParams, string> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
