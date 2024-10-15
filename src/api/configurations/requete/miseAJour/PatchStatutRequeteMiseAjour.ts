import { URL_REQUETES, URL_REQUETE_MISE_A_JOUR } from "@api/appels/requeteApi";
import { TConfigurationApi } from "@model/api/Api";

const URI = `${URL_REQUETES}${URL_REQUETE_MISE_A_JOUR}/:idRequete/update-statut-requete-mise-a-jour/:statut`;

export const CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  undefined
> = {
  api: {
    nom: "rece-requete-api",
    version: "v2"
  },
  methode: "PATCH",
  uri: URI
};
