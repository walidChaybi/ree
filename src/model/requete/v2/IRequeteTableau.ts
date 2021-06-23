import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { storeRece } from "../../../views/common/util/storeRece";
import {
  formatNom,
  formatPrenom,
  getValeurOuVide
} from "../../../views/common/util/Utils";
import { NatureActe } from "../../etatcivil/enum/NatureActe";
import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { SousTypeMiseAJour } from "./enum/SousTypeMiseAJour";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeRequete } from "./enum/TypeRequete";

export interface IRequeteTableau {
  idRequete: string;
  numero?: string;
  idSagaDila?: string;
  type?: string;
  sousType?: string;
  provenance?: string;
  nature?: string;
  document?: string;
  titulaires?: ITitulaireRequeteTableau[];
  requerant?: string;
  attribueA?: string;
  dateCreation?: string;
  dateDerniereMaj?: string;
  statut?: string;
  priorite?: string;
  observations?: string[];
  idUtilisateur?: string;
  idCorbeilleAgent?: string;
  nomUtilisateurAttribueA?: string;
}

export interface ITitulaireRequeteTableau {
  nom: string;
  prenoms: string[];
  jourNaissance: number;
  moisNaissance: number;
  anneeNaissance: number;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableau(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableau[] {
  const requetesMapper: IRequeteTableau[] = [];

  resultatsRecherche.forEach((requete: any) => {
    const requeteMapper: IRequeteTableau = {
      idRequete: getValeurOuVide(requete.id),
      numero: getValeurOuVide(requete.numero),
      idSagaDila: getValeurOuVide(requete.idSagaDila),
      type: TypeRequete.getEnumFor(requete.type).libelle,
      sousType: getSousType(requete.type, requete.sousType),
      provenance: Provenance.getEnumFor(requete.provenance).libelle,
      nature: requete.nature
        ? NatureActe.getEnumFor(requete.nature).libelle
        : "",
      document: getValeurOuVide(requete.document),
      titulaires: mappingSupplementaire
        ? getTitulaires(requete.titulaires)
        : requete.titulaires,
      requerant: getValeurOuVide(requete.requerant),
      attribueA: `${formatPrenom(
        storeRece.getPrenomUtilisateurFromID(requete.idUtilisateur)
      )} ${formatNom(
        storeRece.getNomUtilisateurFromID(requete.idUtilisateur)
      )}`,
      dateCreation: getFormatDateFromTimestamp(requete.dateCreation),
      dateDerniereMaj: getFormatDateFromTimestamp(requete.dateDernierMAJ),
      statut: StatutRequete.getEnumFor(requete.statut).libelle,
      priorite: getValeurOuVide(requete.priorite),
      observations: mappingSupplementaire
        ? getObservations(requete.observations)
        : requete.observations,
      idUtilisateur: getValeurOuVide(requete.idUtilisateur),
      idCorbeilleAgent: getValeurOuVide(requete.idCorbeilleAgent)
    };

    requetesMapper.push(requeteMapper);
  });
  return requetesMapper;
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

function getTitulaires(titulaires: any): ITitulaireRequeteTableau[] {
  const titulairesResultatRMCRequete: ITitulaireRequeteTableau[] = [];
  if (titulaires) {
    titulaires.forEach((t: any) => {
      const titulaire = {} as ITitulaireRequeteTableau;
      titulaire.nom = formatNom(t.nom);
      titulaire.prenoms = getPrenoms(t.prenoms);
      titulaire.jourNaissance = t.jourNaissance;
      titulaire.moisNaissance = t.moisNaissance;
      titulaire.anneeNaissance = t.anneeNaissance;
      titulairesResultatRMCRequete.push(titulaire);
    });
  }

  return titulairesResultatRMCRequete;
}

const SEPARATOR_NUMERO_ELEMENT = ") ";

function getPrenoms(prenoms: string[]) {
  const prenomsTitulaire: string[] = [];

  if (prenoms) {
    prenoms.forEach((p: any) => {
      prenomsTitulaire.push(formatPrenom(p.split(SEPARATOR_NUMERO_ELEMENT)[1]));
    });
  }

  return prenomsTitulaire;
}

function getObservations(observations: string[]) {
  const observationsTitulaire: string[] = [];

  if (observations && observations.length > 0) {
    observations.forEach((o: any) => {
      observationsTitulaire.push(o.split(SEPARATOR_NUMERO_ELEMENT)[1]);
    });
  }

  return observationsTitulaire;
}
