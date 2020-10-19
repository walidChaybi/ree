import { useState, useEffect } from "react";
import { ApiManager } from "../../../../api/ApiManager";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import moment from "moment";
import { TypeRequete } from "../../../../model/requete/TypeRequete";
import { SousTypeRequete } from "../../../../model/requete/SousTypeRequete";
import { CanalProvenance } from "../../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../../model/requete/NatureActe";
import { QualiteRequerant } from "../../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../../model/requete/SousQualiteRequerant";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { Canal } from "../../../../model/Canal";
import { MotifRequete } from "../../../../model/requete/MotifRequete";
import { FormatDate } from "../../../../ressources/FormatDate";
import { IOfficierSSOApi } from "../../../core/login/LoginHook";
import { IDocumentDelivre, IPieceJustificative } from "../../../common/types/RequeteType";
import { IDataTable } from "../MesRequetesDelivrancePage";
import { getRequetes } from "../../../../api/appels/requeteApi";

export interface IRequerantApi {
  idRequerant: string;
  typeRequerant: SousQualiteRequerant;
  qualiteRequerant: QualiteRequerant;
  nomInstitutionnel: string;
  identite: string;
  raisonSociale: string;
  nomFamille: string;
  nomUsage: string;
  prenom: string;
  libelleRequerant: string;
  mail: string;
  telephone: string;
  adresse: any;
  requete: any;
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
  motifRequete: MotifRequete;
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
  villeEvenement: string;
  documentsDelivres: IDocumentDelivre[];
}

export interface IQueryParametersPourRequetes {
  statuts: StatutRequete[];
  tri: string;
  sens: SortOrder;
  range?: string;
  lastDateReaload?: string;
}

export enum TypeAppelRequete {
  REQUETE_SERVICE = "requeteService",
  MES_REQUETES = "mesRequetes",
}

export function useRequeteApi(queryParameters: IQueryParametersPourRequetes, typeRequete: TypeAppelRequete, officier?: IOfficierSSOApi) {
  const [dataState, setDataState] = useState<IDataTable[]>();
  const [rowsNumberState, setRowsNumberState] = useState<number>();
  const [minRangeState, setMinRangeState] = useState<number>();
  const [maxRangeState, setMaxRangeState] = useState<number>();
  const [previousDataLinkState, setPreviousDataLinkState] = useState<string>();
  const [nextDataLinkState, setNextDataLinkState] = useState<string>();
  const [errorState, setErrorState] = useState(undefined);
  const contentRange = "content-range";

  useEffect(() => {
    setErrorState(undefined);
    setRowsNumberState(undefined);
    setMinRangeState(undefined);
    setMaxRangeState(undefined);
    setPreviousDataLinkState(undefined);
    setNextDataLinkState(undefined);
    const api = ApiManager.getInstance("rece-requete-api", "v1");

    let listeStatuts = "";

    queryParameters.statuts.forEach((statut, i) => {
      listeStatuts += statut;
      listeStatuts += i < queryParameters.statuts.length - 1 ? "," : "";
    });

    if (officier !== undefined) {
      getRequetes(typeRequete, officier, listeStatuts, queryParameters.tri, queryParameters.sens, queryParameters.range)
        .then((result) => {
          setDataState(reponseRequeteMapper(result.body.data));
          const rowsNumber: number = +(result.headers[contentRange] as string).split("/")[1];
          setRowsNumberState(rowsNumber);
          const minRange: number = +(result.headers[contentRange] as string).split("/")[0].split("-")[0];
          setMinRangeState(minRange);
          const maxRange: number = +(result.headers[contentRange] as string).split("/")[0].split("-")[1];
          setMaxRangeState(maxRange);
          const { nextLink, prevLink } = parseLink(result.headers["link"], api);

          setPreviousDataLinkState(prevLink);
          setNextDataLinkState(nextLink);
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters, officier, typeRequete]);

  return {
    dataState,
    previousDataLinkState,
    nextDataLinkState,
    rowsNumberState,
    minRangeState,
    maxRangeState,
    errorState,
  };
}

function reponseRequeteMapper(data: IRequeteApi[]): IDataTable[] {
  const result: IDataTable[] = [];
  data.forEach((element) => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

export function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  return {
    idRequete: data.idRequete,
    idSagaDila: +data.idSagaDila,
    dateCreation: moment.unix(data.dateCreation).format(FormatDate.DDMMYYYY),
    dateDerniereMaj: moment.unix(data.dateDerniereMaj).format(FormatDate.DDMMYYYY),
    provenance: data.provenance,
    statut: data.statut,
    dateStatut: moment.unix(data.dateStatut).format(FormatDate.DDMMYYYY),
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
    motifRequete: data.motifRequete,
    piecesJustificatives: data.piecesJustificatives,
    nomOec: `${data.reponse?.prenomOec} ${data.reponse?.nomOec}`,
    typeActe: data.typeActe,
    reponse: data.reponse,
    anneeEvenement: data.anneeEvenement,
    jourEvenement: data.jourEvenement,
    moisEvenement: data.moisEvenement,
    nbExemplaire: data.nbExemplaire,
    documentsDelivres: data.documentsDelivres,
  };
}

function createLibelleRequerant(data: IRequerantApi) {
  if (data.qualiteRequerant === QualiteRequerant.MandataireHabilite) {
    data.libelleRequerant = `${data.raisonSociale} / ${data.identite}`;
  } else if (data.qualiteRequerant === QualiteRequerant.Institutionnel) {
    data.libelleRequerant = data.nomInstitutionnel;
  } else if (data.qualiteRequerant === QualiteRequerant.Particulier) {
    data.libelleRequerant = `${data.prenom} ${data.nomFamille}`;
  }
  return data;
}

function parseLink(linkHeader: string, api: ApiManager) {
  let nextLink;
  let prevLink;
  if (linkHeader.indexOf(`rel="next"`) > 0) {
    nextLink = linkHeader.split(`;rel="next"`)[0].replace("<", "").replace(">", "");
    nextLink = `${nextLink}`;
  }
  if (linkHeader.indexOf(`rel="prev"`) > 0) {
    prevLink = linkHeader.replace(`<${nextLink}>;rel="next",`, "").split(`;rel="prev"`)[0].replace("<", "").replace(">", "");
    prevLink = `${api.url}:${api.ports}${prevLink}`;
  }

  return { nextLink, prevLink };
}
