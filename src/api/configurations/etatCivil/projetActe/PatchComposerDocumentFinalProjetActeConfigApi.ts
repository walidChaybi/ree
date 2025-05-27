import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/projetacte/:idActe/composer-document-final";

interface IBody {
  infosSignature: {
    issuerCertificat: string;
    entiteCertificat: string;
  };
}

export const CONFIG_PATCH_COMPOSER_DOCUMENT_FINAL_PROJET_ACTE: TConfigurationApi<typeof URI, IBody, undefined, string> = {
  api: ETATCIVIL_API,
  methode: "PATCH",
  uri: URI,
  avecAxios: true
};
