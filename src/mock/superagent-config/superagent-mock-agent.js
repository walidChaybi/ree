import mockConnectedUser from "../data/connectedUser.json";
import { entiteRatachementEtablissement } from "../data/entiteRatachementEtablissement";
import DONNEES_ENTITES from "../data/entitesRattachement.json";
import DONNEES_ENTITES_PAGE2 from "../data/entitesRattachementPage2.json";
import { MockHabilitation } from "../data/habilitationMock";
import INFOS_UTILISATEURS from "../data/infosUtilisateurs";
import DONNEES_UTILISATEURS from "../data/utilisateurs";
import DONNEES_UTILISATEURS_PAGE2 from "../data/utilisateursPage2.json";

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
        match[1] === "/utilisateurs/all?range=0-100&lite=false" ||
        match[1] === "/utilisateurs/all?range=0-200&lite=false"
      ) {
        return { ...DONNEES_UTILISATEURS };
      }

      if (match[1] === "/utilisateurs/all?range=1-100&lite=false") {
        return { ...DONNEES_UTILISATEURS_PAGE2 };
      }

      if (
        match[1] === "/entiterattachement/all" ||
        match[1].startsWith("/entiterattachement/all?range=0-100")
      ) {
        return { ...DONNEES_ENTITES };
      }

      if (match[1].startsWith("/entiterattachement/all?range=1-100")) {
        return { ...DONNEES_ENTITES_PAGE2 };
      }

      if (
        match[1].startsWith(
          "/entiterattachement?idEntite=6737566d-0f25-45dc-8443-97b444e6753a"
        )
      ) {
        return { ...entiteRatachementEtablissement };
      }

      if (
        match[1] ===
        "/utilisateurs/infos?ids=204b8563-c7f8-4748-9daa-f26558985895&ids=204b8563-c7f8-4748-9daa-f26558985894"
      ) {
        return { data: INFOS_UTILISATEURS.data };
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
        status: 201
      };
    }
  }
];
