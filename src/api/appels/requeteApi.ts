import { ISaisieRequeteAEnvoyer } from "@hook/requete/CreationRequeteCreationApiHook";
import { FiltresReqDto } from "@hook/requete/creation/RequeteCreationApiHook";
import { CLES } from "@model/parametres/clesParametres";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import {
  ICriteresRMCAutoRequete,
  IRMCRequestRequete
} from "@model/rmc/requete/IRMCRequestRequete";
import { SortOrder } from "@widget/tableau/TableUtils";
import { ApiManager, HttpMethod } from "../ApiManager";
import { URL_MENTION } from "./etatcivilApi";

export const URL_REQUETES_DELIVRANCE_SERVICE = "/requetes/requetesService";
export const URL_REQUETES_INFO_SERVICE =
  "/requetes/information/requetesService";
export const URL_REQUETES_CREATION_SERVICE =
  "/requetes/creation/requetesService";
export const URL_REQUETES = "/requetes";
export const URL_MES_REQUETES_DELIVRANCE = "/requetes/mesrequetes";
export const URL_MES_REQUETES_INFO = "/requetes/information/mesrequetes";
export const URL_MES_REQUETES_CREATION = "/requetes/creation/mesrequetes";
export const URL_CREATION = "/requetes/creation/";
export const URL_SAUVEGARDER_REPONSE_REQINFO = "/requetes/information/reponse";
export const URL_INFORMATION_STATUT = "/requetes/information/statut";
export const URL_REQUETES_COUNT = "/requetes/count";
export const URL_REQUETES_RMC = "/requetes/rmc";
export const URL_REQUETES_RMC_AUTO = "/requetes/rmcauto";
export const URL_NOMENCLATURE = "/nomenclature";
export const URL_REQUETES_DELIVRANCE = "/requetes/delivrance";
export const URL_REQUETES_CREATIONS = "/requetes/creations";
export const URL_REQUETES_CREATION = "/requetes/creation";
export const URL_REQUETES_CREATION_TRANSMISSION_ENTITE =
  "/requetes/creationsTransmissionEntite";
export const URL_CHOIX_DELIVRANCE = "/choixdelivrance";
export const URL_COURRIER = "/courrier";
export const URL_DOCUMENT = "/document";
export const URL_DOCUMENT_REPONSE = "/documentsreponses";
export const URL_PIECES_COMPLEMENT_INFORMATION =
  "/piecescomplementinformations";
export const URL_PIECE_COMPLEMENT_INFORMATION = "/piececomplementinformation";
export const URL_PIECES_JUSTIFICATIVES = "/piecesjustificatives";
export const URL_PIECE_JUSTIFICATIVE = "/piecejustificative";
export const URL_FICHIER_PIECE_JUSTIFICATIVE =
  "/requetes/fichierpiecejustificative/";
export const URL_LIBELLE = "/libelle";
export const URL_PARAMETRE = "/parametres";
export const URL_ACTION = "/requetes/action";
export const URL_ACTION_MAJ_STATUT = "/requetes/action/majStatut";
export const URL_TRANSFERT = "/requetes/action/transfert";
export const URL_TRANSFERT_VALIDEUR = "/requetes/action/transfertValideur";
export const URL_RETOUR_VALIDEUR = "/requetes/action/retourValideur";
export const URL_OBSERVATION = "/requetes/observation";
export const URL_IGNORER = "/requetes/action/ignorer";
export const URL_REQUETE_ALEATOIRE = "/requetes/requetealeatoire";
export const URL_REQUETE_PLUS_ANCIENNE = "/requetes/requeteplusancienne";
export const URL_OPTION_COURRIER = "/optioncourrier";
export const URL_REPONSE_REQ_INFO = "/reponse";
export const URL_NB_REQ_INFO = "/requetes/information/count";
export const URL_ECHANGE = "/echange";
export const URL_ECHANGE_STATUT = "/requetes/action/retourSdanf";
export const URL_DOCUMENT_COMPLEMENTAIRE =
  "/documentsreponses/documentComplementaire";
export const URL_RECHERCHE_REQ_NATALI =
  "/requetes/creation/natali/numeroDossierNational";
export const URL_SAUVEGARDE_PERSONNE_ACTE_RMC =
  "/requetes/creation/sauvegardeDetailsRMC";

const URL_REPONSES = "/reponses";

