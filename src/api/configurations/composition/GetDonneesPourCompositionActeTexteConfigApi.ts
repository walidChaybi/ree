import {
  URL_ACTE,
  URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE
} from "@api/appels/etatcivilApi";

const URI = `${URL_ACTE}/:idActe${URL_DONNEES_POUR_COMPOSITION_ACTE_TEXTE}`;

// export const CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE: TConfigurationApi<
//   typeof URI,
//   undefined,
//   undefined,
//   string
// > = {
//   api: ETATCIVIL_API,
//   methode: "GET",
//   uri: URI
// };
