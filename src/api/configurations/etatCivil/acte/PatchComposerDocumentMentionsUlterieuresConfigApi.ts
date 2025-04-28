import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/composer-document-mentions-ulterieures";

interface IBody {
  infosSignature: {
    issuerCertificat: string;
    entiteCertificat: string;
  };
}

export const CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES: TConfigurationApi<typeof URI, IBody, undefined, string> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
