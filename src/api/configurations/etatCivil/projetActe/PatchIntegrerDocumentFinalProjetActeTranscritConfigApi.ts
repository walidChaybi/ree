import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TModeAuthentification } from "@model/agent/types";
import { TConfigurationApi } from "@model/api/Api";
import { IInformationsCarte } from "../../../../utils/Signature";

const URI = "/projetacte/:idActe/transcrit/integrer-projet-acte-transcrit";

interface IBody {
  documentPadesBase64: string;
  signature: IInformationsCarte;
  modeAuthentification: TModeAuthentification;
}

export const CONFIG_PATCH_INTEGRER_DOCUMENT_FINAL_PROJET_ACTE_TRANSCRIT: TConfigurationApi<typeof URI, IBody> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
