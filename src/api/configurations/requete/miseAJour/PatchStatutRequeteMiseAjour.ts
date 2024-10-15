import { REQUETE_API } from "@api/ApiDisponibles";
import { URL_REQUETES, URL_REQUETE_MISE_A_JOUR } from "@api/appels/requeteApi";
import { TConfigurationApi } from "@model/api/Api";

const URI = `${URL_REQUETES}${URL_REQUETE_MISE_A_JOUR}/:idRequete/update-statut-requete-mise-a-jour/:statut`;

interface IQuery {
  estMiseAjourAnalyseMarginale?: boolean;
}

export const CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR: TConfigurationApi<
  typeof URI,
  undefined,
  IQuery,
  undefined
> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI
};
