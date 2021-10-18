import { parametresBaseRequete } from "../data/NomenclatureParametresBaseRequete";
import DONNEES_REQUETE from "../data/requete";

const mockPdf = require("../data/pdf-base64.json");
const mockPng = require("../data/png-base64.json");
const mockRequetes = require("../script-generation-donnees/generateurRequetes.ts").generateurRequetes();

export const configRequetes = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-requete-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      // Récupération des des requetes
      if (match[1] === "/requetes/104b8563-c7f8-4748-9daa-f26558985894") {
        return { data: mockRequetes.data[0] };
      }
      if (match[1] === "/requetes/104b8564-c7f9-4749-9dab-f26558985895") {
        return { data: mockRequetes.data[1] };
      }
      if (match[1] === "/requetes/104b8563-c7f8-4748-9daa-f26558985896") {
        return { data: mockRequetes.data[2] };
      }
      if (
        match[1] === "/requetes?statuts=A_SIGNER&tri=idSagaDila&sens=ASC" ||
        match[1] === "/requetes?statuts=A_SIGNER&tri=idSagaDila&sens=DESC" ||
        match[1] ===
          "/requetes?statuts=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105" ||
        match[1] === "/requetes?statuts=A_SIGNER&tri=dateStatut&sens=ASC" ||
        match[1] ===
          "/requetes?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=dateStatut&sens=ASC&range=0-105" ||
        match[1] ===
          "/requetes?statuts=A_SIGNER%252CA_TRAITER_DEMAT%252CA_IMPRIMER&tri=dateStatut&sens=ASC&range=0-105"
      ) {
        return {
          data: mockRequetes.data.slice(0, 105),
          headers: {
            "content-range": "0-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v1/requetes?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=dateStatut&sens=ASC&range=1-105>;rel="next"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=idSagaDila&sens=ASC&range=0-105"
      ) {
        return {
          data: mockRequetes.data.slice(0, 105),
          headers: {
            "content-range": "0-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v1/requetes?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=idSagaDila&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes?statuts=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105"
      ) {
        return {
          data: mockRequetes.data.slice(105, 210),
          headers: {
            "content-range": "106-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v1/requetes?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105>;rel="next",<http://localhost:80/rece/rece-requete-api/v1/requetes?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105>;rel="prev"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes?statuts=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105"
      ) {
        return {
          data: mockRequetes.data.slice(210, 315),
          headers: {
            "content-range": "211-15/" + mockRequetes.data.length,
            link:
              ',<http://localhost:80/rece/rece-requete-api/v1/requetes?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="prev"'
          }
        };
      }

      if (
        match[1] ===
          "/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC" ||
        match[1] ===
          "/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=DESC" ||
        match[1] === "/requetes/requetesService?statut=A_SIGNER" ||
        match[1] ===
          "/requetes/requetesService?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=dateStatut&sens=ASC"
      ) {
        return {
          data: mockRequetes.data.slice(0, 105),
          headers: {
            "content-range": "0-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece-requete-api/v1/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="next"'
          }
        };
      }
      if (
        match[1] ===
          "/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105" ||
        match[1] === "/requetes/requetesService?statut=A_SIGNER" ||
        match[1] ===
          "requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105" ||
        match[1] ===
          "/requetes/requetesService?statuts=A_SIGNER%2CA_TRAITER_DEMAT%2CA_IMPRIMER&tri=idSagaDila&sens=ASC"
      ) {
        return {
          data: mockRequetes.data.slice(105, 210),
          headers: {
            "content-range": "106-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece-requete-api/v1/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105>;rel="next",<http://localhost:80/rece-requete-api/v1/requetes/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105>;rel="prev"'
          }
        };
      }
      if (
        match[1] ===
          "/requetes/requetesService?statuts=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105" ||
        match[1] ===
          "/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105" ||
        match[1] === "/requetes/requetesService?statut=A_SIGNER"
      ) {
        return {
          data: mockRequetes.data.slice(210, 315),
          headers: {
            "content-range": "211-15/" + mockRequetes.data.length,
            link: [
              ',<http://localhost:80/rece-requete-api/v1/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="prev"'
            ]
          }
        };
      }
      if (match[1] === "/requetes/1?statut=A_SIGNER") {
        return undefined;
      }

      if (match[1] === "/requetes/req1?statut=A_SIGNER") {
        return { data: DONNEES_REQUETE };
      }

      if (match[1] === "/requetes/req2?statut=A_SIGNER") {
        return { status: 404 };
      }

      if (match[1] === "/requetes/count?statuts=A_SIGNER") {
        return { data: 20 };
      }

      //Récupération de pièces justufucatives
      if (
        match[1] ===
        "/piecesjustificatives/e496f1d1-18c3-48ca-ae87-e97582fbf188"
      ) {
        return { data: mockPng.data };
      }

      if (match[1] === "/documentsdelivres") {
        return {};
      }

      if (
        match[1] ===
          "/piecesjustificatives/a70237ca-83e5-4f6f-ac86-ec15086c5e3e" ||
        match[1] ===
          "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac130004" ||
        match[1] ===
          "/documentsdelivres/a70237ca-83e5-4f6f-ac86-ec15086c5e3e" ||
        match[1] ===
          "/documentsdelivres/24557a3c-60e3-432e-82fb-0ac8f160590a" ||
        match[1] ===
          "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac130003" ||
        match[1] ===
          "/documentsdelivres/g9279c00-5d2b-11ea-bc55-0242ac130003" ||
        match[1] ===
          "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac139998" ||
        match[1] ===
          "/documentsdelivres/g9279c00-5d2b-11ea-bc55-0242ac139999" ||
        match[1] === "/documentsdelivres/24557a3c-60e3-432e-82fb-0ac8f1609997"
      ) {
        let documentDelivre = {
          nom: "nomMock",
          conteneurSwift: "conteneurSwiftMock",
          contenu: mockPdf.data,
          typeDocument: "EXTRAIT_PLURILINGUE"
        };
        return { data: documentDelivre };
      }

      if (
        match[1] ===
        "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac130003fakedoc"
      ) {
        return { data: null };
      }

      // UtilisateurAssigneRequeteHook
      if (match[1] === "/reponses/1?nomOec=SecondNom&prenomOec=SecondPrenom") {
        return {};
      }

      // Modification des requetes
      if (match[1] === "/requetes" && context.method === "post") {
        return this.post;
      }

      // Utilisé dans UtilisateurAssigneRequeteHook.test
      if (match[1] === "/reponses/1d189cd9-0df0-45dc-a4cf-0174eb62cbbc") {
        return this.patch;
      }

      // Récupération des paramètres de la base requête
      if (match[1] === "/parametres" && context.method === "post") {
        return { data: parametresBaseRequete };
      }

      //
      if (
        match[1] ===
        "/requetes?statut=A_IMPRIMER&idRequete=1d189cd9-0df0-45dc-a4cf-0174eb62cbbc"
      ) {
        return { data: DONNEES_REQUETE };
      }

      const error = { msg: "url api requete V1 non mockée", url: match[1] };
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
        status: 201,
        body: data
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
        status: 201
      };
    }
  }
];
