import { CLES } from "../../model/parametres/clesParametres";
import { GroupementDocument } from "../../model/requete/GroupementDocument";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { StatutRequete as StatutRequeteV2 } from "../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../model/requete/v2/IDocumentReponse";
import { IRequeteDelivrance } from "../../model/requete/v2/IRequeteDelivrance";
import { IRMCRequestRequete } from "../../model/rmc/requete/IRMCRequestRequete";
import { IQueryParameterUpdateStatutRequete } from "../../views/common/hook/UpdateStatutRequeteHook";
import {
  IDocumentDelivre,
  IPieceJustificative
} from "../../views/common/types/RequeteType";
import { SortOrder } from "../../views/common/widget/tableau/TableUtils";
import { ICriteresRMCAuto } from "../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import { ApiManager, HttpMethod } from "../ApiManager";

export const URL_REQUETES_SERVICE = "/requetes/requetesService";
export const URL_REQUETES = "/requetes";
export const URL_MES_REQUETES = "/requetes/mesrequetes";
export const URL_MES_REQUETES_INFORMATION = "/requetes/information/mesrequetes";
export const URL_SAUVEGARDER_REPONSE_REQINFO = "/requetes/information/reponse";
export const URL_INFORMATION_STATUT = "/requetes/information/statut";
export const URL_REQUETES_COUNT = "/requetes/count";
export const URL_DOCUMENTSELIVRES = "/documentsdelivres";
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
export const URL_IGNORER = "/requetes/action/ignorer";
export const URL_REQUETE_ALEATOIRE = "/requetes/requetealeatoire";
export const URL_OPTION_COURRIER = "/optioncourrier";
export const URL_REPONSE_REQ_INFO = "/reponse";

const URL_REPONSES = "/reponses";

export interface IRequestDocumentApiResult {
  documentDelivre: IDocumentDelivre;
  mimeType: string;
}

export enum TypeAppelRequete {
  REQUETE_SERVICE = "requeteService",
  MES_REQUETES = "mesRequetes"
}

export interface IQueryParametersPourRequetes {
  statuts: StatutRequete[];
  tri: string;
  sens: SortOrder;
  range?: string;
  lastDateReaload?: string;
}

export interface IQueryParametersPourRequetesV2 {
  statuts: string[];
  tri: string;
  sens: SortOrder;
  range?: string;
}

export interface IQueryParameterUpdateDocument {
  contenu: string;
  nom: string;
  conteneurSwift: string;
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

const api = ApiManager.getInstance("rece-requete-api", "v1");
const apiV2 = ApiManager.getInstance("rece-requete-api", "v2");

export function getDocument(
  identifiantDocument: string,
  groupement: GroupementDocument
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `/${groupement}/${identifiantDocument}`
  });
}

export function getRequetes(
  typeRequete: TypeAppelRequete,
  listeStatuts: string,
  tri: string,
  sens: SortOrder,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri:
      typeRequete === TypeAppelRequete.REQUETE_SERVICE
        ? URL_REQUETES_SERVICE
        : URL_REQUETES,
    parameters: {
      statuts: listeStatuts,
      tri: tri !== "prioriteRequete" ? tri : "dateStatut",
      sens,
      range
    }
  });
}

export function getRequete(idRequete: string, statut?: string): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}/${idRequete}`,
    parameters: {
      statut
    }
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

export function patchStatutRequete(
  queryParameters: IQueryParameterUpdateStatutRequete
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: URL_REQUETES,
    parameters: { ...queryParameters },
    headers: []
  });
}

export function patchDocumentsDelivresRequetes(
  queryParameters: IQueryParameterUpdateDocument[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: URL_DOCUMENTSELIVRES,
    data: queryParameters,
    headers: []
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

////////////////////////
// Paramètres (utilisé aussi en V2)
////////////////////////
/** Récupération des paramètres de l'api requête */
export function getParametresBaseRequete(): Promise<any> {
  return api.fetchCache({
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
  queryParameters: IQueryParametersPourRequetesV2
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri:
      typeRequete === TypeAppelRequete.REQUETE_SERVICE
        ? URL_REQUETES_SERVICE
        : URL_MES_REQUETES,
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
  queryParameters: IQueryParametersPourRequetesV2
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri: URL_MES_REQUETES_INFORMATION,
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
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}/${idRequete}`
  });
}

export async function getNomenclatureRequete(nom: string): Promise<any> {
  return apiV2.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}/${nom}`
  });
}

export function rechercheMultiCriteresRequetes(
  criteres: IRMCRequestRequete,
  range?: string
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_RMC}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function patchUtilisateurAssigneRequeteV2(
  queryParameters: IQueryParametersAssigneRequetes
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REPONSES}/${queryParameters.idReponse}`,
    parameters: {
      nomOec: queryParameters.nomOec,
      prenomOec: queryParameters.prenomOec
    },
    headers: []
  });
}

