import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TModeAuthentification } from "@model/agent/types";
import { TConfigurationApi } from "@model/api/Api";
import { IInformationsCarte } from "../../../../utils/Signature";

const URI = "/acte/:idActe/double-numerique/integrer-double-numerique";

interface IBody {
  documentPadesBase64: string;
  signature: IInformationsCarte;
  modeAuthentification: TModeAuthentification;
}

export const CONFIG_PATCH_INTEGRER_ACTE_DOUBLE_NUMERIQUE: TConfigurationApi<typeof URI, IBody> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
