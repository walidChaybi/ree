// ./superagent-mock-config.js file
const mockResponse = require("./base64.json");
const mockRequetes = require("./requetes.json");
module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://10.110.204.59:8082/rece-requete-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function(match, params, headers, context) {
      /**
       * Returning error codes example:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/404').end(function(err, res){
       *     console.log(err); // 404
       *     console.log(res.notFound); // true
       *   })
       */
      if (match[1] === "/404") {
        throw new Error(404);
      }

      /**
       * Checking on parameters example:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/hero').send({superhero: "superman"}).end(function(err, res){
       *     console.logtruednt choose a hero";
        }
      }

      /**
       * Checking on headers example:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/authorized_endpoint').set({Authorization: "9382hfih1834h"}).end(function(err, res){
       *     console.log(res.body); // "Authenticated!"
       *   })
       */

      if (match[1] === "/authorized_endpoint") {
        if (headers["Authorization"]) {
          return "Authenticated!";
        } else {
          throw new Error(401); // Unauthorized
        }
      }

      /**
       * Cancelling the mocking for a specific matched route example:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/server_test').end(function(err, res){
       *     console.log(res.body); // (whatever the actual server would have returned)
       *   })
       */

      if (match[1] === "/server_test") {
        context.cancel = true; // This will cancel the mock process and continue as usual (unmocked)
        return null;
      }

      /**
       * Delaying the response with a specific number of milliseconds:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/delay_test').end(function(err, res){
       *     console.log(res.body); // This log will be written after the delay time has passed
       *   })
       */

      if (match[1] === "/delay_test") {
        context.delay = 3000; // This will delay the response by 3 seconds
        return "zzZ";
      }

      /**
       * Mocking progress events:
       *   request.get('http://10.110.204.59:8082/rece-requete-api/v1/progress_test')
       *     .on('progress', function (e) { console.log(e.percent + '%'); })
       *     .end(function(err, res){
       *       console.log(res.body); // This log will be written after all progress events emitted
       *     })
       */

      if (match[1] === "/progress_test") {
        context.progress = {
          parts: 3, // The number of progress events to emit one after the other with linear progress
          //   (Meaning, loaded will be [total/parts])
          delay: 1000, // [optional] The delay of emitting each of the progress events by ms
          //   (default is 0 unless context.delay specified, then it's [delay/parts])
          total: 100, // [optional] The total as it will appear in the progress event (default is 100)
          lengthComputable: true, // [optional] The same as it will appear in the progress event (default is true)
          direction: "upload" // [optional] superagent adds 'download'/'upload' direction to the event (default is 'upload')
        };
        return "Hundred percent!";
      }

      if (
        match[1] ===
          "/requetes?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER&tri=dateStatut&sens=asc" ||
        match[1] ===
          "/requetes?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER"
      ) {
        return {
          data: mockRequetes.data,
          httpHeaders: { "Content-Range": ["0-15/2"] }
        };
      }

      if (
        match[1] ===
          "/piecesjustificatives/e496f1d1-18c3-48ca-ae87-e97582fbf188" ||
        match[1] ===
          "/piecesjustificatives/a70237ca-83e5-4f6f-ac86-ec15086c5e3e" ||
        match[1] ===
          "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac130004" ||
        match[1] ===
          "/documentsdelivres/a70237ca-83e5-4f6f-ac86-ec15086c5e3e" ||
        match[1] ===
          "/documentsdelivres/24557a3c-60e3-432e-82fb-0ac8f160590a" ||
        match[1] === "/documentsdelivres/f9279c00-5d2b-11ea-bc55-0242ac130003"
      ) {
        return { data: mockResponse.data };
      }

      if (
        match[1] ===
        "/requetes/1?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER"
      ) {
        return {
          hasTechnicalError: false,
          hasBusinessError: false,
          status: 200,
          url: "/rece-requete-api/v1/requetes",
          data: [
            {
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              idSagaDila: 11982,
              dateCreation: 1583225141.221132,
              dateDerniereMaj: 1583225141.221132,
              provenance: "DILA",
              canal: "INTERNET",
              statut: "A_SIGNER",
              dateStatut: 1583225292.518094,
              typeRequete: "DELIVRANCE",
              sousTypeRequete: "DELIVRANCE_COURRIER",
              natureActe: "NAISSANCE",
              typeActe: "EXTRAIT_AVEC_FILIATION",
              jourEvenement: 25,
              moisEvenement: 3,
              anneeEvenement: 1983,
              villeEvenement: "fez",
              paysEvenement: "maroc",
              nbExemplaire: null,
              piecesJustificatives: [
                {
                  idPieceJustificative: "e496f1d1-18c3-48ca-ae87-e97582fbf188",
                  nom: "11984-pi-j-3.PNG",
                  mimeType: "image/png",
                  taille: 47790,
                  identifiantSwift: "d48c76f3a27153a70e0e34b1d5646120",
                  requete: null
                },
                {
                  idPieceJustificative: "a70237ca-83e5-4f6f-ac86-ec15086c5e3e",
                  nom: "11984-pi-j-3.pdf",
                  mimeType: "application/pdf",
                  taille: 151807,
                  identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
                  requete: null
                }
              ],
              reponse: {
                idReponse: "d2ec498c-5d2b-11ea-bc55-0242ac130003",
                dateTraitementDemat: 1581721200.0,
                dateDelivrance: 1581721200.0,
                natureActe: "NAISSANCE",
                jourEvenement: 1,
                moisEvenement: 1,
                anneeEvenement: 1983,
                villeEvenement: "fez",
                paysEvenement: "maroc",
                nomOec: "Garisson",
                prenomOec: "Juliette",
                commentaire: null,
                documentsDelivres: [
                  {
                    idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130003",
                    typeDocument: "COPIE_INTEGRALE",
                    nom: "Naissance mock copie",
                    mimeType: "application/pdf",
                    taille: 12,
                    identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
                    reponse: null
                  },
                  {
                    idDocumentDelivre: "24557a3c-60e3-432e-82fb-0ac8f160590a",
                    typeDocument: "FA50",
                    nom: "nom à modifier",
                    mimeType: "application/pdf",
                    taille: 12,
                    identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94208",
                    reponse: null
                  }
                ],
                requete: null
              },
              requerant: {
                idRequerant: "f275d357-14ec-42ac-a219-d481cbcbbc61",
                typeRequerant: "TITULAIRE",
                qualiteRequerant: "PARTICULIER",
                nomOuRaisonSociale: "aubin",
                nomUsage: null,
                prenomUsage: "nicolas",
                telephone: "0777327569",
                adresse: null,
                requete: null
              },
              titulaires: [
                {
                  idTitulaire: "31a63e6a-b4de-4e4f-8bd4-2a53835a417b",
                  position: 1,
                  nomNaissance: "aubin",
                  nomUsage: null,
                  prenom1: "nicolas",
                  prenom2: null,
                  prenom3: null,
                  jourNaissance: 25,
                  moisNaissance: 3,
                  anneeNaissance: 1983,
                  villeNaissance: "fez",
                  paysNaissance: "maroc",
                  parent1: null,
                  parent2: null,
                  requete: null
                }
              ]
            }
          ],
          errors: [],
          httpHeaders: {
            "Content-Range": ["0-50/1"],
            "Accept-Range": ["requete 100"],
            Link: [""]
          }
        };
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function(match, data) {
      return {
        body: data
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function(match, data) {
      return {
        status: 201
      };
    }
  }
];
