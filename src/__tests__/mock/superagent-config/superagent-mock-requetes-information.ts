import {
  ReponseAppelDetailRequeteCompletion,
  ReponseAppelDetailRequeteInformation,
  ReponseAppelDetailRequeteInformationSansCorbeilleAgent
} from "../data/DetailRequeteInformation";
import {
  ReponseMesRequetesInformation,
  ReponseRequetesInfoService,
  ReponseRequetesInfoServiceFiltreObjet,
  ReponseRequetesInfoServiceFiltreSousType,
  ReponseRequetesInfoServiceFiltreStatut,
  ReponseRequetesInfoServiceFiltreTypeRequerant
} from "../data/EspaceInformation";
import { NOMENCLATURE_OPTION_COURRIER } from "../data/NomenclatureOptionCourrier";
import { NOMENCLATURE_REPONSE } from "../data/NomenclatureReponse";
import { ReponseAppelNomenclatureDocummentDelivrance, ReponseAppelNomenclatureTypePiecesJustificative } from "../data/nomenclatures";

export const configRequetesInformation = [
  {
    compteurRequeteInformation: 0,
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
      // Mes requetes d'information (espace information)
      if (
        match[1] ===
          "/requetes/information/mesrequetes?statuts=TRAITEE_AUTO%2CPRISE_EN_CHARGE%2CA_TRAITER%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105" ||
        match[1] ===
          "/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105"
      ) {
        return {
          data: ReponseMesRequetesInformation,
          headers: {
            "content-range": "0-15/" + ReponseMesRequetesInformation.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/mesrequetes?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CTRANSFEREE&tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Requetes d'information de mon service (espace information)
      if (
        match[1] === "/requetes/information/requetes-de-mon-service?tri=dateCreation&sens=ASC&range=0-105" &&
        params.sousType === "INFORMATION"
      ) {
        return {
          data: ReponseRequetesInfoServiceFiltreSousType,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoServiceFiltreSousType.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetes-service?tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (
        match[1] === "/requetes/information/requetes-de-mon-service?tri=dateCreation&sens=ASC&range=0-105" &&
        params.objet === "DEMANDE_COPIE_ACTE"
      ) {
        return {
          data: ReponseRequetesInfoServiceFiltreObjet,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoServiceFiltreObjet.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetes-service?tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (
        match[1] === "/requetes/information/requetes-de-mon-service?tri=dateCreation&sens=ASC&range=0-105" &&
        params.typeRequerant === "AVOCAT"
      ) {
        return {
          data: ReponseRequetesInfoServiceFiltreTypeRequerant,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoServiceFiltreTypeRequerant.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetes-service?tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (
        match[1] === "/requetes/information/requetes-de-mon-service?tri=dateCreation&sens=ASC&range=0-105" &&
        params.statuts.length === 1 &&
        params.statuts[0] === "PRISE_EN_CHARGE"
      ) {
        return {
          data: ReponseRequetesInfoServiceFiltreStatut,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoServiceFiltreStatut.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetes-service?tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      if (match[1] === "/requetes/information/requetes-de-mon-service?tri=dateCreation&sens=ASC&range=0-105") {
        return {
          data: ReponseRequetesInfoService,
          headers: {
            "content-range": "0-15/" + ReponseRequetesInfoService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/information/requetes-service?tri=dateCreation&sens=ASC&range=0-105>;rel="next"'
          }
        };
      }

      // Détail requête Information
      if (match[1] === "/requetes/0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63" || match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10856") {
        return { data: ReponseAppelDetailRequeteInformation.data };
      }
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10857" && this.compteurRequeteInformation === 0) {
        this.compteurRequeteInformation++;
        return {
          data: ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data
        };
      }
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10857" && this.compteurRequeteInformation === 1) {
        this.compteurRequeteInformation = 0;
        return {
          data: {
            ...ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data,
            statut: "PRISE_EN_CHARGE"
          }
        };
      }
      if (match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10557" || match[1] === "/requetes/bbd05aed-8ea9-45ba-a7d7-b8d55ad10555") {
        return { data: ReponseAppelDetailRequeteCompletion.data };
      }

      // Détail requête Information
      if (match[1] === "/nomenclature/reponse") {
        return { data: NOMENCLATURE_REPONSE };
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

      // Sauvegarde réponse
      if (match[1] === "/requetes/information/reponse/bbd05aed-8ea9-45ba-a7d7-b8d55ad10856") {
        return { data: "12345" };
      }

      // Mise à jour statut requête Information
      if (
        match[1] ===
        "/requetes/action/majStatut?idRequete=0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE"
      ) {
        return { data: ["0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"] };
      }
      if (
        match[1] ===
        "/requetes/action/majStatut?idRequete=bbd05aed-8ea9-45ba-a7d7-b8d55ad10857&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE"
      ) {
        return { data: ["bbd05aed-8ea9-45ba-a7d7-b8d55ad10857"] };
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
          "/requetes/action/majStatut?idRequete=0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" &&
        context.method === "post"
      ) {
        return { data: "123456789" };
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
