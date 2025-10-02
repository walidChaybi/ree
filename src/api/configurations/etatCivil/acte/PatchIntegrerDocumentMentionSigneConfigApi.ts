import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TModeAuthentification } from "@model/agent/types";
import { TConfigurationApi } from "@model/api/Api";
import { IInformationsCarte } from "../../../../utils/Signature";

const URI = "/acte/:idActe/integrer-document-mention-signe";

interface IBody {
  documentPadesBase64: string;
  signature: IInformationsCarte;
  modeAuthentification: TModeAuthentification;
}

export const CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER: TConfigurationApi<typeof URI, IBody> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
