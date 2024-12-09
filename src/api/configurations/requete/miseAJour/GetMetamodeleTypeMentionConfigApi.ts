import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IMetamodeleTypeMention } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";

const URI = "/types-mentions/:idTypeMention/metamodele-aide-a-saisie";

export const CONFIG_GET_METAMODELE_TYPE_MENTION: TConfigurationApi<typeof URI, undefined, undefined, IMetamodeleTypeMention> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
