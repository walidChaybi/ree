import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { IDataTable } from "./RequeteTableauHeaderCell";
import moment from "moment";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { QualiteRequerant } from "../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../model/requete/SousQualiteRequerant";
import { SortOrder } from "./tableau/TableUtils";
import { Canal } from "../../../model/Canal";

export interface IRequerantApi {
  adresse: string;
  idRequerant: string;
  nomOuRaisonSociale: string;
  nomUsage: string;
  prenomUsage: string;
  qualiteRequerant: QualiteRequerant;
  requete: any;
  telephone: string;
  typeRequerant: SousQualiteRequerant;
}

export interface IReponseApi {
  idReponse: string;
  dateTraitementDemat: number;
  dateDelivrance: number;
  natureAct: NatureActe;
  jourEvenement: number;
  moisEvenement: number;
  anneeEvenement: number;
  villeEvenement: string;
  paysEvenement: string;
  nomOec: string;
  prenomOec: string;
  commentaire: string;
  documentDelivre: any[];
  requete: string;
}

export interface IRequeteApi {
  anneeEvenement: number;
  dateCreation: number;
  dateDerniereMaj: number;
  dateStatut: number;
  idRequete: string;
  idSagaDila: number;
  jourEvenement: number;
  moisEvenement: number;
  natureActe: NatureActe;
  canal: Canal;
  nbExemplaire: number;
  paysEvenement: string;
  picesJustificatives: any;
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
  nomOec: string;
  prenomOec: string;
  statut: StatutRequete;
  tri?: string;
  sens?: SortOrder;
}

export function useRequeteApi(queryParameters: IQueryParametersPourRequetes) {
  const [dataState, setDataState] = useState<IDataTable[]>();
  const [rowsNumberState, setRowsNumberState] = useState<number>();
  const [minRangeState, setMinRangeState] = useState<number>();
  const [maxRangeState, setMaxRangeState] = useState<number>();
  const [previousDataLinkState, setPreviousDataLinkState] = useState<string>();
  const [nextDataLinkState, setNextDataLinkState] = useState<string>();
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    setDataState(undefined);
    setErrorState(undefined);
    setRowsNumberState(undefined);
    setMinRangeState(undefined);
    setMaxRangeState(undefined);
    setPreviousDataLinkState(undefined);
    setNextDataLinkState(undefined);
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    console.log(
      "Call API /requetes",
      queryParameters.nomOec,
      queryParameters.prenomOec,
      queryParameters.statut,
      queryParameters.tri,
      queryParameters.sens
    );
    api
      .fetch({
        method: HttpMethod.GET,
        uri: "/requetes",
        parameters: {
          nomOec: queryParameters.nomOec,
          prenomOec: queryParameters.prenomOec,
          statut: queryParameters.statut,
          tri:
            queryParameters.tri !== "prioriteRequete"
              ? queryParameters.tri
              : "dateStatut",
          sens: queryParameters.sens
        }
      })
      .then(result => {
        // <http://10.110.204.59:8082/rece-requete-api/v1/requetes?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER&tri=dateStatut&sens=asc&range=2-50>;rel="next",<http://10.110.204.59:8082/rece-requete-api/v1/requetes?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER&tri=dateStatut&sens=asc&range=0-50>;rel="prev"
        setDataState(reponseRequeteMapper(result.body.data));
        const rowsNumber: number = +(result.body.httpHeaders[
          "Content-Range"
        ][0] as string).split("/")[1];
        setRowsNumberState(rowsNumber);
        const minRange: number = +(result.body.httpHeaders[
          "Content-Range"
        ][0] as string)
          .split("/")[0]
          .split("-")[0];
        setMinRangeState(minRange);
        const maxRange: number = +(result.body.httpHeaders[
          "Content-Range"
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
    queryParameters.sens
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
  let result: IDataTable[] = [];
  data.forEach(element => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

export function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  return {
    idRequete: data.idRequete,
    idSagaDila: +data.idSagaDila,
    dateCreation: moment.unix(data.dateCreation).format("DD/MM/YYYY"),
    provenance: data.provenance,
    statut: data.statut,
    dateStatut: moment.unix(data.dateStatut).format("DD/MM/YYYY"),
    sousTypeRequete: data.sousTypeRequete,
    natureActe: data.natureActe,
    prioriteRequete: "TODO",
    villeEvenement: data.villeEvenement,
    paysEvenement: data.paysEvenement,
    requerant: data.requerant,
    titulaires: data.titulaires,
    canal: data.canal,
    reponse: data.reponse
  };
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
