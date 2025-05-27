import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/creation/:idRequete/suivi-dossier/:idSuiviDossier/mettre-a-jour-statut-apres-signature";

export const CONFIG_PATCH_STATUT_REQUETE_CREATION_APRES_SIGNATURE: TConfigurationApi<typeof URI> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
