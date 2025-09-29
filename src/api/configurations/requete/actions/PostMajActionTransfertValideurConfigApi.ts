import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

interface IBody {
  idRequete: string;
  idUtilisateurValideur: string;
  libelleAction: string;
  texteObservation: string;
}

const URI = "/requetes/action/transfertValideur";

export const CONFIG_POST_MAJ_ACTION_TRANSFERT_VALIDEUR: TConfigurationApi<typeof URI, IBody, undefined, string> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
