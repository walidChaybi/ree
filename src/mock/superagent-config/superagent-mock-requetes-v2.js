import {
  ReponseAppelDetailRequeteDelivrance,
  ReponseAppelDetailRequeteDelivranceASigner,
  ReponseAppelDetailRequeteDelivranceBrouillon,
  ReponseAppelDetailRequeteDelivrancePriseEnCharge,
  ReponseAppelDetailRequeteDelivranceRDC
} from "../data/DetailRequeteDelivrance";
import {
  documentReponseCARN_CSPAC_01,
  documentReponseCertificatRCA,
  idDocumentsReponse
} from "../data/DocumentReponse";
import {
  ReponseAppelMesRequetes,
  ReponseAppelRequetesService
} from "../data/EspaceDelivrance";
import { NOMENCLATURE_OPTION_COURRIER } from "../data/NomenclatureOptionCourrier";
import { parametresBaseRequete } from "../data/NomenclatureParametresBaseRequete";
import {
  ReponseAppelNomenclatureDocummentDelivrance,
  ReponseAppelNomenclatureTypePiecesJustificative
} from "../data/nomenclatures";
import { idRequeteRDCSC } from "../data/RequeteV2";
import { ReponseAppelRMCRequete } from "../data/RMCRequete";

export const NORESULT = "NORESULT";

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
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105>;rel="next"'
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
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105>;rel="next"'
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
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-105>;rel="next"'
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
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CA_TRAITER%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-105>;rel="next"'
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

      if (match[1] === "/nomenclature/optioncourrier") {
        return { data: NOMENCLATURE_OPTION_COURRIER };
      }

      // RMC Requete
      if (match[1] === "/requetes/rmc?range=0-105") {
        // RMC Manuelle suite RMC Auto (vue ApercuRequetePriseEnChargePartieGauche)
        if (params?.nomTitulaire === NORESULT) {
          return {
            headers: {
              "content-range": "0-105/0",
              link: ""
            },
            data: { resultatsRecherche: [] }
          };
        }
        // RMC Manuelle (vue RMCRequetePage)
        else {
          return {
            headers: {
              "content-range": "0-15/" + ReponseAppelRMCRequete.data.length,
              link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/rmc?range=0-105>;rel="next"'
            },
            data: ReponseAppelRMCRequete.data
          };
        }
      }

      // Détail requête Délivrance
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d404") {
        return { data: ReponseAppelDetailRequeteDelivrance.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d494") {
        return { data: ReponseAppelDetailRequeteDelivranceASigner.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d884") {
        return { data: ReponseAppelDetailRequeteDelivrancePriseEnCharge.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d405") {
        return { data: ReponseAppelDetailRequeteDelivranceBrouillon.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d666") {
        return { data: ReponseAppelDetailRequeteDelivranceRDC.data };
      }

      // Compteurs requêtes A_SIGNER
      if (match[1] === "/requetes/count?statuts=A_SIGNER") {
        return { data: 20 };
      }

      // Utilisé dans UtilisateurAssigneRequeteHook.test
      if (match[1] === "/reponses/1d189cd9-0df0-45dc-a4cf-0174eb62cbbc") {
        return {};
      }

      if (match[1] === "/reponses/1?nomOec=SecondNom&prenomOec=SecondPrenom") {
        return {};
      }

      // Creation Requete Delivrance
      // Certificat de Situation Courrier
      if (match[1] === "/requetes/delivrance?refus=false&brouillon=false") {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }

      if (match[1] === "/requetes/delivrance?refus=true&brouillon=false") {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }

      if (match[1] === "/requetes/delivrance?refus=false&brouillon=true") {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }
      // Update Requete Delivrance
      // Certificat de Situation Courrier
      if (
        match[1] ===
        "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=false&brouillon=false"
      ) {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }
      if (
        match[1] ===
        "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=true&brouillon=false"
      ) {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }
      if (
        match[1] ===
        "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=false&brouillon=true"
      ) {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd"
          }
        };
      }
      // Update choix delivrance
      if (
        match[1] ===
          "/requetes/delivrance/d19650ed-012b-41ec-b7be-9e6ea9101eaa/choixdelivrance?choixDelivrance=REP_SANS_DEL_EC_REQUETE_INCOMPLETE" ||
        match[1] ===
          "/requetes/delivrance/d19650ed-012b-41ec-b7be-9e6ea9101eaa/choixdelivrance?choixDelivrance=REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC" ||
        match[1] ===
          "/requetes/delivrance/d19650ed-012b-41ec-b7be-9e6ea9101eaa/choixdelivrance?choixDelivrance=REP_SANS_DEL_EC_DIVERS"
      ) {
        return { data: "d19650ed-012b-41ec-b7be-9e6ea9101eaa" };
      }
      if (
        match[1] ===
        "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d666/choixdelivrance?choixDelivrance=DELIVRER_EC_COPIE_INTEGRALE"
      ) {
        return { data: "a4cefb71-8457-4f6b-937e-34b49335d666" };
      }

      if (
        match[1] ===
        "/requetes/delivrance/d19650ed-012b-41ec-b7be-9e6ea9101eaa/choixdelivrance?choixDelivrance"
      ) {
        return { data: "d19650ed-012b-41ec-b7be-9e6ea9101eaa" };
      }

      // RMC Auto Requete
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

      // Récupération d'un document par son id
      if (match[1] === "/piecesjustificatives/" + idDocumentsReponse[0]) {
        return { data: documentReponseCARN_CSPAC_01 };
      }

      // Récupération d'un document par son id
      if (match[1] === "/documentsreponses/" + idDocumentsReponse[0]) {
        return { data: documentReponseCARN_CSPAC_01 };
      }
      // Récupération d'un document par son id
      if (match[1] === "/documentsreponses/" + idDocumentsReponse[1]) {
        return { data: documentReponseCertificatRCA };
      }

      // Stockage d'un document (POST)
      if (match[1] === "/documentsreponses" && context.method === "post") {
        return { data: idDocumentsReponse };
      }

      // Supression des documents reponses (DELETE)
      if (
        match[1] === "/documentsreponses/" + idRequeteRDCSC &&
        context.method === "delete"
      ) {
        return { data: {} };
      }

      // Transfert requête
      if (
        match[1] ===
          "/requetes/action/transfert?idRequete=12345&idEntite=12345&idUtilisateur=12345&statutRequete=TRANSFEREE&libelleAction=libelleAction" &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Ignorer requête
      if (
        match[1] ===
          "/requetes/action/ignorer?idRequete=12345&texteObservation=libelleAction" &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }
      if (
        match[1] ===
          "/requetes/action/ignorer?idRequete=a4cefb71-8457-4f6b-937e-34b49335d666&texteObservation=Adresse%20incompl%C3%A8te" &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Création d'une action et maj statut de la requête
      if (
        (match[1] ===
          "/requetes/action?idRequete=12345&libelleAction=libelleAction&statutRequete=A_VALIDER" ||
          match[1] ===
            "/requetes/action?idRequete=54ddf213-d9b7-4747-8e92-68c220f66de3&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE") &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Récupération des paramètres de la base requête
      if (match[1] === "/parametres" && context.method === "post") {
        return { data: parametresBaseRequete };
      }

      // Prise en charge aléatoire
      if (match[1] === "/requetes/requetealeatoire") {
        return {
          data: ReponseAppelMesRequetes[0]
        };
      }

      // Prise en charge requete
      if (
        match[1] ===
        "/requetes/action?idRequete=0&libelleAction=Prendre%20en%20charge&statutRequete=PRISE_EN_CHARGE"
      ) {
        return true;
      }

      const error = { msg: "url api requete non mockée", url: match[1] };
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
