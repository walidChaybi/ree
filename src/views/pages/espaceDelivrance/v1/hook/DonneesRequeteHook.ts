import { useEffect, useState } from "react";
import {
  getRequetes,
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../../api/appels/requeteApi";
import { Canal } from "../../../../../model/Canal";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { CanalProvenance } from "../../../../../model/requete/CanalProvenance";
import { IDataTable } from "../../../../../model/requete/IDataTable";
import { MotifRequete } from "../../../../../model/requete/MotifRequete";
import { QualiteRequerant } from "../../../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../../../model/requete/SousQualiteRequerant";
import { SousTypeRequete } from "../../../../../model/requete/SousTypeRequete";
import { StatutRequete } from "../../../../../model/requete/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/TypeRequete";
import {
  IDocumentDelivre,
  IPieceJustificative,
  ITitulaire
} from "../../../../common/types/RequeteType";
import { getFormatDateFromTimestamp } from "../../../../common/util/DateUtils";
import {
  getMaxRange,
  getMinRange,
  getRowsNumber,
  parseLink
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import {
  formatNom,
  formatPrenom,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../../common/util/Utils";

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
  titulaires: ITitulaire[];
  typeActe: any;
  typeRequete: TypeRequete;
  villeEvenement: string;
  documentsDelivres: IDocumentDelivre[];
}

export function useRequeteApi(
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete
) {
  const [dataState, setDataState] = useState<IDataTable[]>();
  const [rowsNumberState, setRowsNumberState] = useState<number>();
  const [minRangeState, setMinRangeState] = useState<number>();
  const [maxRangeState, setMaxRangeState] = useState<number>();
  const [previousDataLinkState, setPreviousDataLinkState] = useState<string>();
  const [nextDataLinkState, setNextDataLinkState] = useState<string>();

  useEffect(() => {
    setRowsNumberState(undefined);
    setMinRangeState(undefined);
    setMaxRangeState(undefined);
    setPreviousDataLinkState(undefined);
    setNextDataLinkState(undefined);

    let listeStatuts = "";

    queryParameters.statuts.forEach((statut, i) => {
      listeStatuts += statut;
      listeStatuts += i < queryParameters.statuts.length - 1 ? "," : "";
    });

    getRequetes(
      typeRequete,
      listeStatuts,
      queryParameters.tri,
      queryParameters.sens,
      queryParameters.range
    )
      .then(result => {
        setDataState(reponseRequeteMapper(result.body.data));
        setRowsNumberState(getRowsNumber(result));
        setMinRangeState(getMinRange(result));
        setMaxRangeState(getMaxRange(result));
        const { nextLink, prevLink } = parseLink(result.headers["link"]);

        setPreviousDataLinkState(prevLink);
        setNextDataLinkState(nextLink);
      })
      .catch(error => {
        logError({
          messageUtilisateur: "Impossible de récupérer les requêtes",
          error
        });
      });
  }, [queryParameters, typeRequete]);

  return {
    dataState,
    previousDataLinkState,
    nextDataLinkState,
    rowsNumberState,
    minRangeState,
    maxRangeState
  };
}

function reponseRequeteMapper(data: IRequeteApi[]): IDataTable[] {
  const result: IDataTable[] = [];
  data.forEach(element => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

export function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  let requeteMapper = {} as IDataTable;
  if (data) {
    requeteMapper = {
      idRequete: data.idRequete,
      idSagaDila: +data.idSagaDila,
      dateCreation: getFormatDateFromTimestamp(data.dateCreation),
      dateDerniereMaj: getFormatDateFromTimestamp(data.dateDerniereMaj),
      provenance: data.provenance,
      statut: data.statut,
      dateStatut: getFormatDateFromTimestamp(data.dateStatut),
      idRequeteInitiale: data.idRequeteInitiale,
      sousTypeRequete: data.sousTypeRequete,
      typeRequete: data.typeRequete,
      natureActe: data.natureActe,
      prioriteRequete: "TODO",
      villeEvenement: data.villeEvenement,
      paysEvenement: data.paysEvenement,
      requerant: createLibelleRequerant(data.requerant),
      titulaires: harmoniserTitulaires(data.titulaires),
      canal: data.canal,
      motifRequete: data.motifRequete,
      piecesJustificatives: data.piecesJustificatives,
      nomOec: createNomOec(data.reponse),
      typeActe: data.typeActe,
      reponse: harmoniserReponse(data.reponse),
      anneeEvenement: data.anneeEvenement,
      jourEvenement: data.jourEvenement,
      moisEvenement: data.moisEvenement,
      nbExemplaire: data.nbExemplaire,
      documentsDelivres: data.documentsDelivres
    };
  }
  return requeteMapper;
}

function createLibelleRequerant(data: IRequerantApi) {
  if (data.qualiteRequerant === QualiteRequerant.MandataireHabilite) {
    data.libelleRequerant =
      data.raisonSociale && data.identite
        ? `${data.raisonSociale} / ${data.identite}`
        : `${formatPrenom(data.prenom)} ${formatNom(data.nomFamille)}`;
  } else if (data.qualiteRequerant === QualiteRequerant.Institutionnel) {
    data.libelleRequerant = data.nomInstitutionnel;
  } else if (data.qualiteRequerant === QualiteRequerant.Particulier) {
    data.prenom = data.prenom ? `${formatPrenom(data.prenom)}` : data.prenom;
    data.nomFamille = data.nomFamille
      ? `${formatNom(data.nomFamille)}`
      : data.nomFamille;
    data.libelleRequerant = data.prenom
      ? `${data.prenom} ${data.nomFamille}`
      : `${data.nomFamille}`;
  }
  return data;
}

function harmoniserTitulaires(titulaires: ITitulaire[]) {
  titulaires.forEach(titulaire => {
    harmoniserTitulaire(titulaire);
  });
  return titulaires;
}

function harmoniserTitulaire(titulaire: ITitulaire) {
  titulaire.nomNaissance = titulaire.nomNaissance
    ? `${formatNom(titulaire.nomNaissance)}`
    : titulaire.nomNaissance;
  titulaire.nomUsage = titulaire.nomUsage
    ? `${formatNom(titulaire.nomUsage)}`
    : titulaire.nomUsage;
  titulaire.prenom1 = titulaire.prenom1
    ? `${formatPrenom(titulaire.prenom1)}`
    : titulaire.prenom1;
  titulaire.prenom2 = titulaire.prenom2
    ? `${formatPrenom(titulaire.prenom2)}`
    : titulaire.prenom2;
  titulaire.prenom3 = titulaire.prenom3
    ? `${formatPrenom(titulaire.prenom3)}`
    : titulaire.prenom3;
  return titulaire;
}

function createNomOec(reponse: IReponseApi) {
  let nomOec = "";
  if (reponse?.prenomOec !== undefined && reponse?.nomOec !== undefined) {
    const prenom = premiereLettreEnMajusculeLeResteEnMinuscule(
      reponse.prenomOec
    );
    nomOec = `${prenom} ${reponse.nomOec.toLocaleUpperCase()}`;
  }
  return nomOec;
}

function harmoniserReponse(reponse: IReponseApi) {
  if (reponse) {
    reponse.nomOec = reponse.nomOec
      ? `${formatNom(reponse.nomOec)}`
      : reponse.nomOec;
    reponse.prenomOec = reponse.prenomOec
      ? `${formatPrenom(reponse.prenomOec)}`
      : reponse.prenomOec;
    return reponse;
  }
}
