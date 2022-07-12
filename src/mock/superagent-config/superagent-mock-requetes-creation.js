import { requeteTableauCreation } from "../data/requeteTableauCreation";

export const NORESULT = "NORESULT";

export const configRequetesCreation = [
  {
    compteurRequeteInformation: 0,
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
      // Requête plus ancienne
      if (match[1] === "/requetes/requeteplusancienne?type=CREATION") {
        return {
          data: requeteTableauCreation
        };
      }

      if (
        match[1] ===
        "/requetes/creation/54ddf213-d9b7-4747-8e92-68c220f66de3/statut?statut=PRISE_EN_CHARGE"
      ) {
        return {
          data: null
        };
      }

      const error = { msg: "url params non mockée", url: match[1] };
      console.log("Erreur mock api requ info: ", error);
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
    patch: function (match, data) {
      return {
        body: data,
        header: data.headers
      };
    },

    delete: function (match, data) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
