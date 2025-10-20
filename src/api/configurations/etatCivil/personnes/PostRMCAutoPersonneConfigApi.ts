/* v8 ignore start : pas testable car composant de views */

import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IRMCAutoTitulaireDto } from "@model/rmc/acteInscription/rechercheForm/IRMCAutoTitulaireDto";

const URI = "/personnes/rmcauto";

interface IQuery {
  range?: string;
}

export const CONFIG_POST_RMC_AUTO_PERSONNE: TConfigurationApi<typeof URI, IRMCAutoTitulaireDto, IQuery, any[]> = {
  api: ETATCIVIL_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};

/* v8 ignore stop*/
