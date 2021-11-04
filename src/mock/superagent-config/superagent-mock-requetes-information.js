import { ReponseAppelDetailRequeteInformation } from "../data/DetailRequeteInformation";
import { ReponseMesRequetesInformation } from "../data/EspaceInformation";
import { NOMENCLATURE_REPONSE } from "../data/NomenclatureReponse";

export const NORESULT = "NORESULT";

export const configRequetesInformation = [
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
      if (
        match[1] ===
          "/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105" ||
        match[1] ===
          "/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=numero&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseMesRequetesInformation,
          headers: {
            "content-range": "0-15/" + ReponseMesRequetesInformation.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=numero&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Détail requête Information
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10856") {
        return { data: ReponseAppelDetailRequeteInformation.data };
      }

      // Détail requête Information
      if (match[1] === "/nomenclature/reponse") {
        return { data: NOMENCLATURE_REPONSE };
      }

      // Sauvegarde réponse
      if (
        match[1] ===
        "/requetes/information/reponse/bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
      ) {
        return { data: "12345" };
      }

      // Mise à jour statut requête Information
      if (
        match[1] ===
        "/requetes/information/statut/0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62?statut=PRISE_EN_CHARGE"
      ) {
        return { data: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62" };
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
