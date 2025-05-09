import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { TRequete } from "@model/requete/IRequete";

const URI = "/requetes/creation/suiviDossier/:idSuivi/acte/:idActe";

export const CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER: TConfigurationApi<typeof URI, undefined, undefined, TRequete> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
