import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IFichePacsDto } from "@model/etatcivil/pacs/FichePacs";
import { IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";

const URI = "/repertoirecivil/:typeFiche/:idFiche";

export const CONFIG_GET_INFORMATIONS_FICHES_REPERTOIRE: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  IFicheRcDto | IFicheRcaDto | IFichePacsDto
> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
