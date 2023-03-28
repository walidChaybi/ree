import {
  detailRequeteDelivranceAvecTitulaireMultiple,
  detailRequeteDelivranceCopieArchive,
  detailRequeteDelivranceGenreIndetermine,
  getRequeteAvecDeuxDocs,
  getRequeteSansDoc,
  ReponseAppelDetailRequeteDelivrance,
  ReponseAppelDetailRequeteDelivranceASigner,
  ReponseAppelDetailRequeteDelivranceBrouillon,
  ReponseAppelDetailRequeteDelivrancePriseEnCharge,
  ReponseAppelDetailRequeteDelivranceRDC,
  requeteActeMariageAvecTroisTitulaire,
  requeteAvecCopieIntegraleActeImage,
  requeteAvecDocs,
  requeteAvecDocsPlurilingue,
  requeteRDDPAvecDocs,
  requeteSansDocument
} from "../data/DetailRequeteDelivrance";
import {
  documentReponseCARN_CSPAC_01,
  documentReponseCertificatRCA,
  documentReponseCopieIntegrale,
  documentReponseCourrier117,
  documentReponseExtraitAvecFiliation,
  idDocumentsReponse
} from "../data/DocumentReponse";
import { reponseMesRequeteCreation } from "../data/EspaceCreation";
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
import { pieceComplementInformation } from "../data/PieceComplementInformation";
import {
  reponseRequeteCreationMessageSdanf,
  requeteCreationEtablissement,
  requeteCreationTranscription
} from "../data/requeteCreation";
import {
  idRequeteRDCPourModification,
  idRequeteRDCSC,
  requeteRDCPourModification
} from "../data/requeteDelivrance";
import { ReponseAppelRMCRequete } from "../data/RMCRequete";
import {
  CreationRDCSC,
  UpdateRDC,
  UpdateRDCSC
} from "../data/SaisirRequeteDelivrance";

export const NORESULT = "NORESULT";
let compteur = 0;