export function getCompteurRequetesV2(): Promise<any> {
  return apiV2.fetch({
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
  futurStatut: StatutRequeteV2;
  refus?: boolean;
}): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_DELIVRANCE}`,
    data: requete,
    parameters: {
      refus,
      futurStatut: StatutRequeteV2.getKey(futurStatut)
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
  futurStatut: StatutRequeteV2;
  refus?: boolean;
}): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}`,
    data: requete,
    parameters: {
      refus,
      futurStatut: StatutRequeteV2.getKey(futurStatut)
    }
  });
}

export async function updateChoixDelivrance(
  idRequete: string,
  choixDelivrance: string | null
) {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_CHOIX_DELIVRANCE}`,
    parameters: { choixDelivrance }
  });
}

export async function postSauvCourrierCreerActionMajStatutRequete(
  idRequete: string,
  libelleAction: string,
  statutRequete: StatutRequeteV2,
  requete: Object
) {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_COURRIER}`,
    parameters: {
      idRequete,
      libelleAction,
      statutRequete: StatutRequeteV2.getKey(statutRequete)
    },
    data: requete
  });
}

export async function postSauvDocumentCreerActionMajStatutRequete(
  idRequete: string,
  libelleAction: string,
  statutRequete: StatutRequeteV2,
  requete: Object
) {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_DOCUMENT}`,
    parameters: {
      libelleAction,
      statutRequete: StatutRequeteV2.getKey(statutRequete)
    },
    data: requete
  });
}

export function getDocumentReponseById(idDcumentReponse: string): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri: `${URL_DOCUMENT_REPONSE}/${idDcumentReponse}`
  });
}

export function postDocumentReponseApi(
  idRequete: string,
  documentsReponse: IDocumentReponse[]
) {
  return apiV2.fetch({
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
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES}/${idRequete}${URL_PIECE_COMPLEMENT_INFORMATION}`,
    data: pieceComplementInformation
  });
}

export function deleteDocumentsReponseApi(idRequete: string) {
  return apiV2.fetch({
    method: HttpMethod.DELETE,
    uri: `${URL_DOCUMENT_REPONSE}/${idRequete}`
  });
}

export function getPieceJustificativeById(idPiece: string): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri: `${URL_PIECES_JUSTIFICATIVES}/${idPiece}`
  });
}

export function postPieceJustificative(
  idRequete: string,
  piecesJustificatives: IPieceJustificative[]
) {
  return apiV2.fetch({
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
  statutRequete: StatutRequeteV2
) {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_ACTION}`,
    parameters: {
      idRequete,
      libelleAction,
      statutRequete: StatutRequeteV2.getKey(statutRequete)
    }
  });
}

export function postTransfertRequete(
  idRequete: string,
  idEntite: string,
  idUtilisateur: string,
  libelleAction: string,
  statutRequete: StatutRequeteV2
) {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_TRANSFERT}`,
    parameters: {
      idRequete,
      idEntite,
      idUtilisateur,
      statutRequete: StatutRequeteV2.getKey(statutRequete),
      libelleAction
    }
  });
}

export function postIgnorerRequete(
  idRequete: string,
  texteObservation: string
) {
  return apiV2.fetch({
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
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_RMC_AUTO}`,
    data: criteres,
    parameters: {
      range
    }
  });
}

export function getRequeteAleatoire() {
  return apiV2.fetch({
    method: HttpMethod.GET,
    uri: URL_REQUETE_ALEATOIRE
  });
}

export async function getOptionsCourriers(): Promise<any> {
  return apiV2.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}${URL_OPTION_COURRIER}`
  });
}

export async function getReponsesReqInfo(): Promise<any> {
  return apiV2.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}${URL_REPONSE_REQ_INFO}`
  });
}

export async function sauvegarderReponseReqInfo(
  idRequete: string,
  corpsMailReponse: string,
  idReponse?: string
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_SAUVEGARDER_REPONSE_REQINFO}/${idRequete}`,
    data: { corpsMail: corpsMailReponse, idReponse: `${idReponse}` }
  });
}

export async function updateStatutRequeteInformation(
  idRequete: string,
  statutDemande: StatutRequeteV2
): Promise<any> {
  return apiV2.fetch({
    method: HttpMethod.PATCH,
    uri: `${URL_INFORMATION_STATUT}/${idRequete}`,
    parameters: {
      statut: statutDemande.nom
    }
  });
}
