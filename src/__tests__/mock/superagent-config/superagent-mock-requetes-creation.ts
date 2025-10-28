import { NOMENCLATURE_OPTION_COURRIER } from "../data/NomenclatureOptionCourrier";
import { ReponseAppelNomenclatureDocummentDelivrance, ReponseAppelNomenclatureTypePiecesJustificative } from "../data/nomenclatures";
import { requeteCreationATraiter } from "../data/requeteCreation";
import {
  creationRequeteRCTCResultat,
  requeteCreationTranscription,
  requeteCreationTranscriptionStatutATraiter
} from "../data/requeteCreationTranscription";
import { requetesServiceCreationTableauResultatQuery } from "../data/requetesServiceCreation";

export const configRequetesCreation = [
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
      const url = match[1];

      if (url === "/requetes/dd96cc3a-9865-4c83-b634-37fad2680f41") {
        return {
          data: requeteCreationTranscription
        };
      }

      if (url === "/requetes/de96cc3n-9865-4c83-b634-37fad2680f41") {
        return {
          data: requeteCreationTranscriptionStatutATraiter
        };
      }

      if (url === "/requetes/de96cc3n-9865-4c83-b634-37fad2680f41") {
        return {
          data: requeteCreationTranscriptionStatutATraiter
        };
      }

      // Création d'une action et maj statut de la requête
      if (
        url ===
          "/requetes/action/majStatut?idRequete=3ed9aa4e-921b-489f-b8fe-531dd703c60c&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" ||
        url ===
          "/requetes/action/majStatut?idRequete=dd96cc3a-9865-4c83-b634-37fad2680f41&libelleAction=Saisie%20du%20projet&statutRequete=EN_TRAITEMENT" ||
        url ===
          "/requetes/action/majStatut?idRequete=3ed9aa4e-921b-489f-b8fe-531dd703c60c&libelleAction=Saisie%20du%20projet&statutRequete=EN_TRAITEMENT"
      ) {
        return { data: "123456789" };
      }
      if (url === "/requetes/creation/requete-a-prendre-en-charge") {
        return {
          data: requeteCreationATraiter
        };
      }
      if (url === "/requetes/creation/54ddf213-d9b7-4747-8e92-68c220f66de3/statut?statut=PRISE_EN_CHARGE") {
        return {
          data: null
        };
      }

      if (url === "/requetes/creation/3ed9efe4-c196-4888-8ffe-938f37a5f73f") {
        return {
          data: {
            id: "3ed9efe4-c196-4888-8ffe-938f37a5f73f"
          }
        };
      }

      ////////////////////////////
      // Requêtes de mon service
      ////////////////////////////

      if (
        url === "/requetes/creation/requetes-service?tri=dateCreation&sens=ASC&range=0-105" ||
        url === "/requetes/creation/requetes-service?tri=statut&sens=ASC&range=0-105" ||
        url === "/requetes/creation/requetes-service?tri=alerte&sens=ASC&range=0-105" ||
        url === "/requetes/creation/requetes-service?tri=alerte&sens=DESC&range=0-105"
      ) {
        return requetesServiceCreationTableauResultatQuery;
      }

      ///////////////////////////////
      // Requêtes de consulaires    //
      ///////////////////////////////

      // Création d'une requête de transcription RCTC
      if (match[1] === "/requetes/creations" && context.method === "post") {
        return { data: creationRequeteRCTCResultat };
      }

      // Création d'une requête de transcription RCTC et transmission a un service
      if (
        match[1] === "/requetes/creationsTransmissionService?idService=6737c8a6-9d23-4fd0-97ec-1ebe3d079373" &&
        context.method === "post"
      ) {
        return { data: creationRequeteRCTCResultat };
      }

      // Nomenclatures requetes
      if (match[1] === "/nomenclature/DOCUMENT_DELIVRANCE") {
        return { data: ReponseAppelNomenclatureDocummentDelivrance.data };
      }

      if (match[1] === "/nomenclature/TYPE_PIECE_JUSTIFICATIVE") {
        return { data: ReponseAppelNomenclatureTypePiecesJustificative.data };
      }

      if (match[1] === "/nomenclature/optioncourrier") {
        return { data: NOMENCLATURE_OPTION_COURRIER };
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
    },

    delete: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
