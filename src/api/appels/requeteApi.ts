import { CLES } from "../../model/parametres/clesParametres";
import { StatutRequete } from "../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../model/requete/IRequeteDelivrance";
import { IRMCRequestRequete } from "../../model/rmc/requete/IRMCRequestRequete";
import {
  IDocumentDelivre,
  IPieceJustificative
} from "../../views/common/types/RequeteType";
import { SortOrder } from "../../views/common/widget/tableau/TableUtils";
import { ICriteresRMCAuto } from "../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import { ApiManager, HttpMethod } from "../ApiManager";

export const URL_REQUETES_DELIVRANCE_SERVICE = "/requetes/requetesService";
export const URL_REQUETES_INFO_SERVICE =
  "/requetes/information/requetesService";
export const URL_REQUETES = "/requetes";
export const URL_MES_REQUETES_DELIVRANCE = "/requetes/mesrequetes";
export const URL_MES_REQUETES_INFO = "/requetes/information/mesrequetes";
export const URL_SAUVEGARDER_REPONSE_REQINFO = "/requetes/information/reponse";
export const URL_INFORMATION_STATUT = "/requetes/information/statut";
export const URL_REQUETES_COUNT = "/requetes/count";
export const URL_REQUETES_RMC = "/requetes/rmc";
export const URL_REQUETES_RMC_AUTO = "/requetes/rmcauto";
export const URL_NOMENCLATURE = "/nomenclature";
export const URL_REQUETES_DELIVRANCE = "/requetes/delivrance";
export const URL_CHOIX_DELIVRANCE = "/choixdelivrance";
export const URL_COURRIER = "/courrier";
export const URL_DOCUMENT = "/document";
export const URL_DOCUMENT_REPONSE = "/documentsreponses";
export const URL_PIECE_COMPLEMENT_INFORMATION = "/piececomplementinformation";
export const URL_PIECES_JUSTIFICATIVES = "/piecesjustificatives";
export const URL_PARAMETRE = "/parametres";
export const URL_ACTION = "/requetes/action";
export const URL_TRANSFERT = "/requetes/action/transfert";
export const URL_OBSERVATION = "/requetes/observation";
export const URL_IGNORER = "/requetes/action/ignorer";
export const URL_REQUETE_ALEATOIRE = "/requetes/requetealeatoire";
export const URL_OPTION_COURRIER = "/optioncourrier";
export const URL_REPONSE_REQ_INFO = "/reponse";
export const URL_NB_REQ_INFO = "/requetes/information/count";

const URL_REPONSES = "/reponses";

export interface IRequestDocumentApiResult {
  documentDelivre: IDocumentDelivre;
  mimeType: string;
}

export enum TypeAppelRequete {
  REQUETE_DELIVRANCE_SERVICE = "requeteService",
  REQUETE_INFO_SERVICE = "requeteInfoService",
  MES_REQUETES_DELIVRANCE = "mesRequetes",
  MES_REQUETES_INFO = "mesRequetesInfo"
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

const apiV1 = ApiManager.getInstance("rece-requete-api", "v1");
const api = ApiManager.getInstance("rece-requete-api", "v2");

////////////////////////
// Paramètres (utilisé aussi en V2)
////////////////////////
/** Récupération des paramètres de l'api requête */
export function getParametresBaseRequete(): Promise<any> {
  return apiV1.fetchCache({
    method: HttpMethod.POST,
    uri: `${URL_PARAMETRE}`,
    data: CLES
  });
}

////////////////////////
/*** API REQUETE V2 ***/
////////////////////////

export function getMesRequetesDelivrance(
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

export function getMesRequetesInformation(
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

export function getDetailRequete(idRequete: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}/${idRequete}`
  });
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

export function getCompteurRequetes(): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: URL_REQUETES_COUNT,
    parameters: {
      statuts: "A_SIGNER"
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

export async function postSauvCourrierCreerActionMajStatutRequete(
  idRequete: string,
  libelleAction: string,
  statutRequete: StatutRequete,
  requete: Object
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

export function getDocumentReponseById(idDcumentReponse: string): Promise<any> {
  return api.fetchCache({
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

export function deleteDocumentsReponseApi(idRequete: string) {
  return api.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_DOCUMENT_REPONSE}/${idRequete}`
  });
}

export function getPieceJustificativeById(idPiece: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_PIECES_JUSTIFICATIVES}/${idPiece}`
  });
}

export function postPieceJustificative(
  idRequete: string,
  piecesJustificatives: IPieceJustificative[]
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_PIECES_JUSTIFICATIVES}`,
    data: {
      idRequete,
      piecesJustificatives
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
    uri: `${URL_ACTION}`,
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
  statutRequete: StatutRequete
) {
  return api.fetch({
    method: HttpMethod.POST,
    uri: `${URL_TRANSFERT}`,
    parameters: {
      idRequete,
      idEntite,
      idUtilisateur,
      statutRequete: StatutRequete.getKey(statutRequete),
      libelleAction
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
  criteres: ICriteresRMCAuto,
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
    data: { corpsMail: corpsMailReponse, idReponse: `${idReponse}` }
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

export function patchDocumentsReponses(
  miseAJourDocumentParams: IMiseAJourDocumentParams[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: URL_DOCUMENT_REPONSE,
    data: miseAJourDocumentParams,
    headers: []
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