export enum TypeAppelRequete {
  REQUETE_DELIVRANCE_SERVICE = "requeteService",
  REQUETE_INFO_SERVICE = "requeteInfoService",
  REQUETE_CREATION_SERVICE = "requeteCreationService",
  MES_REQUETES_DELIVRANCE = "mesRequetes",
  MES_REQUETES_INFO = "mesRequetesInfo",
  MES_REQUETES_CREATION = "mesRequetesCreation"
}

export interface IQueryParametersPourRequetes {
  statuts: string[];
  tri: string;
  sens: SortOrder;
  range?: string;
}

export interface IMiseAJourDocumentParams {
  contenu: string;
  nom: string;
  conteneurSwift: string;
  id: string;
}

export interface IQueryParametersAssigneRequetes {
  idReponse?: string;
  nomOec: string;
  prenomOec: string;
}

export interface IQueryParametersPourRequete {
  statut?: StatutRequete;
  idRequete: string;
}

const api = ApiManager.getInstance("rece-requete-api", "v2");

////////////////////////
/*** API REQUETE V2 ***/
////////////////////////
export function getParametresBaseRequete(): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.POST,
    uri: `${URL_PARAMETRE}`,
    data: CLES
  });
}

export function getRequetesDelivrance(
  typeRequete: TypeAppelRequete,
  listeStatuts: string,
  queryParameters: IQueryParametersPourRequetes
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri:
      typeRequete === TypeAppelRequete.REQUETE_DELIVRANCE_SERVICE
        ? URL_REQUETES_DELIVRANCE_SERVICE
        : URL_MES_REQUETES_DELIVRANCE,
    parameters: {
      statuts: listeStatuts,
      tri:
        queryParameters.tri !== "prioriteRequete"
          ? queryParameters.tri
          : "dateStatut",
      sens: queryParameters.sens,
      range: queryParameters.range
    }
  });
}

export function getRequetesInformation(
  listeStatuts: string,
  typeRequete: TypeAppelRequete,
  queryParameters: IQueryParametersPourRequetes
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri:
      typeRequete === TypeAppelRequete.REQUETE_INFO_SERVICE
        ? URL_REQUETES_INFO_SERVICE
        : URL_MES_REQUETES_INFO,
    parameters: {
      statuts: listeStatuts,
      tri:
        queryParameters.tri !== "prioriteRequete"
          ? queryParameters.tri
          : "dateStatut",
      sens: queryParameters.sens,
      range: queryParameters.range
    }
  });
}

export function getRequetesCreation(
  listeStatuts: string,
  queryParameters: IQueryParametersPourRequetes
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_MES_REQUETES_CREATION,
    parameters: {
      statuts: listeStatuts,
      tri:
        queryParameters.tri !== "prioriteRequete"
          ? queryParameters.tri
          : "dateStatut",
      sens: queryParameters.sens,
      range: queryParameters.range
    }
  });
}

export function postRequetesServiceCreation(
  queryParameters: IQueryParametersPourRequetes,
  filtresReq: FiltresReqDto
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: URL_REQUETES_CREATION_SERVICE,
    parameters: {
      tri:
        queryParameters.tri !== "prioriteRequete"
          ? queryParameters.tri
          : "dateStatut",
      sens: queryParameters.sens,
      range: queryParameters.range
    },
    data: filtresReq
  });
}

export function getDetailRequete(
  idRequete: string,
  estConsultation = false
): Promise<any> {
  let config: any = {
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}/${idRequete}`
  };
  if (estConsultation) {
    config = {
      ...config,
      parameters: {
        isConsultation: estConsultation
      }
    };
  }
  return api.fetch(config);
}

export async function getNomenclatureRequete(nom: string): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}/${nom}`
  });
}

export function rechercheMultiCriteresRequetes(
  criteres: IRMCRequestRequete,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_RMC}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function patchUtilisateurAssigneRequete(
  queryParameters: IQueryParametersAssigneRequetes
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REPONSES}/${queryParameters.idReponse}`,
    parameters: {
      nomOec: queryParameters.nomOec,
      prenomOec: queryParameters.prenomOec
    },
    headers: []
  });
}

export function getCompteurRequetes(statuts: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_REQUETES_COUNT,
    parameters: {
      statuts
    }
  });
}

export async function creationRequeteDelivrance({
  requete,
  futurStatut,
  refus = false
}: {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_DELIVRANCE}`,
    data: requete,
    parameters: {
      refus,
      futurStatut: StatutRequete.getKey(futurStatut)
    }
  });
}

