import { requetesCreationAlimentationTableau } from "../data/requeteCreation";
import {
  creationRequeteRCTCResultat,
  requeteCreationTranscription
} from "../data/requeteCreationTranscription";
import { requetesServiceCreationTableauResultatQuery } from "../data/requetesServiceCreation";
import { requeteTableauCreation } from "../data/requeteTableauCreation";
import { ReponseAppelRMCRequete } from "../data/RMCRequete";

export const NORESULT = "NORESULT";

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
    fixtures: function (match, params, headers, context) {
      const url = match[1];

      // Requête plus ancienne
      if (url === "/requetes/requeteplusancienne?type=CREATION") {
        return {
          data: requeteTableauCreation
        };
      }

      if (url === "/requetes/dd96cc3a-9865-4c83-b634-37fad2680f41") {
        return {
          data: requeteCreationTranscription
        };
      }

      if (
        url ===
        "/requetes/creation/54ddf213-d9b7-4747-8e92-68c220f66de3/statut?statut=PRISE_EN_CHARGE"
      ) {
        return {
          data: null
        };
      }

      ////////////////////////////
      // Mes requêtes
      ////////////////////////////
      if (
        url ===
          "/requetes/creation/mesrequetes?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CPROJET_VALIDE%2CRETOUR_SDANF%2CA_SIGNER%2CEN_TRAITEMENT&tri=numeroAffichage&sens=ASC&range=0-105" ||
        url ===
          "/requetes/creation/mesrequetes?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CPROJET_VALIDE%2CRETOUR_SDANF%2CA_SIGNER%2CEN_TRAITEMENT&tri=dateCreation&sens=ASC&range=0-105"
      ) {
        return {
          headers: {
            "content-range": "",
            link: ""
          },
          data: requetesCreationAlimentationTableau
        };
      }

      ////////////////////////////
      // Requêtes de mon service
      ////////////////////////////

      if (
        url ===
          "/requetes/creation/requetesService?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CPROJET_VALIDE%2CRETOUR_SDANF%2CA_SIGNER%2CEN_TRAITEMENT&tri=dateCreation&sens=ASC&range=0-105" ||
        url ===
          "/requetes/creation/requetesService?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CPROJET_VALIDE%2CRETOUR_SDANF%2CA_SIGNER%2CEN_TRAITEMENT&tri=statut&sens=ASC&range=0-105"
      ) {
        return requetesServiceCreationTableauResultatQuery;
      }

      /////////////////////////////////
      // Attribution requête service //
      /////////////////////////////////
      if (
        url ===
        "/requetes/action/transfert?idRequete=c9b817ca-1899-450e-9f04-979541946011&idEntite=6737d2f8-f2af-450d-a376-f22f6df6ff1d&idUtilisateur=7a091a3b-6835-4824-94fb-527d68926d56&statutRequete=A_SIGNER&libelleAction=Attribu%C3%A9e%20%C3%A0%20%20Young%20Ashley&attribuer=true"
      ) {
        let result = requetesServiceCreationTableauResultatQuery;
        result.data[0].idUtilisateur = "7a091a3b-6835-4824-94fb-527d68926d56";

        return result;
      }

      ///////////////////////////////
      // Requêtes de transcription //
      ///////////////////////////////

      // Création d'une requête de transcription RCTC
      if (match[1] === "/requetes/creations" && context.method === "post") {
        return { data: creationRequeteRCTCResultat };
      }

      // Création d'une requête de transcription RCTC et transmission a une entité
      if (
        match[1] ===
          "/requetes/creationsTransmissionEntite?idEntiteRattachement=6737c8a6-9d23-4fd0-97ec-1ebe3d079373" &&
        context.method === "post"
      ) {
        return { data: creationRequeteRCTCResultat };
      }

      ///////////////////////////////
      // RMC Auto Requete //
      ///////////////////////////////
      if (match[1] === "/requetes/rmcauto?range=0-105") {
        return {
          headers: {
            "content-range":
              "0-15/" + ReponseAppelRMCRequete.data.resultatsRecherche.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/rmcauto?range=0-105>;rel="next"'
          },
          data: ReponseAppelRMCRequete.data
        };
      }

      const error = { msg: "url params non mockée", url };
      const message = `Erreur mock api creation: ${JSON.stringify(error)}`;
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