export const configRequetes = [
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
      // Récupération des paramètres de la base requête
      if (match[1] === "/parametres" && context.method === "post") {
        return { data: parametresBaseRequete };
      }

      // Mes requetes (espace délivrance)
      if (
        match[1] ===
        "/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR&tri=dateStatut&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelMesRequetes,
          headers: {
            "content-range": "0-100/" + ReponseAppelMesRequetes.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR&tri=dateStatut&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      // Compter requete Traité répondu
      if (match[1] === "/requetes/count?statuts=TRAITE_REPONDU") {
        return {
          data: 10
        };
      }

      if (
        match[1] ===
        "/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelMesRequetes,
          headers: {
            "content-range": "0-100/" + ReponseAppelMesRequetes.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR&tri=numero&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelMesRequetes,
          headers: {
            "content-range": "0-100/" + ReponseAppelMesRequetes.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/mesrequetes?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR&tri=numero&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      // Requetes de mon service (espace délivrance)
      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=dateStatut&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=idSagaDila&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=numero&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER&tri=numero&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR%2CA_TRAITER&tri=dateStatut&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR%2CA_TRAITER&tri=dateStatut&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }
      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CA_TRAITER&tri=idSagaDila&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CA_TRAITER&tri=idSagaDila&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      if (
        match[1] ===
        "/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR%2CA_TRAITER&tri=numero&sens=ASC&range=0-100"
      ) {
        return {
          data: ReponseAppelRequetesService,
          headers: {
            "content-range": "0-100/" + ReponseAppelRequetesService.length,
            link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/requetesService?statuts=BROUILLON%2CPRISE_EN_CHARGE%2CTRANSFEREE%2CA_SIGNER%2CA_VALIDER%2CTRAITE_REPONDU%2CA_REVOIR%2CTRANSMISE_A_VALIDEUR%2CA_TRAITER&tri=numero&sens=ASC&range=0-100>;rel="next"'
          }
        };
      }

      // Stockage Document Maj Statut
      if (
        match[1] ===
          "/requetes/delivrance/d19650ed-012b-41ec-b7be-9e6ea9101eaa/document?libelleAction=%C3%80%20valider&statutRequete=A_VALIDER" ||
        match[1] ===
          "/requetes/delivrance/7b448d64-add5-4dbd-8041-b7081ea7bc86/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd/document?libelleAction=Trait%C3%A9e%20-%20A%20imprimer&statutRequete=TRAITE_A_IMPRIMER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d884/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d404/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d666/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/9bfa282d-1e66-4538-b242-b9de4f683f0f/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/0ad85c1f-57cf-45cc-ab66-6a17f31247df/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/9bfa282d-1e66-4538-b242-b9de4f683f77/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/9bfa282d-1e66-4538-b272-b9de4g683aaf/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        // match[1] ===
        //   "/requetes/delivrance/9bfa282d-1e66-4038-b272-b9de48683a1f/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/f0ea8f29-ddcd-494b-86e4-0a58f6990c96/document?libelleAction=%C3%80%20signer&statutRequete=A_SIGNER"
      ) {
        return { data: ["bbac2335-562c-4b14-96aa-4386814c02a2"] };
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

      // Mes requêtes création
      if (
        match[1] ===
        "/requetes/creation/mesrequetes?statuts=PRISE_EN_CHARGE%2CA_TRAITER%2CPROJET_VALIDE%2CRETOUR_SDANF%2CA_SIGNER%2CEN_TRAITEMENT&tri=dateCreation&sens=ASC&range=0-105"
      ) {
        return {
          headers: {
            "content-range": "0-100/0",
            link: ""
          },
          data: reponseMesRequeteCreation
        };
      }

      // Mes requêtes création Etablissement
      if (match[1] === "/requetes/3ed9aa4e-921b-489f-b8fe-531dd703c60c") {
        return {
          data: requeteCreationEtablissement
        };
      }
      // Mes requêtes création Transcription
      if (match[1] === "/requetes/d4f9e898-cf26-42cc-850b-007e9e475e7a") {
        return {
          data: requeteCreationTranscription
        };
      }

      if (
        match[1] ===
          "/requetes/action/transfert?idRequete=54ddf213-d9b7-4747-8e92-68c220f66de3&idEntite=12345&idUtilisateur=&statutRequete=A_TRAITER&libelleAction=Attribu%C3%A9e%20%C3%A0%20str2&attribuer=true" ||
        match[1] ===
          "/requetes/action/transfert?idRequete=8ef11b8b-652c-4c6a-ad27-a544fce635d0&idEntite=12345&idUtilisateur=&statutRequete=A_TRAITER&libelleAction=Attribu%C3%A9e%20%C3%A0%20str2&attribuer=true" ||
        match[1] === "/requetes/action/retourValideur" ||
        match[1] === "/requetes/action/transfertValideur"
      ) {
        return { data: "12345" };
      }

      if (
        match[1] ===
        "/requetes/action/retourSdanf?idRequete=3ed9aa4e-921b-429f-b8fe-531dd103c68s"
      ) {
        return { data: reponseRequeteCreationMessageSdanf };
      }

      if (
        match[1] ===
          "/requetes/fichierpiecejustificative/1234/libelle?nouveauLibelle=nouveauLibelle" ||
        match[1] ===
          "/requetes/fichierpiecejustificative/3ed92b89-268a-4883-a41f-0763cfea9ef7/libelle?nouveauLibelle=nouveauLibelle" ||
        match[1] ===
          "/requetes/fichierpiecejustificative/1234/libelle?nouveauLibelle=test%20libelle" ||
        match[1] ===
          "/requetes/fichierpiecejustificative/1234/libelle?nouveauLibelle=fichierPJ"
      ) {
        return { data: "12345" };
      }

      // RMC Requete
      if (
        match[1] === "/requetes/rmc?range=0-100" ||
        match[1] === "/requetes/rmc?range=0-105"
      ) {
        // RMC Manuelle suite RMC Auto (vue ApercuRequetePriseEnChargePartieGauche)
        if (params?.nomTitulaire === NORESULT) {
          return {
            headers: {
              "content-range": "0-100/0",
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
              link: '<http://localhost:80/rece/rece-requete-api/v2/requetes/rmc?range=0-100>;rel="next"'
            },
            data: ReponseAppelRMCRequete.data
          };
        }
      }

      // Détail requête Délivrance
      if (match[1] === "/requetes/7b448d64-add5-4dbd-8041-b7081ea7bc86") {
        return { data: requeteSansDocument };
      }
      if (
        match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d404" ||
        match[1] === "/requetes/1072bc37-f889-4365-8f75-912166b767dd"
      ) {
        return { data: ReponseAppelDetailRequeteDelivrance.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d494") {
        return { data: ReponseAppelDetailRequeteDelivranceASigner.data };
      }
      if (match[1] === "/requetes/a4cefb71-8457-4f6b-937e-34b49335d495") {
        const temp = { ...ReponseAppelDetailRequeteDelivranceASigner.data };
        temp.statut.statutRequete = "TRANSMISE_A_VALIDEUR";
        return { data: temp };
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
      if (match[1] === "/requetes/9bfa282d-1e66-4538-b242-b9de4f683f0f") {
        return { data: requeteAvecDocs };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4538-b212-b7de4f683f0f") {
        return { data: requeteRDDPAvecDocs };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4538-b242-b9de4f683f77") {
        return { data: requeteAvecCopieIntegraleActeImage };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4038-b271-b9de48283a1f") {
        return { data: requeteActeMariageAvecTroisTitulaire };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4038-b271-b9de48283a8f") {
        return { data: detailRequeteDelivranceAvecTitulaireMultiple };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4038-b272-b9de48683a8f") {
        return { data: detailRequeteDelivranceGenreIndetermine };
      }
      if (match[1] === "/requetes/9bfa282d-1e66-4538-b272-b9de4g683aaf") {
        if (compteur === 0) {
          compteur++;
          return { data: detailRequeteDelivranceCopieArchive };
        } else {
          compteur = 0;
          return {
            data: getRequeteAvecDeuxDocs(detailRequeteDelivranceCopieArchive)
          };
        }
      }

      if (match[1] === "/requetes/3f52370d-14ed-4c55-8cf4-afe006d9aa38") {
        return { data: requeteAvecDocsPlurilingue };
      }
      if (match[1] === "/requetes/3f52370d-14ed-4c55-8cf4-afe006d9aa39") {
        const temp = { ...requeteAvecDocsPlurilingue };
        temp.statut.statutRequete = "TRANSMISE_A_VALIDEUR";
        return { data: temp };
      }

      if (match[1] === "/requetes/9bfa282d-1e66-4538-b242-b9de4f693f0e") {
        if (compteur === 0) {
          compteur++;
          return { data: getRequeteSansDoc(requeteAvecDocs) };
        } else {
          compteur = 0;
          return { data: requeteAvecDocs };
        }
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

      // Sauvegarde courrier Accompagnement
      if (
        match[1] ===
          "/requetes/delivrance/85b32284-d3dd-4502-bfbd-5634ba52ba22/courrier?idRequete=85b32284-d3dd-4502-bfbd-5634ba52ba22&libelleAction=%C3%80%20valider&statutRequete=A_VALIDER" ||
        match[1] ===
          "/requetes/delivrance/7b448d64-add5-4dbd-8041-b7081ea7bc86/courrier?idRequete=7b448d64-add5-4dbd-8041-b7081ea7bc86&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d666/courrier?idRequete=a4cefb71-8457-4f6b-937e-34b49335d666&libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d884/courrier?idRequete=a4cefb71-8457-4f6b-937e-34b49335d884&statutRequete=A_TRAITER" ||
        match[1] ===
          "/requetes/delivrance/0ad85c1f-57cf-45cc-ab66-6a17f31247df/courrier?idRequete=0ad85c1f-57cf-45cc-ab66-6a17f31247df&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/9bfa282d-1e66-4538-b242-b9de4f683f0f/courrier?idRequete=9bfa282d-1e66-4538-b242-b9de4f683f0f&libelleAction=%C3%80%20signer&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/9bfa282d-1e66-4538-b242-b9de4f683f0f/courrier?idRequete=9bfa282d-1e66-4538-b242-b9de4f683f0f&statutRequete=A_SIGNER" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d884/courrier?idRequete=a4cefb71-8457-4f6b-937e-34b49335d884&statutRequete=A_SIGNER"
      ) {
        return { data: ["bbac2335-562c-4b14-96aa-4386814c02a2"] };
      }

      // Post de Piece complement information
      if (match[1] === "/requetes/12345/piececomplementinformation") {
        return { data: "123456" };
      }

      // Get de Piece complement information
      if (
        match[1] ===
        "/requetes/piecescomplementinformations/c4306a3c-6bd4-422f-a56b-20760795ba61"
      ) {
        return { data: pieceComplementInformation };
      }

      // Get nombre requête information
      if (
        match[1] ===
        "/requetes/information/count?statuts=PRISE_EN_CHARGE%2CTRANSFEREE"
      ) {
        return { data: 2 };
      }

      // Creation Requete Delivrance
      // Certificat de Situation Courrier
      if (
        match[1] === "/requetes/delivrance?refus=false&brouillon=false" ||
        match[1] === "/requetes/delivrance?refus=false&futurStatut=A_TRAITER"
      ) {
        return {
          data: {
            id: "1072bc37-f889-4365-8f75-912166b767dd",
            numeroFonctionnel: "U2UN5W",
            idSagaDila: null,
            dateCreation: 18 / 10 / 2020,
            canal: "COURRIER",
            type: "DELIVRANCE",
            statut: "A_TRAITER",
            titulaires: [],
            requerant: [],
            mandant: null,
            idUtilisateur: "id",
            idEntite: "id",
            actions: [],
            observations: [],
            piecesJustificatives: [],
            sousType: "RDCSC",
            documentDemande: [],
            nbExemplaireImpression: 1,
            provenanceRequete: "COURRIER",
            evenement: [],
            motif: "Certificat de nationalité française",
            complementMotif: null,
            choixDelivrance: null,
            documentsReponses: []
          }
        };
      }

      // Creation Requete Delivrance
      // Certificat de Situation Courrier
      if (
        match[1] ===
          "/requetes/delivrance?refus=false&futurStatut=PRISE_EN_CHARGE" ||
        match[1] === "/requetes/delivrance?refus=true&futurStatut=A_TRAITER" ||
        match[1] === "/requetes/delivrance?refus=false&futurStatut=BROUILLON" ||
        match[1] === "/requetes/delivrance?refus=true&futurStatut=BROUILLON"
      ) {
        return {
          data: CreationRDCSC
        };
      }

      // Update Requete Delivrance
      // Delivrance Extrait/Copie courrier
      if (match[1] === `/requetes/${idRequeteRDCPourModification}`) {
        return {
          data: requeteRDCPourModification
        };
      }
      if (
        match[1] ===
          `/requetes/delivrance/${idRequeteRDCPourModification}?refus=false&futurStatut=PRISE_EN_CHARGE` &&
        context.method === "patch"
      ) {
        return {
          data: UpdateRDC
        };
      }

      // Certificat de Situation Courrier
      if (
        match[1] ===
          "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=false&futurStatut=PRISE_EN_CHARGE" ||
        match[1] ===
          "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=true&futurStatut=A_TRAITER" ||
        match[1] ===
          "/requetes/delivrance/1072bc37-f889-4365-8f75-912166b767dd?refus=false&futurStatut=BROUILLON"
      ) {
        return {
          data: UpdateRDCSC
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
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d666/choixdelivrance?choixDelivrance=DELIVRER_EC_COPIE_INTEGRALE" ||
        match[1] ===
          "/requetes/delivrance/a4cefb71-8457-4f6b-937e-34b49335d884/choixdelivrance?choixDelivrance=DELIVRER_EC_COPIE_INTEGRALE"
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
      if (
        match[1] ===
          "/requetes/piecesjustificatives/" + idDocumentsReponse[0] ||
        match[1] === "/requetes/piecesjustificatives/1234" ||
        match[1] ===
          "/requetes/piecesjustificatives/3ed9ad41-ca61-416a-91df-448690804363"
      ) {
        return { data: documentReponseCARN_CSPAC_01 };
      }

      // update mentions retiré et validé document
      if (
        match[1] ===
        "/documentsreponses/bbac2335-562c-4b14-96aa-4386814c02a2/mentions"
      ) {
        return { data: true };
      }

      // Récupération d'un document par son id
      if (match[1] === "/documentsreponses/" + idDocumentsReponse[0]) {
        return { data: documentReponseCARN_CSPAC_01 };
      }
      // Récupération d'un document par son id
      if (match[1] === "/documentsreponses/" + idDocumentsReponse[1]) {
        return { data: documentReponseCertificatRCA };
      }

      if (
        match[1] ===
          "/documentsreponses/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" ||
        match[1] ===
          "/documentsreponses/9bfa865e-6d7a-4d66-900e-b548178854db/mentions"
      ) {
        return { data: true };
      }

      if (
        match[1] === "/documentsreponses/f9279c00-5d2b-11ea-bc55-0242ac130004"
      ) {
        return { data: documentReponseCopieIntegrale };
      }
      if (
        match[1] === "/documentsreponses/9c099809-951e-4b05-a27a-01d1344f479f"
      ) {
        return { data: documentReponseCourrier117 };
      }
      if (
        match[1] ===
          "/documentsreponses/9bfa865e-6d7a-4d66-900e-b548178854db" ||
        match[1] ===
          "/documentsreponses/4475fe91-62f6-4849-9474-1309364866ab" ||
        match[1] ===
          "/documentsreponses/28bc3078-7e53-4b8b-8cf8-7f75a2502573" ||
        match[1] ===
          "/documentsreponses/28bc3078-7e53-4b8b-8cf8-7f75a25025743" ||
        match[1] === "/documentsreponses/f63223ce-f425-441e-846c-114b0f36936d"
      ) {
        return { data: documentReponseExtraitAvecFiliation };
      }

      // Stockage d'un document (POST)
      if (match[1] === "/documentsreponses" && context.method === "post") {
        return { data: idDocumentsReponse };
      }

      // Maj d'un document (PATCH)
      if (match[1] === "/documentsreponses" && context.method === "patch") {
        return { data: "idRequete" };
      }

      // Supression des documents reponses (DELETE)
      if (
        match[1] === "/documentsreponses/" + idRequeteRDCSC &&
        context.method === "delete"
      ) {
        return { data: {} };
      }

      // Supression du documents complementaire (DELETE)
      if (
        match[1] ===
          "/documentsreponses/documentComplementaire/28bc3078-7e53-4b8b-8cf8-7f75a2502573?idRequete=9bfa282d-1e66-4538-b242-b9de4f683f0f" &&
        context.method === "delete"
      ) {
        return { data: true };
      }

      // Ajout observation
      if (
        (match[1] ===
          "/requetes/observation?idRequete=123&texteObservation=salut" ||
          match[1] ===
            "/requetes/observation?idRequete=123&texteObservation=salut&idObservation=id0000" ||
          match[1] ===
            "/requetes/observation?idRequete=123&texteObservation=salut&idObservation=123456789") &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Suppression observation
      if (
        match[1] === "/requetes/observation?idObservation=id0000" &&
        context.method === "delete"
      ) {
        return { data: true };
      }

      // Transfert requête
      if (
        (match[1] === "/requetes/action/transfert" ||
          match[1] ===
            "/requetes/action/transfert?idRequete=12345&idEntite=12345&idUtilisateur=12345&statutRequete=TRANSFEREE&libelleAction=libelleAction&attribuer=false") &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Ignorer requête
      if (
        (match[1] ===
          "/requetes/action/ignorer?idRequete=a4cefb71-8457-4f6b-937e-34b49335d666&texteObservation=Adresse%20incompl%C3%A8te" ||
          match[1] ===
            "/requetes/action/ignorer?idRequete=12345&texteObservation=libelleAction") &&
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
          "/requetes/action/majStatut?idRequete=85b32284-d3dd-4502-bfbd-5634ba52ba22&libelleAction=A%20valider&statutRequete=A_VALIDER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=12345&libelleAction=libelleAction&statutRequete=A_VALIDER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=54ddf213-d9b7-4747-8e92-68c220f66de3&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=d19650ed-012b-41ec-b7be-9e6ea9101eaa&libelleAction=Revue%20du%20traitement&statutRequete=PRISE_EN_CHARGE" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=d19650ed-012b-41ec-b7be-9e6ea9101eaa&libelleAction=Trait%C3%A9e%20-%20Imprim%C3%A9e%20en%20local&statutRequete=TRAITE_IMPRIME_LOCAL" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=1072bc37-f889-4365-8f75-912166b767dd&libelleAction=Trait%C3%A9e%20-%20A%20imprimer&statutRequete=TRAITE_A_IMPRIMER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=a4cefb71-8457-4f6b-937e-34b49335d666&libelleAction=A%20signer&statutRequete=A_SIGNER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=a4cefb71-8457-4f6b-937e-34b49335d494&libelleAction=Requ%C3%AAte%20reprise&statutRequete=A_VALIDER" ||
          match[1] ===
            `/requetes/action/majStatut?idRequete=${idRequeteRDCSC}&libelleAction=A%20valider&statutRequete=A_VALIDER` ||
          match[1] ===
            `/requetes/action/majStatut?idRequete=${idRequeteRDCSC}&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE` ||
          match[1] ===
            `/requetes/action/majStatut?idRequete=${idRequeteRDCSC}&libelleAction=Trait%C3%A9e%20-%20A%20d%C3%A9livrer%20D%C3%A9mat&statutRequete=TRAITE_A_DELIVRER_DEMAT` ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=8ef11b8b-652c-4c6a-ad27-a544fce635d0&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=id1&libelleAction=Trait%C3%A9e%20-%20A%20d%C3%A9livrer%20D%C3%A9mat&statutRequete=TRAITE_A_DELIVRER_DEMAT" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=104b8563-c7f8-4748-9daa-f26558985894&libelleAction=Sign%C3%A9e&statutRequete=TRAITE_A_DELIVRER_DEMAT" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=3f52370d-14ed-4c55-8cf4-afe006d9aa38&libelleAction=Requ%C3%AAte%20reprise&statutRequete=A_SIGNER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=104b8563-c7f8-4748-9daa-f26558985894&libelleAction=Trait%C3%A9e%20-%20A%20d%C3%A9livrer%20D%C3%A9mat&statutRequete=TRAITE_A_DELIVRER_DEMAT" ||
          // Passage du statut la requête de "A_SIGNE" à "TRAITE_A_IMPRIMER"
          match[1] ===
            "/requetes/action/majStatut?idRequete=id2&libelleAction=Trait%C3%A9e%20-%20A%20imprimer&statutRequete=TRAITE_A_IMPRIMER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=id1&libelleAction=Trait%C3%A9e%20-%20A%20imprimer&statutRequete=TRAITE_A_IMPRIMER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=1072bc37-f889-4365-8f75-912166b767dd&libelleAction=%C3%80%20traiter&statutRequete=A_TRAITER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=1072bc37-f889-4365-8f75-912166b767dd&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=1072bc37-f889-4365-8f75-912166b767dd&libelleAction=Brouillon&statutRequete=BROUILLON" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=8ef11b8b-652c-4c6a-ad27-a544fce63999&libelleAction=Trait%C3%A9e%20-%20D%C3%A9livr%C3%A9e%20D%C3%A9mat&statutRequete=TRAITE_DELIVRE_DEMAT" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=4578e56c-421c-4e6a-b587-a238a665daf8&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=d19650ed-012b-41ec-b7be-9e6ea9101eaa&libelleAction=%C3%80%20valider&statutRequete=A_VALIDER" ||
          match[1] ===
            "/requetes/action/majStatut?idRequete=8ef11b8b-652c-4c6a-ad27-a544fce63999&libelleAction=Prise%20en%20charge&statutRequete=PRISE_EN_CHARGE") &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Création d'une action uniquement (pendant l'update d'une requête délivrance)
      if (
        match[1] ===
          `/requetes/action?idRequete=${idRequeteRDCPourModification}&libelleAction=Requ%C3%AAte%20modifi%C3%A9e` &&
        context.method === "post"
      ) {
        return { data: "123456789" };
      }

      // Prise en charge aléatoire
      if (match[1] === "/requetes/requetealeatoire?type=DELIVRANCE") {
        return {
          data: ReponseAppelMesRequetes[1]
        };
      }
      if (match[1] === "/requetes/requetealeatoire?type=INFORMATION") {
        return {
          data: ReponseAppelMesRequetes[2]
        };
      }
      if (match[1] === "/requetes/requetealeatoire?type=CREATION") {
        return {
          data: reponseMesRequeteCreation
        };
      }

      // Prise en charge requete
      if (
        match[1] ===
        "/requetes/action/majStatut?idRequete=0&libelleAction=Prendre%20en%20charge&statutRequete=PRISE_EN_CHARGE"
      ) {
        return true;
      }

      //Sauvegarde document réponse suite modifier corps extrait
      if (
        match[1] ===
          "/documentsreponses/update/9bfa282d-1e66-4538-b242-b9de4f683f0f" ||
        match[1] ===
          "/documentsreponses/update/3f52370d-14ed-4c55-8cf4-afe006d9aa38"
      ) {
        return { data: ["9bfa282d-1e66-4538-b242-b9de4f683777"] };
      }
      if (
        match[1] ===
        "/documentsreponses/update/9bfa282d-1e66-4538-b272-b9de4g683aaf"
      ) {
        return { data: ["9bfa282d-1e66-4538-b242-b9de4f683777"] };
      }

      const error = {
        msg: "url api requete non mockée",
        url: match[1],
        method: context.method
      };
      const message = `Erreur mock api requete v2: ${JSON.stringify(error)}`;
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