export async function updateRequeteDelivrance({
  idRequete,
  requete,
  futurStatut,
  refus = false
}: {
  idRequete: string;
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}`,
    data: requete,
    parameters: {
      refus,
      futurStatut: StatutRequete.getKey(futurStatut)
    }
  });
}

export async function updateChoixDelivrance(
  idRequete: string,
  choixDelivrance: string | null
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_CHOIX_DELIVRANCE}`,
    parameters: { choixDelivrance }
  });
}

export async function creationRequeteCreation(requete: ISaisieRequeteAEnvoyer) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_CREATIONS}`,
    data: [requete]
  });
}

export async function updateRequeteCreation(
  idRequete: string,
  requete: ISaisieRequeteAEnvoyer
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_CREATION}/${idRequete}`,
    data: requete
  });
}

export async function creationRequeteCreationEtTransmissionEntite(
  requete: ISaisieRequeteAEnvoyer,
  idEntiteRattachement: string
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_CREATION_TRANSMISSION_ENTITE}?idEntiteRattachement=${idEntiteRattachement}`,
    data: [requete]
  });
}

export async function postSauvCourrierCreerActionMajStatutRequete(
  idRequete: string,
  statutRequete: StatutRequete,
  requete: Object,
  libelleAction?: string
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_COURRIER}`,
    parameters: {
      idRequete,
      libelleAction,
      statutRequete: StatutRequete.getKey(statutRequete)
    },
    data: requete
  });
}

export async function postSauvDocumentCreerActionMajStatutRequete(
  idRequete: string,
  libelleAction: string,
  statutRequete: StatutRequete,
  document: Object
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_DOCUMENT}`,
    parameters: {
      libelleAction,
      statutRequete: StatutRequete.getKey(statutRequete)
    },
    data: document
  });
}

export async function postSauvegarderDocument(
  idRequete: string,
  documents: IDocumentReponse[]
) {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_DOCUMENT_REPONSE}/update/${idRequete}`,
    data: documents
  });
}

export function patchDocumentsReponsesAvecSignature(
  miseAJourDocumentParams: IMiseAJourDocumentParams[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: URL_DOCUMENT_REPONSE,
    data: miseAJourDocumentParams,
    headers: []
  });
}

export function deleteDocumentsReponseApi(idRequete: string) {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_DOCUMENT_REPONSE}/${idRequete}`
  });
}

export function getDocumentReponseById(idDcumentReponse: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_DOCUMENT_REPONSE}/${idDcumentReponse}`
  });
}

export function postDocumentReponseApi(
  idRequete: string,
  documentsReponse: IDocumentReponse[]
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_DOCUMENT_REPONSE}`,
    data: {
      idRequete,
      documentsReponse
    }
  });
}
export function getPieceComplementInformationById(
  idPiece: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}${URL_PIECES_COMPLEMENT_INFORMATION}/${idPiece}`
  });
}

export function postPieceComplementInformationApi(
  idRequete: string,
  pieceComplementInformation: any
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES}/${idRequete}${URL_PIECE_COMPLEMENT_INFORMATION}`,
    data: pieceComplementInformation
  });
}

export function getPieceJustificativeById(idPiece: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}${URL_PIECES_JUSTIFICATIVES}/${idPiece}`
  });
}

export function postPieceJustificative(
  idRequete: string,
  pieceJustificative: IPieceJustificative
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES}/${idRequete}${URL_PIECE_JUSTIFICATIVE}`,
    data: pieceJustificative
  });
}

export function postCreationAction(idRequete: string, libelleAction: string) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTION}`,
    parameters: {
      idRequete,
      libelleAction
    }
  });
}

export function postCreationActionEtMiseAjourStatut(
  idRequete: string,
  libelleAction: string,
  statutRequete: StatutRequete
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTION_MAJ_STATUT}`,
    parameters: {
      idRequete,
      libelleAction,
      statutRequete: StatutRequete.getKey(statutRequete)
    }
  });
}

export function postTransfertRequete(
  idRequete: string,
  idEntite: string,
  idUtilisateur: string,
  libelleAction: string,
  statutRequete: StatutRequete,
  estTransfert: boolean
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_TRANSFERT}`,
    parameters: {
      idRequete,
      idEntite,
      idUtilisateur,
      statutRequete: StatutRequete.getKey(statutRequete),
      libelleAction,
      attribuer: !estTransfert
    }
  });
}

