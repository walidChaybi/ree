import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { EModeleTexteDocument } from "../../../../../utils/ModeleTexte";

const URI = "/projetacte/:modeleTexte/modele-texte";

interface IReponse {
  natureProjet: EModeleTexteDocument;
  modeleTexte: string;
}

export const CONFIG_GET_MODELE_TEXTE: TConfigurationApi<typeof URI, undefined, undefined, IReponse> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI,
  avecAxios: true
};
