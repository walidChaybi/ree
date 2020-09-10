// ./superagent-mock-config.js file
const mockPdf = require("./pdf-base64.json");
const mockPng = require("./png-base64.json");
const mockRequetes = require("./generateurRequetes.ts").generateurRequetes();
const mockUtilisateurs = require("./utilisateurs.json");
const mockConnectedUser = require("./connectedUser.json");

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost:80/rece/rece-requete-api/v1(.*)",

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
        "/requetes/104b8563-c7f8-4748-9daa-f26558985894?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser"
      ) {
        return { data: mockRequetes.data[0] };
      }
      if (
        match[1] ===
        "/requetes/104b8564-c7f9-4749-9dab-f26558985895?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser"
      ) {
        return { data: mockRequetes.data[1] };
      }
      if (
        match[1] ===
        "/requetes/104b8563-c7f8-4748-9daa-f26558985896?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser"
      ) {
        return { data: mockRequetes.data[2] };
      }
      if (
        match[1] ===
          "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=idSagaDila&sens=ASC&idArobas=idSSOConnectedUser" ||
        match[1] ===
          "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=idSagaDila&sens=DESC&idArobas=idSSOConnectedUser" ||
        match[1] ===
          "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105&idArobas=idSSOConnectedUser" ||
        match[1] ===
          "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&idArobas=idSSOConnectedUser"
      ) {
        return {
          data: mockRequetes.data.slice(0, 105),
          headers: {
            "content-range": "0-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v1/requetes?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="next"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105&idArobas=idSSOConnectedUser"
      ) {
        return {
          data: mockRequetes.data.slice(105, 210),
          headers: {
            "content-range": "106-15/" + mockRequetes.data.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v1/requetes?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105>;rel="next",<http://localhost:80/rece/rece-requete-api/v1/requetes?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105>;rel="prev"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes?nomOec=nomConnectedUser&prenomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105&idArobas=idSSOConnectedUser"
      ) {
        return {
          data: mockRequetes.data.slice(210, 315),
          headers: {
            "content-range": "211-15/" + mockRequetes.data.length,
            link:
              ',<http://localhost:80/rece/rece-requete-api/v1/requetes?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="prev"'
          }
        };
      }

      if (
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&idArobas=25648596" ||
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&idArobas=25648596"
      ) {
        return {
          data: mockRequetes.data.slice(0, 105),
          headers: {
            "content-range": "0-15/" + mockRequetes.data.length,
            link: [
              '<http://localhost:80/rece-requete-api/v1/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&idArobas=25648596&range=1-105>;rel="next"'
            ]
          }
        };
      }
      if (
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105&idArobas=25648596" ||
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&idArobas=25648596"
      ) {
        return {
          data: mockRequetes.data.slice(105, 210),
          headers: {
            "content-range": "106-15/" + mockRequetes.data.length,
            link: [
              '<http://localhost:80/rece-requete-api/v1//requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105>;rel="next",<http://localhost:80/rece-requete-api/v1/requetes/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=0-105>;rel="prev"'
            ]
          }
        };
      }
      if (
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105" ||
        match[1] ===
          "/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER"
      ) {
        return {
          data: mockRequetes.data.slice(210, 315),
          headers: {
            "content-range": "211-15/" + mockRequetes.data.length,
            link: [
              ',<http://localhost:80/rece-requete-api/v1/requetes/requetesService?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER&tri=dateStatut&sens=ASC&range=1-105>;rel="prev"'
            ]
          }
        };
      }

      if (
        match[1] ===
        "/piecesjustificatives/e496f1d1-18c3-48ca-ae87-e97582fbf188"
      ) {
        return { data: mockPng.data };
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
          contenu: mockPdf.data
        };
        return { data: documentDelivre };
      }

      if (
        match[1] ===
        "/requetes/1?nomOec=nomConnectedUser&nomOec=prenomConnectedUser&statut=A_SIGNER"
      ) {
        return undefined;
      }

      if (match[1] === "/404") {
        throw new Error(404);
      }

      if (match[1] === "/requetes" && context.method === "post") {
        return this.post;
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match, data, test1, test2, test3) {
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
  },
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost:80/rece/rece-securite-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      if (match[1] === "/utilisateurs?service=servicemock") {
        return { data: mockUtilisateurs.data };
      }

      if (match[1] === "/utilisateurs/login") {
        return { headers: mockConnectedUser };
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
