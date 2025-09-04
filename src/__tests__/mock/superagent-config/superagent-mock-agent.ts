import { MockHabilitation } from "../data/habilitationMock";
import INFOS_UTILISATEURS from "../data/infosUtilisateurs.json";
import { serviceEtablissement } from "../data/serviceEtablissement";
import DONNEES_UTILISATEURS from "../data/utilisateurs.json";

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
    fixtures: function (match: any, params: any, headers: any, context: any) {
      if (match[1] === "/utilisateurs/connexion") {
        return { data: MockHabilitation };
      }

      if (match[1] === "/utilisateurs") {
        return { data: DONNEES_UTILISATEURS.data };
      }

      if (match[1] === "/utilisateurs/infos?ids=204b8563-c7f8-4748-9daa-f26558985895&ids=204b8563-c7f8-4748-9daa-f26558985894") {
        return { data: INFOS_UTILISATEURS.data };
      }

      if (match[1].startsWith("/services?idService=6737566d-0f25-45dc-8443-97b444e6753a")) {
        return { ...serviceEtablissement };
      }

      if (match[1].startsWith("/testhtml")) {
        return "<html>test html<html/>";
      }

      const error = { msg: "url api agent non mockée", url: match[1] };
      const message = `Erreur mock api agent: ${JSON.stringify(error)}`;
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
        status: 201
      };
    }
  }
];
