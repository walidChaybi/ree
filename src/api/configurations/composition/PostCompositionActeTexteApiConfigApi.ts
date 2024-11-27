import { COMPOSITION_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/composition/ACTE_TEXTE/1";

export const CONFIG_POST_COMPOSITION_ACTE_TEXTE: TConfigurationApi<
  typeof URI,
  { donneesComposition: string },
  undefined,
  { contenu: string }
> = {
  api: COMPOSITION_API,
  methode: "POST",
  uri: URI
};
