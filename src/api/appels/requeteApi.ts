import { ApiManager, HttpMethod } from "../ApiManager";
import { GroupementDocument } from "../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../../views/common/types/RequeteType";
import { ApiEndpoints } from "../../views/router/UrlManager";
import { IQueryParameterUpdateStatutRequete } from "../../views/common/hook/UpdateStatutRequeteHook";
import { IOfficierSSOApi } from "../../views/core/login/LoginHook";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { SortOrder } from "../../views/common/widget/tableau/TableUtils";

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
  officier: IOfficierSSOApi,
  listeStatuts: string,
  tri: string,
  sens: SortOrder,
  range?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri:
      typeRequete === TypeAppelRequete.REQUETE_SERVICE
        ? ApiEndpoints.RequetesServiceUrl
        : ApiEndpoints.RequetesUrl,
    parameters: {
      nomOec: officier.nom,
      prenomOec: officier.prenom,
      statuts: listeStatuts,
      tri: tri !== "prioriteRequete" ? tri : "dateStatut",
      sens,
      range,
      idArobas: officier.idSSO
    }
  });
}

export function getRequete(
  officier: IOfficierSSOApi,
  idRequete: string,
  statut?: string
): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${ApiEndpoints.RequetesUrl}/${idRequete}`,
    parameters: {
      nomOec: officier.nom,
      prenomOec: officier.prenom,
      statut
    }
  });
}

export function getCompteurRequetes(officier: IOfficierSSOApi): Promise<any> {
  return api.fetch({
    method: HttpMethod.GET,
    uri: `${ApiEndpoints.RequetesCountUrl}`,
    parameters: {
      nomOec: officier.nom,
      prenomOec: officier.prenom,
      statuts: "A_SIGNER"
    }
  });
}

export function patchStatutRequete(
  queryParameters: IQueryParameterUpdateStatutRequete
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: ApiEndpoints.RequetesUrl,
    parameters: { ...queryParameters },
    headers: []
  });
}

export function patchDocumentsDelivresRequetes(
  queryParameters: IQueryParameterUpdateDocument[]
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: ApiEndpoints.DocumentsdelivresUrl,
    data: queryParameters,
    headers: []
  });
}

export function patchUtilisateurAssigneRequete(
  queryParameters: IQueryParametersAssigneRequetes
): Promise<any> {
  return api.fetch({
    method: HttpMethod.PATCH,
    uri: `${ApiEndpoints.ReponsesUrl}/${queryParameters.idReponse}`,
    parameters: {
      nomOec: queryParameters.nomOec,
      prenomOec: queryParameters.prenomOec
    },
    headers: []
  });
}