export function postTransfertValideur(
  idRequete: string,
  idUtilisateurValideur: string,
  libelleAction: string,
  texteObservation: string
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_TRANSFERT_VALIDEUR}`,
    data: {
      idRequete,
      idUtilisateurValideur,
      libelleAction,
      texteObservation
    }
  });
}

export function postRetourValideur(
  idRequete: string,
  statutDemande: string,
  libelleAction: string,
  texteObservation: string
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_RETOUR_VALIDEUR}`,
    data: {
      idRequete,
      statutDemande,
      libelleAction,
      texteObservation
    }
  });
}

export function postIgnorerRequete(
  idRequete: string,
  texteObservation: string
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: URL_IGNORER,
    parameters: {
      idRequete,
      texteObservation
    }
  });
}

export function rechercheMultiCriteresAutoRequetes(
  criteres: ICriteresRMCAutoRequete,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_RMC_AUTO}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function getRequeteAleatoire(type: string) {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_REQUETE_ALEATOIRE,
    parameters: {
      type
    }
  });
}

export function getRequetePlusAncienne(type: string) {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_REQUETE_PLUS_ANCIENNE,
    parameters: {
      type
    }
  });
}

export async function getOptionsCourriers(): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}${URL_OPTION_COURRIER}`
  });
}

export async function getReponsesReqInfo(): Promise<any> {
  return api.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}${URL_REPONSE_REQ_INFO}`
  });
}

export async function sauvegarderReponseReqInfo(
  idRequete: string,
  corpsMailReponse: string,
  idReponse?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_SAUVEGARDER_REPONSE_REQINFO}/${idRequete}`,
    data: { corpsMail: corpsMailReponse, idReponse }
  });
}

export async function updateStatutRequeteInformation(
  idRequete: string,
  statutDemande: StatutRequete
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_INFORMATION_STATUT}/${idRequete}`,
    parameters: {
      statut: statutDemande.nom
    }
  });
}

export async function updateStatutRequeteCreation(
  idRequete: string,
  statutDemande: StatutRequete
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_CREATION}${idRequete}/statut`,
    parameters: {
      statut: statutDemande.nom
    }
  });
}

export function getNbReqInfo(listeStatuts: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_NB_REQ_INFO,
    parameters: {
      statuts: listeStatuts
    }
  });
}

export function postObservation(
  idRequete: string,
  texteObservation: string,
  idObservation?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.POST,
    uri: URL_OBSERVATION,
    parameters: {
      idRequete,
      texteObservation,
      idObservation
    }
  });
}

export function deleteObservation(idObservation: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: URL_OBSERVATION,
    parameters: {
      idObservation
    }
  });
}

export function updateDocumentMention(
  id: string,
  mentionsRetirees?: string[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_DOCUMENT_REPONSE}/${id}${URL_MENTION}`,
    data: mentionsRetirees ? mentionsRetirees : []
  });
}

export function deleteDocumentComplementaire(
  idDocumentReponse: string,
  idRequete: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_DOCUMENT_COMPLEMENTAIRE}/${idDocumentReponse}`,
    parameters: {
      idRequete
    }
  });
}

export function postMessageRetourSDANF(idRequete: string, message: IEchange) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_CREATION}${idRequete}${URL_ECHANGE}`,
    data: message
  });
}

export function postMessageRetourSDANFEtUpdateStatutRequete(
  idRequete: string,
  message: IEchange
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ECHANGE_STATUT}`,
    parameters: {
      idRequete
    },
    data: message
  });
}

export const patchMiseAJourLibellePJ = (
  idPJ: string,
  nouveauLibelle: string
): Promise<any> =>
  api.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_FICHIER_PIECE_JUSTIFICATIVE}${idPJ}${URL_LIBELLE}`,
    parameters: {
      nouveauLibelle
    }
  });

export const getReqNataliById = (id: string): Promise<any> => {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_RECHERCHE_REQ_NATALI}/${id}`
  });
};

export const postSauvegardePersonneEtActeSelectionne = (
  id: string,
  data: any
): Promise<any> => {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_SAUVEGARDE_PERSONNE_ACTE_RMC}/${id}`,
    data: data
  });
};
