import { ApiManager, HttpMethod } from "../ApiManager";
import { GroupementDocument } from "../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../../views/common/types/RequeteType";
import { IQueryParameterUpdateStatutRequete } from "../../views/common/hook/UpdateStatutRequeteHook";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { SortOrder } from "../../views/common/widget/tableau/TableUtils";
import { IRMCRequestRequete } from "../../model/rmc/requete/IRMCRequestRequete";

export const URL_REQUETES_SERVICE = "/requetes/requetesService";
export const URL_REQUETES = "/requetes";
export const URL_REQUETES_COUNT = "/requetes/count";
export const URL_DOCUMENTSELIVRES = "/documentsdelivres";
export const URL_REQUETES_RMC = "/requetes/rmc";
export const URL_NOMENCLATURE = "/nomenclature";
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

export async function getNomenclatureRequete(categorie: string): Promise<any> {
  return apiV2.fetchCache({
    method: HttpMethod.GET,
    uri: `${URL_NOMENCLATURE}/${categorie}`
  });
}
