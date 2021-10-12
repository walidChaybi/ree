import {
  documentReponseCARN_CSPAC_01,
  documentReponseCertificatRCA,
  idDocumentsReponse
} from "../data/DocumentReponse";
import { imagePngVideBase64 } from "../data/ImagePng";
import { parametresBaseRequete } from "../data/NomenclatureParametresBaseRequete";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../data/nomenclatures";
import { idRequeteRDCSC } from "../data/RequeteV2";

const COMPOSITION_API_URL = "rece-composition-api/v1";
const REQUETE_V1_API_URL = "rece-requete-api/v1";
const REQUETE_V2_API_URL = "rece-requete-api/v2";

export const configMultiAPi = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      if (match[1] === COMPOSITION_API_URL + "/composition/CARN_CSPAC_01/1") {
        // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
        return { data: imagePngVideBase64 };
      }

      // Récupération des paramètres de la base requête
      if (
        (match[1] === REQUETE_V1_API_URL + "/parametres" ||
          match[1] === REQUETE_V2_API_URL + "/parametres") &&
        context.method === "post"
      ) {
        return { data: parametresBaseRequete };
      }

      // Récupération d'un document par son id
      if (
        match[1] ===
        REQUETE_V2_API_URL + "/documentsreponses/" + idDocumentsReponse[0]
      ) {
        return { data: documentReponseCARN_CSPAC_01 };
      }

      if (
        match[1] ===
        REQUETE_V2_API_URL + "/documentsreponses/" + idDocumentsReponse[1]
      ) {
        return { data: documentReponseCertificatRCA };
      }

      // Stockage d'un document (POST)
      if (
        match[1] === REQUETE_V2_API_URL + "/documentsreponses" &&
        context.method === "post"
      ) {
        return { data: idDocumentsReponse };
      }

      // Création d'une action et maj statut de la requête
      if (
        (match[1] ===
          REQUETE_V2_API_URL +
            `/action?idRequete=${idRequeteRDCSC}&libelleAction=A%20valider&statutRequete=A_VALIDER` ||
          match[1] ===
            REQUETE_V2_API_URL +
              `/action?idRequete=${idRequeteRDCSC}&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE`) &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Nomenclatures requetes
      if (
        match[1] ===
        REQUETE_V2_API_URL + "/nomenclature/DOCUMENT_DELIVRANCE"
      ) {
        return { data: ReponseAppelNomenclatureDocummentDelivrance.data };
      }

      if (
        match[1] ===
          COMPOSITION_API_URL + "/composition/CERTIFICAT_SITUATION/1" ||
        match[1] ===
          COMPOSITION_API_URL + "/composition/CERTIFICAT_INSCRIPTION_RCA/1" ||
        match[1] ===
          COMPOSITION_API_URL + "/composition/CERTIFICAT_INSCRIPTION_RC/1"
      ) {
        // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
        return { data: imagePngVideBase64 };
      }

      const error = { msg: "url api multiples non mockée", url: match[1] };
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
