import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI =
  "/requetes/mise-a-jour/:idRequete/update-statut-requete-mise-a-jour/TRAITEE_MIS_A_JOUR";

interface IResultat {
  id: string;
}
export interface IMiseAJourStatutRequete {
  estMiseAjourAnalyseMarginale?: boolean;
}

export const CONFIG_PATCH_MISE_A_JOUR_STATUT_REQUETE: TConfigurationApi<
  typeof URI,
  undefined,
  IMiseAJourStatutRequete,
  IResultat
> = {
  api: REQUETE_API,
  methode: "PATCH",
  uri: URI
};
