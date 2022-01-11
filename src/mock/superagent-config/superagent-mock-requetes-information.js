import {
  ReponseAppelDetailRequeteCompletion,
  ReponseAppelDetailRequeteInformation
} from "../data/DetailRequeteInformation";
import {
  ReponseMesRequetesInformation,
  ReponseRequetesInfoService
} from "../data/EspaceInformation";
import { NOMENCLATURE_REPONSE } from "../data/NomenclatureReponse";
import { ReponseAppelRMCRequete } from "../data/RMCRequete";

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
      // Mes requetes d'information (espace information)
      if (
        match[1] ===
        "/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseMesRequetesInformation,
          headers: {
            "content-range": "0-15/" + ReponseMesRequetesInformation.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Requetes d'information de mon service (espace information)
      if (
        match[1] ===
        "/requetes/information/requetesService?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseRequetesInfoService,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetesService?statuts=PRISE_EN_CHARGE%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Détail requête Information
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10856") {
        return { data: ReponseAppelDetailRequeteInformation.data };
      }
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10557") {
        return { data: ReponseAppelDetailRequeteCompletion.data };
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
        "/requetes/action?idRequete=0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE"
      ) {
        return { data: ["0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"] };
      }

      // Prise en charge aléatoire
      if (match[1] === "/requetes/requetealeatoire?type=INFORMATION") {
        return {
          data: ReponseMesRequetesInformation[1]
        };
      }

      // Création d'une action et maj statut de la requête
      if (
        match[1] ===
          "/requetes/action?idRequete=0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // RMC Auto Requete
      if (match[1] === "/requetes/rmcauto?range=0-105") {
        return {
          headers: {
            "content-range":
              "0-15/" + ReponseAppelRMCRequete.data.resultatsRecherche.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v2/requetes/rmcauto?range=0-105>;rel="next"'
          },
          data: ReponseAppelRMCRequete.data
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
