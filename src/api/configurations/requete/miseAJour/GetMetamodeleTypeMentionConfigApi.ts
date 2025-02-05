import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IMetaModeleTypeMentionDto } from "@model/etatcivil/typesMention/MetaModeleTypeMention";

const URI = "/types-mentions/:idTypeMention/metamodele-aide-a-saisie";

export const CONFIG_GET_METAMODELE_TYPE_MENTION: TConfigurationApi<typeof URI, undefined, undefined, IMetaModeleTypeMentionDto> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
