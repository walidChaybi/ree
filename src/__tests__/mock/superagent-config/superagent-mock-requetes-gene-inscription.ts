import { idDocumentsReponse } from "../data/DocumentReponse";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../data/nomenclatures";

export const configRequetesGeneInscription = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-requete-api/v2(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      // Stockage d'un document (POST)
      if (match[1] === "/documentsreponses" && context.method === "post") {
        return { data: [idDocumentsReponse[0]] };
      }

      // Nomenclatures requetes
      if (match[1] === "/nomenclature/DOCUMENT_DELIVRANCE") {
        return { data: ReponseAppelNomenclatureDocummentDelivrance.data };
      }
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
        header: data ? data.headers : null
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
    },

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    patch: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
