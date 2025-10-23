import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";

interface IBody {
  requetes: { id: string; statut: keyof typeof EStatutRequete }[];
  idService: string;
  idUtilisateurAAssigner?: string;
  libelleAction: string;
  attribuer: boolean;
}

const URI = "/requetes/action/transfert";

export const CONFIG_PATCH_ACTION_TRANSFERT_REQUETES: TConfigurationApi<typeof URI, IBody, undefined, string> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
