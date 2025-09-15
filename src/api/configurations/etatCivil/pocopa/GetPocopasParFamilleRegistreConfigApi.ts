import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ITypeRegistrePocopaDto } from "@model/etatcivil/acte/TypeRegistre";

interface IGetPocopasParFamilleRegistreParams {
  seulementPocopaOuvert: boolean;
}

const URI = "/types-registres/:familleRegistre/pocopas";

export const CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE: TConfigurationApi<
  typeof URI,
  undefined,
  IGetPocopasParFamilleRegistreParams,
  ITypeRegistrePocopaDto[] | []
> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
