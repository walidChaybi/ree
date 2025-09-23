import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IFicheActeDto } from "@model/etatcivil/acte/FicheActe";

const URI = "/acte/:idActe/resume";

interface IQuery {
  remplaceIdentiteTitulaireParIdentiteTitulaireAM?: boolean;
  recupereImagesEtTexte?: boolean;
}

export const CONFIG_GET_RESUME_ACTE: TConfigurationApi<typeof URI, undefined, IQuery, IFicheActeDto> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
