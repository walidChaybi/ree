import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/acte/:idActe/resume";

interface IQuery {
  remplaceIdentiteTitulaireParIdentiteTitulaireAM?: boolean;
  recupereImagesEtTexte?: boolean;
  estConsultation?: boolean;
}

export const CONFIG_GET_RESUME_ACTE: TConfigurationApi<typeof URI, undefined, IQuery, any> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};
