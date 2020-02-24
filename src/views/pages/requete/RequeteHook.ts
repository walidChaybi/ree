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

export interface RequeteData {
  idSagaDila: string;
  typeRequete: TypeRequete;
  sousTypeRequete: SousTypeRequete;
  canalProvenance: CanalProvenance;
  natureActe: NatureActe;
  requerant: string;
  dateCreation: moment.Moment;
  dateStatut: moment.Moment;
  statutRequete: StatutRequete;
}

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
  nbExemplaire: number;
  paysEvenement: string;
  picesJustificatives: any;
  provenance: CanalProvenance;
  reponses: any;
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
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    setDataState(undefined);
    setErrorState(undefined);
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
        setDataState(reponseRequeteMapper(result.data));
        setRowsNumberState(
          +(result.httpHeaders["Content-Ranger"][0] as string).split("/")[1]
        );
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
  return { dataState, rowsNumberState, errorState };
}

function reponseRequeteMapper(data: IRequeteApi[]): IDataTable[] {
  let result: IDataTable[] = [];
  data.forEach(element => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  return {
    idSagaDila: +data.idSagaDila,
    sousTypeRequete: data.sousTypeRequete,
    provenance: data.provenance,
    natureActe: data.natureActe,
    dateCreation: moment.unix(data.dateCreation).format("DD/MM/YYYY"),
    dateStatut: moment.unix(data.dateStatut).format("DD/MM/YYYY"),
    statut: data.statut,
    prioriteRequete: "TODO",
    requerant: data.requerant.nomOuRaisonSociale
  };
}
