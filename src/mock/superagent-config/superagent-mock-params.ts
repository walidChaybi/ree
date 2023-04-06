import { parametresBaseRequete } from "../data/NomenclatureParametresBaseRequete";

const REQUETE_API_URL = "rece-requete-api/v2";

export const configParamsBaseRequete = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-requete-api/v2/parametres",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      // Récupération des paramètres de la base requête
      if (
        match[1] === REQUETE_API_URL + "/parametres" &&
        context.method === "post"
      ) {
        return { data: parametresBaseRequete };
      }

      const error = { msg: "url params non mockée", url: match[1] };
      const message = `Erreur mock api params: ${JSON.stringify(error)}`;
      console.error(message);
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
