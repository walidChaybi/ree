import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { storeRece } from "@util/storeRece";
import {
  formatNom,
  formatPrenom,
  getValeurOuVide,
  valeurOuUndefined
} from "@util/Utils";
import { NatureActe } from "../etatcivil/enum/NatureActe";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { SousTypeMiseAJour } from "./enum/SousTypeMiseAJour";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";
import { IDocumentReponse } from "./IDocumentReponse";
import { IRequerant, Requerant } from "./IRequerant";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapTitulaires } from "./ITitulaireRequeteTableau";

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
  idEntiteRattachement?: string;
  canal?: TypeCanal;
  documentsReponses?: IDocumentReponse[];
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableauDelivrance(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableauDelivrance[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauDelivrance(requete, mappingSupplementaire);
  });
}

export function mappingUneRequeteTableauDelivrance(
  requete: any,
  mappingSupplementaire: boolean
): IRequeteTableauDelivrance {
  const requerant = requete?.requerant
    ? Requerant.mappingRequerant(requete?.requerant)
    : undefined;
  return {
    idRequete: valeurOuUndefined(requete?.id),
    numero: getValeurOuVide(requete?.numero),
    numeroTeledossier: getValeurOuVide(requete?.numeroTeledossier),
    idSagaDila: getValeurOuVide(requete?.idSagaDila),
    type: TypeRequete.getEnumFor(requete?.type)?.libelle,
    sousType: getSousType(requete?.type, requete?.sousType),
    provenance: Provenance.getEnumFor(requete?.provenance)?.libelle,
    nature: requete?.nature
      ? NatureActe.getEnumFor(requete?.nature)?.libelle
      : "",
    document: requete?.document, // id du type de document demandé
    documentLibelle: DocumentDelivrance.getDocumentDelivrance(requete?.document)
      .libelle, // libellé du type de document demandé
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    requerant,
    nomCompletRequerant: requete?.nomCompletRequerant
      ? requete?.nomCompletRequerant
      : requerant,
    idUtilisateurRequerant: requete?.idUtilisateurRequerant,
    attribueA: mapAttribueA(requete),
    dateCreation: getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereMaj: getFormatDateFromTimestamp(requete?.dateDernierMAJ),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    priorite: getValeurOuVide(requete?.priorite),
    observations:
      mappingSupplementaire === true
        ? mapObservations(requete?.observations)
        : requete?.observations,
    idUtilisateur: valeurOuUndefined(requete?.idUtilisateur),
    idCorbeilleAgent: valeurOuUndefined(requete?.idCorbeilleAgent),
    idEntiteRattachement: valeurOuUndefined(requete?.idEntiteRattachement),
    canal: TypeCanal.getEnumFor(requete.canal),
    documentsReponses: requete.documentsReponses
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

export function mapAttribueA(requete: any): string | undefined {
  let attribueA: string | undefined;
  if (requete?.idUtilisateur) {
    attribueA = `${formatPrenom(
      storeRece.getPrenomUtilisateurAPartirID(requete?.idUtilisateur)
    )} ${formatNom(
      storeRece.getNomUtilisateurAPartirID(requete?.idUtilisateur)
    )}`;
  } else if (requete?.idEntiteRattachement) {
    attribueA = storeRece.getLibelleEntite(requete.idEntiteRattachement);
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
