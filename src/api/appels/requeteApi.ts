import { GroupementDocument } from "../../model/requete/GroupementDocument";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { IRequeteDelivrance } from "../../model/requete/v2/IRequeteDelivrance";
import { IRMCRequestRequete } from "../../model/rmc/requete/IRMCRequestRequete";
import { IQueryParameterUpdateStatutRequete } from "../../views/common/hook/UpdateStatutRequeteHook";
import { IDocumentDelivre } from "../../views/common/types/RequeteType";
import { SortOrder } from "../../views/common/widget/tableau/TableUtils";
import { ApiManager, HttpMethod } from "../ApiManager";

export const URL_REQUETES_SERVICE = "/requetes/requetesService";
export const URL_REQUETES = "/requetes";
export const URL_MES_REQUETES = "/requetes/mesrequetes";
export const URL_REQUETES_COUNT = "/requetes/count";
export const URL_DOCUMENTSELIVRES = "/documentsdelivres";
export const URL_REQUETES_RMC = "/requetes/rmc";
export const URL_NOMENCLATURE = "/nomenclature";
export const URL_REQUETES_DELIVRANCE = "/requetes/delivrance";

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

export function getDocumentASigner(
  identifiantDocument: string,
  groupement: GroupementDocument
): Promise<any> {
  const groupementEndPoint: string =
    groupement !== GroupementDocument.DocumentAsigner
      ? groupement
      : GroupementDocument.CourrierAccompagnement;
  return api.fetch({
    method: HttpMethod.GET,
    uri: `/${groupementEndPoint}/${identifiantDocument}`
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
/*** API REQUETE V2 ***/
////////////////////////

export function getMesRequetes(
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

export async function creationRequeteDelivrance(requete: IRequeteDelivrance) {
  return apiV2.fetch({
    method: HttpMethod.POST,
    uri: `${URL_REQUETES_DELIVRANCE}`,
    data: requete
  });
}
