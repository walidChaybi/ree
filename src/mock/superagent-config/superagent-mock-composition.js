import { imagePngVideBase64 } from "../data/ImagePng";

export const configComposition = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-composition-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      if (
        match[1] === "/composition/CERTIFICAT_SITUATION/1" ||
        match[1] === "/composition/CERTIFICAT_INSCRIPTION_RCA/1" ||
        match[1] === "/composition/CERTIFICAT_INSCRIPTION_RC/1" ||
        match[1] === "/composition/ATTESTATION_PACS/1" ||
        match[1] === "/composition/CARN_CSPAC_01/1" ||
        match[1] === "/composition/CARN_CS_01/1" ||
        match[1] === "/composition/CARN_CSPAC_02/1" ||
        match[1] === "/composition/CARN_EC_17/1" ||
        match[1] === "/composition/CAD_EC_116/1"
      ) {
        // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
        return { data: { contenu: imagePngVideBase64, nbPages: 2 } };
      }

      const error = { msg: "url api composition non mockée", url: match[1] };
      console.log("Erreur mock api: ", error);
      return {
        data: error
      };
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
        header: data.headers
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
        body: data,
        header: data.headers
      };
    }
  }
];
