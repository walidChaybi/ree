import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI =
  "/requetes/mise-a-jour/:idRequete/update-statut-requete-mise-a-jour/:statut";

interface IQuery {
  estMiseAjourAnalyseMarginale?: boolean;
}

export const CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR: TConfigurationApi<typeof URI, undefined, IQuery> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI
};
