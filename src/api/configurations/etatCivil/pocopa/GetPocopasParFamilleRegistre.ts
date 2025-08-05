import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";

const URI = "/types-registres/:familleRegistre/pocopas";

interface IQuery {
  seulementPocopaOuvert: boolean;
}

export const CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE: TConfigurationApi<typeof URI, undefined, IQuery, ITypeRegistreDto[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
