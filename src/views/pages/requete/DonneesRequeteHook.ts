import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import moment from "moment";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { QualiteRequerant } from "../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../model/requete/SousQualiteRequerant";
import { SortOrder } from "../../common/widget/tableau/TableUtils";
import { Canal } from "../../../model/Canal";
import {
  IPieceJustificative,
  IDocumentDelivre
} from "./visualisation/RequeteType";
import { ApiEndpoints } from "../../router/UrlManager";
import { IDataTable } from "./MesRequetesPage";
import { Motif } from "../../../model/requete/Motif";

export interface IRequerantApi {
  uidRequerant: string;
  qualite: QualiteRequerant;
  typeRequerant: SousQualiteRequerant;
  nomAdministration: string;
  identite: string;
  raisonSociale: string;
  nomFamille: string;
  nomUsage: string;
  prenom: string;
  libelleRequerant: string;
  adresse: string;
  ligne2: string;
  ligne3: string;
  ligne4: string;
  ligne5: string;
  codePostale: number;
  ville: string;
  pays: string;
  mail: string;
  telephone: string;
}

export interface IReponseApi {
  idReponse: string;
  dateTraitementDemat: number;
  dateDelivrance: number;
  natureActe: NatureActe;
  jourEvenement: number;
  moisEvenement: number;
  anneeEvenement: number;
  villeEvenement: string;
  paysEvenement: string;
  nomOec: string;
  prenomOec: string;
  commentaire: string;
  documentsDelivres: IDocumentDelivre[];
  requete: string;
}

export interface IRequeteApi {
  anneeEvenement: number;
  dateCreation: number;
  dateDerniereMaj: number;
  dateStatut: number;
  idRequete: string;
  idSagaDila: number;
  idRequeteInitiale: number;
  jourEvenement: number;
  moisEvenement: number;
  natureActe: NatureActe;
  canal: Canal;
  motif: Motif;
  nbExemplaire: number;
  paysEvenement: string;
  piecesJustificatives: IPieceJustificative[];
  provenance: CanalProvenance;
  reponse: IReponseApi;
  requerant: IRequerantApi;
  sousTypeRequete: SousTypeRequete;
  statut: StatutRequete;
  titulaires: any;
  typeActe: any;
  typeRequete: TypeRequete;
  villeEvenement: "string;";
}

export interface IQueryParametersPourRequetes {
  statut: StatutRequete;
  nomOec?: string;
  prenomOec?: string;
  service?: string;
  tri?: string;
  sens?: SortOrder;
  range?: string;
}

export function useRequeteApi(queryParameters: IQueryParametersPourRequetes) {
  const [dataState, setDataState] = useState<IDataTable[]>();
  const [rowsNumberState, setRowsNumberState] = useState<number>();
  const [minRangeState, setMinRangeState] = useState<number>();
  const [maxRangeState, setMaxRangeState] = useState<number>();
  const [previousDataLinkState, setPreviousDataLinkState] = useState<string>();
  const [nextDataLinkState, setNextDataLinkState] = useState<string>();
  const [errorState, setErrorState] = useState(undefined);
  const contentRange = "Content-Range";

  useEffect(() => {
    setDataState(undefined);
    setErrorState(undefined);
    setRowsNumberState(undefined);
    setMinRangeState(undefined);
    setMaxRangeState(undefined);
    setPreviousDataLinkState(undefined);
    setNextDataLinkState(undefined);
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    api
      .fetch({
        method: HttpMethod.GET,
        uri: ApiEndpoints.RequetesUrl,
        parameters: {
          nomOec: queryParameters.nomOec,
          prenomOec: queryParameters.prenomOec,
          service: queryParameters.service,
          statut: queryParameters.statut,
          tri:
            queryParameters.tri !== "prioriteRequete"
              ? queryParameters.tri
              : "dateStatut",
          sens: queryParameters.sens,
          range: queryParameters.range
        }
      })
      .then(result => {
        setDataState(reponseRequeteMapper(result.body.data));
        const rowsNumber: number = +(result.body.httpHeaders[
          contentRange
        ][0] as string).split("/")[1];
        setRowsNumberState(rowsNumber);
        const minRange: number = +(result.body.httpHeaders[
          contentRange
        ][0] as string)
          .split("/")[0]
          .split("-")[0];
        setMinRangeState(minRange);
        const maxRange: number = +(result.body.httpHeaders[
          contentRange
        ][0] as string)
          .split("/")[0]
          .split("-")[1];
        setMaxRangeState(maxRange);
        const { nextLink, prevLink } = parseLink(
          result.body.httpHeaders["Link"][0],
          api
        );
        setPreviousDataLinkState(prevLink);
        setNextDataLinkState(nextLink);
      })
      .catch(error => {
        setErrorState(error);
      });
  }, [
    queryParameters.nomOec,
    queryParameters.prenomOec,
    queryParameters.statut,
    queryParameters.tri,
    queryParameters.sens,
    queryParameters.range,
    queryParameters.service
  ]);

  return {
    dataState,
    previousDataLinkState,
    nextDataLinkState,
    rowsNumberState,
    minRangeState,
    maxRangeState,
    errorState
  };
}

function reponseRequeteMapper(data: IRequeteApi[]): IDataTable[] {
  const result: IDataTable[] = [];
  data.forEach(element => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

export function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  return {
    idRequete: data.idRequete,
    idSagaDila: +data.idSagaDila,
    dateCreation: moment.unix(data.dateCreation).format("DD/MM/YYYY"),
    dateDerniereMaj: moment.unix(data.dateDerniereMaj).format("DD/MM/YYYY"),
    provenance: data.provenance,
    statut: data.statut,
    dateStatut: moment.unix(data.dateStatut).format("DD/MM/YYYY"),
    idRequeteInitiale: data.idRequeteInitiale,
    sousTypeRequete: data.sousTypeRequete,
    typeRequete: data.typeRequete,
    natureActe: data.natureActe,
    prioriteRequete: "TODO",
    villeEvenement: data.villeEvenement,
    paysEvenement: data.paysEvenement,
    requerant: createLibelleRequerant(data.requerant),
    titulaires: data.titulaires,
    canal: data.canal,
    motif: data.motif,
    piecesJustificatives: data.piecesJustificatives,
    nomOec: `${data.reponse?.prenomOec} ${data.reponse?.nomOec}`,
    typeActe: data.typeActe,
    reponse: data.reponse
  };
}

function createLibelleRequerant(data: IRequerantApi) {
  if (data.qualite === QualiteRequerant.MandataireHabilite) {
    data.libelleRequerant = data.raisonSociale + " / " + data.identite;
  } else if (data.qualite === QualiteRequerant.Administration) {
    data.libelleRequerant = data.nomAdministration;
  } else if (data.qualite === QualiteRequerant.Particulier) {
    data.libelleRequerant = data.prenom + " " + data.nomFamille;
  }
  return data;
}

function parseLink(linkHeader: string, api: ApiManager) {
  let nextLink;
  let prevLink;
  if (linkHeader.indexOf(`rel="next"`) > 0) {
    nextLink = linkHeader
      .split(`;rel="next"`)[0]
      .replace("<", "")
      .replace(">", "");
    nextLink = `${api.url}:${api.ports}${nextLink}`;
  }
  if (linkHeader.indexOf(`rel="prev"`) > 0) {
    prevLink = linkHeader
      .replace(`<${nextLink}>;rel="next",`, "")
      .split(`;rel="prev"`)[0]
      .replace("<", "")
      .replace(">", "");
    prevLink = `${api.url}:${api.ports}${prevLink}`;
  }

  return { nextLink, prevLink };
}
