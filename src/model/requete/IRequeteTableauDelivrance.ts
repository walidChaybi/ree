import { IService, Service } from "@model/agent/IService";
import { IUtilisateur, getNomUtilisateurAPartirID, getPrenomUtilisateurAPartirID } from "@model/agent/IUtilisateur";
import DateUtils from "@util/DateUtils";
import { formatNom, formatPrenom } from "@util/Utils";
import { NatureActe } from "../etatcivil/enum/NatureActe";
import { IDocumentReponse } from "./IDocumentReponse";
import { IRequerant, Requerant } from "./IRequerant";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapTitulaires } from "./ITitulaireRequeteTableau";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { SousTypeMiseAJour } from "./enum/SousTypeMiseAJour";
import { StatutRequete } from "./enum/StatutRequete";
import { TagPriorisation } from "./enum/TagPriorisation";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";

export interface IRequeteTableauDelivrance extends IRequeteTableau {
  numeroTeledossier?: string;
  idSagaDila?: string;
  provenance?: string;
  nature?: string;
  document?: string; // id du type de document demandé
  documentLibelle?: string; // libellé du type de document demandé
  requerant?: IRequerant;
  attribueA?: string;
  dateDerniereMaj?: string;
  idUtilisateurRequerant?: string;
  priorite?: string;
  observations?: string[];
  idCorbeilleAgent?: string;
  nomUtilisateurAttribueA?: string;
  idService?: string;
  canal?: TypeCanal;
  documentsReponses?: IDocumentReponse[];
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableauDelivrance(
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauDelivrance[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauDelivrance(requete, mappingSupplementaire, utilisateurs, services);
  });
}

export function mappingUneRequeteTableauDelivrance(
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauDelivrance {
  const requerant = requete?.requerant ? Requerant.mappingRequerant(requete?.requerant) : undefined;
  return {
    idRequete: requete?.id,
    numero: requete?.numero ?? "",
    numeroTeledossier: requete?.numeroTeledossier ?? "",
    idSagaDila: requete?.idSagaDila ?? "",
    type: TypeRequete.getEnumFor(requete?.type)?.libelle ?? "",
    sousType: getSousType(requete?.type, requete?.sousType) ?? "",
    provenance: Provenance.getEnumFor(requete?.provenance)?.libelle ?? "",
    nature: requete?.nature ? NatureActe.getEnumFor(requete?.nature)?.libelle : "",
    document: requete?.document ?? "", // id du type de document demandé
    documentLibelle: DocumentDelivrance.depuisId(requete?.document)?.libelle, // libellé du type de document demandé
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    requerant,
    nomCompletRequerant: requete?.nomCompletRequerant ? requete?.nomCompletRequerant : requerant,
    idUtilisateurRequerant: requete?.idUtilisateurRequerant,
    attribueA: mapAttribueA(requete, utilisateurs, services) ?? undefined,
    dateCreation: DateUtils.getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereMaj: DateUtils.getFormatDateFromTimestamp(requete?.dateDernierMAJ),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    priorite: requete?.priorite ?? "",
    observations: mappingSupplementaire === true ? mapObservations(requete?.observations) : requete?.observations,
    idUtilisateur: requete?.idUtilisateur,
    idCorbeilleAgent: requete?.idCorbeilleAgent,
    idService: requete?.idService,
    canal: TypeCanal.getEnumFor(requete.canal),
    documentsReponses: requete.documentsReponses,
    tagPriorisation: TagPriorisation.getEnumFor(requete.tagPriorisation).libelle
  };
}

function getSousType(type: string, sousType: string) {
  switch (TypeRequete.getEnumFor(type)) {
    case TypeRequete.DELIVRANCE:
      return SousTypeDelivrance.getEnumFor(sousType).libelleCourt;
    case TypeRequete.INFORMATION:
      return SousTypeInformation.getEnumFor(sousType).libelle;
    case TypeRequete.MISE_A_JOUR:
      return SousTypeMiseAJour.getEnumFor(sousType).libelleCourt;
    case TypeRequete.CREATION:
      return SousTypeCreation.getEnumFor(sousType).libelleCourt;
    default:
      return null;
  }
}

export function mapAttribueA(requete: any, utilisateurs: IUtilisateur[], services: IService[]): string | null {
  let attribueA: string | null = null;
  if (requete?.idUtilisateur) {
    attribueA = `${formatPrenom(getPrenomUtilisateurAPartirID(requete?.idUtilisateur, utilisateurs))} ${formatNom(
      getNomUtilisateurAPartirID(requete?.idUtilisateur, utilisateurs)
    )}`;
  } else if (requete?.idService) {
    attribueA = Service.libelleDepuisId(requete.idService, services);
  }
  return attribueA;
}

// Recherche Requete
export const SEPARATOR_NUMERO_ELEMENT = ") ";

function mapObservations(observations: string[]) {
  const observationsTitulaire: string[] = [];

  if (observations && observations.length > 0) {
    observations.forEach((o: any) => {
      observationsTitulaire.push(o.split(SEPARATOR_NUMERO_ELEMENT)[1]);
    });
  }

  return observationsTitulaire;
}
