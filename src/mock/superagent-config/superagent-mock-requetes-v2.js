import { ReponseAppelDetailRequeteDelivrance } from "../data/DetailRequeteDelivrance";
import {
  documentReponseCARN_CSPAC_01,
  idDocumentReponseCARN_CSPAC_01
} from "../data/DocumentReponse";
import {
  ReponseAppelMesRequetes,
  ReponseAppelRequetesService
} from "../data/EspaceDelivrance";
import {
  ReponseAppelNomenclatureDocummentDelivrance,
  ReponseAppelNomenclatureTypePiecesJustificative
} from "../data/nomenclatures";
import { ReponseAppelRMCRequete } from "../data/RMCRequete";

export const configRequetesV2 = [
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
      // Mes requetes (espace délivrance)
      if (
        match[1] ===
        "/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseAppelMesRequetes,
          headers: {
            "content-range": "0-15/" + ReponseAppelMesRequetes.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseAppelMesRequetes,
          headers: {
            "content-range": "0-15/" + ReponseAppelMesRequetes.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Requetes de mon service (espace délivrance)
      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-15/" + ReponseAppelRequetesService.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-15/" + ReponseAppelRequetesService.length,
            link:
              '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Nomenclatures requetes
      if (match[1] === "/nomenclature/DOCUMENT_DELIVRANCE") {
        return { data: ReponseAppelNomenclatureDocummentDelivrance.data };
      }

      if (match[1] === "/nomenclature/TYPE_PIECE_JUSTIFICATIVE") {
        return { data: ReponseAppelNomenclatureTypePiecesJustificative.data };
      }

      // RMC Requete
      if (match[1] === "/requetes/rmc?range=0-105") {
        return { data: ReponseAppelRMCRequete.data };
      }

      // Détail requête Délivrance
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d404") {
        return { data: ReponseAppelDetailRequeteDelivrance.data };
      }

      // Compteurs requêtes A_SIGNER
      if (match[1] === "/requetes/count?statuts=A_SIGNER") {
        return { data: 20 };
      }

      // Utilisé dans UtilisateurAssigneRequeteHook.test
      if (match[1] === "/reponses/1d189cd9-0df0-45dc-a4cf-0174eb62cbbc") {
        return this.patch;
      }

      // Creation Requete Delivrance
      if (match[1] === "/requetes/delivrance") {
        return { data: "1072bc37-f889-4365-8f75-912166b767dd" };
      }

      // Récupération d'un document par son id
      if (match[1] === "/documentsreponses/" + idDocumentReponseCARN_CSPAC_01) {
        return { data: documentReponseCARN_CSPAC_01 };
      }

      // Stockage d'un document (POST)
      if (match[1] === "/documentsreponses" && context.method === "post") {
        return { data: [idDocumentReponseCARN_CSPAC_01] };
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
