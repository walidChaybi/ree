import {
  ReponseAppelNomenclatureDocummentDelivrance,
  ReponseAppelNomenclatureTypePiecesJustificative
} from "../data/nomenclatures";

import { ReponseAppelRMCRequete } from "../data/RMCRequete";

export const configRequetesV2 = [
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
    fixtures: function (match, params, headers, context) {
      // Nomenclatures requetes
      if (match[1] === "/nomenclature/DOCUMENT_DELIVRANCE") {
        return { data: ReponseAppelNomenclatureDocummentDelivrance.data };
      }

      if (match[1] === "/nomenclature/TYPE_PIECE_JUSTIFICATIVE") {
        return { data: ReponseAppelNomenclatureTypePiecesJustificative.data };
      }

      // RMC Requete
      if (match[1] === "/requetes/rmc?range=0-105") {
        return { data: ReponseAppelRMCRequete.data };
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match, data) {
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
    post: function (match, data) {
      return {
        status: 201,
        body: data
      };
    },

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    patch: function (match, data) {
      return {
        status: 201
      };
    }
  }
];
