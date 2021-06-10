import mockConnectedUser from "../data/connectedUser.json";
import { MockHabilitation } from "../data/habilitationMock";
import INFOS_UTILISATEURS from "../data/infosUtilisateurs";
import DONNEES_UTILISATEURS from "../data/utilisateurs";

export const configAgent = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-agent-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      if (match[1] === "/utilisateurs/login") {
        return { headers: mockConnectedUser, data: MockHabilitation };
      }

      if (match[1] === "/utilisateurs") {
        return { data: DONNEES_UTILISATEURS.data };
      }

      if (
        match[1] ===
        "/utilisateurs/infos?ids=204b8563-c7f8-4748-9daa-f26558985895&ids=204b8563-c7f8-4748-9daa-f26558985894"
      ) {
        return { data: INFOS_UTILISATEURS.data };
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
        status: 201
      };
    }
  }
];
