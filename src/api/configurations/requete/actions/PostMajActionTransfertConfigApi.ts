import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";

interface IQuery {
  idRequete: string;
  idService: string;
  idUtilisateurAAssigner: string;
  libelleAction: string;
  statutRequete: keyof typeof EStatutRequete;
  attribuer: boolean;
}

const URI = "/requetes/action/transfert";

export const CONFIG_POST_MAJ_ACTION_TRANSFERT: TConfigurationApi<typeof URI, undefined, IQuery, string> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
