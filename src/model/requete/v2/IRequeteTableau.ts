import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { storeRece } from "../../../views/common/util/storeRece";
import {
  formatNom,
  formatPrenom,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../views/common/util/Utils";
import { NatureActe } from "../../etatcivil/enum/NatureActe";
import { Sexe } from "../../etatcivil/enum/Sexe";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { SousTypeMiseAJour } from "./enum/SousTypeMiseAJour";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeRequete } from "./enum/TypeRequete";
import { IRequerant } from "./IRequerant";

export interface IRequeteTableau {
  idRequete: string;
  numero?: string;
  idSagaDila?: string;
  type?: string;
  sousType?: string;
  provenance?: string;
  nature?: string;
  document?: string; // id du type de document demandé
  documentLibelle?: string; // libellé du type de document demandé
  titulaires?: ITitulaireRequeteTableau[];
  requerant?: IRequerant;
  nomCompletRequerant?: string;
  attribueA?: string;
  dateCreation?: string;
  dateDerniereMaj?: string;
  statut?: string;
  priorite?: string;
  observations?: string[];
  idUtilisateur?: string;
  idCorbeilleAgent?: string;
  nomUtilisateurAttribueA?: string;
  idEntiteRattachement?: string;
}

export interface ITitulaireRequeteTableau {
  nom: string;
  prenoms: string[];
  jourNaissance: number;
  moisNaissance: number;
  anneeNaissance: number;
  villeNaissance?: string;
  paysNaissance?: string;
  sexe: Sexe;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableau(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableau[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableau(requete, mappingSupplementaire);
  });
}

export function mappingUneRequeteTableau(
  requete: any,
  mappingSupplementaire: boolean
): IRequeteTableau {
  return {
    idRequete: valeurOuUndefined(requete?.id),
    numero: getValeurOuVide(requete?.numero),
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
    requerant: requete?.requerant,
    nomCompletRequerant: getValeurOuVide(requete?.nomCompletRequerant),
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
    idEntiteRattachement: valeurOuUndefined(requete?.idEntiteRattachement)
  } as IRequeteTableau;
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

function mapTitulaires(
  titulaires: any,
  mappingSupplementaire: boolean
): ITitulaireRequeteTableau[] {
  return titulaires?.map((t: any) => {
    const titulaire = {} as ITitulaireRequeteTableau;
    titulaire.nom = formatNom(t?.nom);
    if (mappingSupplementaire) {
      titulaire.prenoms = getPrenoms(t?.prenoms);
    } else {
      titulaire.prenoms = t?.prenoms;
    }
    titulaire.jourNaissance = t?.jourNaissance;
    titulaire.moisNaissance = t?.moisNaissance;
    titulaire.anneeNaissance = t?.anneeNaissance;
    titulaire.sexe = Sexe.getEnumFor(t?.sexe);
    titulaire.villeNaissance = t?.villeNaissance;
    titulaire.paysNaissance = t?.paysNaissance;
    return titulaire;
  });
}

function mapAttribueA(requete: any): string | undefined {
  let attribueA: string | undefined;
  if (requete?.idUtilisateur) {
    attribueA = `${formatPrenom(
      storeRece.getPrenomUtilisateurFromID(requete?.idUtilisateur)
    )} ${formatNom(storeRece.getNomUtilisateurFromID(requete?.idUtilisateur))}`;
  } else if (requete?.idEntiteRattachement) {
    attribueA = storeRece.getLibelleEntite(requete.idEntiteRattachement);
  }
  return attribueA;
}

// Recherche Requete
const SEPARATOR_NUMERO_ELEMENT = ") ";

function getPrenoms(prenoms: string[]): string[] {
  const prenomsTitulaire: string[] = [];
  if (prenoms) {
    prenoms.forEach((p: any) => {
      prenomsTitulaire.push(formatPrenom(p.split(SEPARATOR_NUMERO_ELEMENT)[1]));
    });
  }
  return prenomsTitulaire;
}

function mapObservations(observations: string[]) {
  const observationsTitulaire: string[] = [];

  if (observations && observations.length > 0) {
    observations.forEach((o: any) => {
      observationsTitulaire.push(o.split(SEPARATOR_NUMERO_ELEMENT)[1]);
    });
  }

  return observationsTitulaire;
}
