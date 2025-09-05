/* v8 ignore start : pas testable car composant de views */

import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IFicheRcDto } from "@model/etatcivil/rcrca/FicheRcRca";

const URI = "/personnes/:idPersonne/rc";

export const CONFIG_GET_INSCRIPTIONS_RC_DE_LA_PERSONNE: TConfigurationApi<typeof URI, undefined, undefined, IFicheRcDto[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};

/* v8 ignore stop*/
