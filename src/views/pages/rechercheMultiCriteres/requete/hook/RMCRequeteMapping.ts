import {
  formatNom,
  formatPrenom,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../../common/util/Utils";
import {
  getDateFinFromDateCompose,
  getDateDebutFromDateCompose,
  getFormatDateFromTimestamp,
  getDateStringFromDateCompose
} from "../../../../common/util/DateUtils";

import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { IResultatRMCRequete } from "../../../../../model/rmc/requete/IResultatRMCRequete";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { SousTypeInformation } from "../../../../../model/requete/v2/enum/SousTypeInformation";
import { SousTypeCreation } from "../../../../../model/requete/v2/enum/SousTypeCreation";
import { SousTypeMiseAJour } from "../../../../../model/requete/v2/enum/SousTypeMiseAJour";
import { Provenance } from "../../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";

/** Critères de recherche requete: mapping avant appel d'api */
export function mappingCriteresRequete(
  criteres: IRMCRequete
): IRMCRequestRequete {
  let criteresMapper: IRMCRequestRequete;
  criteresMapper = {
    // Filtre Requete
    numeroRequete: valeurOuUndefined(criteres.requete?.numeroRequete),
    typeRequete: valeurOuUndefined(criteres.requete?.typeRequete),
    sousTypeRequete: valeurOuUndefined(criteres.requete?.sousTypeRequete),
    statutRequete: valeurOuUndefined(criteres.requete?.statutRequete),

    // Filtre Titulaire
    nomTitulaire: valeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire?.paysNaissance),

    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFin?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(criteres.datesDebutFin?.dateFin),

    // Filtre Requerant
    nomRequerant: valeurOuUndefined(criteres.requerant?.nom),
    raisonSociale: valeurOuUndefined(criteres.requerant?.raisonSociale)
  };
  return criteresMapper;
}

/** Requetes: mapping après appel d'api */
export function mappingRequetes(
  resultatsRecherche: any
): IResultatRMCRequete[] {
  const requetesMapper: IResultatRMCRequete[] = [];

  resultatsRecherche.forEach((requete: any) => {
    const requeteMapper: IResultatRMCRequete = {
      idRequete: getValeurOuVide(requete.id),
      numero: getValeurOuVide(requete.numero),
      numeroSagaDila: getValeurOuVide(requete.idSagaDila),
      type: TypeRequete.getEnumFor(requete.type).libelle,
      sousType: getSousType(requete.type, requete.sousType),
      provenance: Provenance.getEnumFor(requete.provenance).libelle,
      nature: getValeurOuVide(requete.nature),
      document: getValeurOuVide(requete.document),
      titulaires: getTitulaires(requete.titulaires),
      datesNaissancesTitulaires: getDatesNaissancesTitulaires(
        requete.titulaires
      ),
      requerant: getValeurOuVide(requete.requerant),
      attribueA: getValeurOuVide(requete.attribueA),
      dateCreation: getFormatDateFromTimestamp(requete.dateCreation),
      dateDerniereMaj: getFormatDateFromTimestamp(requete.dateDernierMAJ),
      statut: StatutRequete.getEnumFor(requete.statut).libelle,
      priorite: getValeurOuVide(requete.priorite),
      observations: getObservations(requete.observations)
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

function getTitulaires(titulaires: any): string[][] {
  const titulairesResultatRMCRequete: string[][] = [];
  if (titulaires) {
    titulaires.forEach((t: any) => {
      const titulaire: string[] = [];
      titulaire.push(`${formatNom(t.nom)} ${getPremierPrenom(t.prenoms)}`);
      titulaire.push(`${formatNom(t.nom)} ${getPrenoms(t.prenoms)}`);
      titulairesResultatRMCRequete.push(titulaire);
    });
  }

  return titulairesResultatRMCRequete;
}

const SEPARATOR_NUMERO_ELEMENT = ") ";

function getPremierPrenom(prenoms: string[]) {
  let prenomsTitulaire: string = "";

  if (prenoms) {
    prenomsTitulaire = formatPrenom(
      prenoms[0].split(SEPARATOR_NUMERO_ELEMENT)[1]
    );
  }

  return prenomsTitulaire;
}

function getPrenoms(prenoms: string[]) {
  let prenomsTitulaire: string = "";

  if (prenoms) {
    prenoms.forEach((p: any) => {
      prenomsTitulaire = `${prenomsTitulaire} ${formatPrenom(
        p.split(SEPARATOR_NUMERO_ELEMENT)[1]
      )}`;
    });
  }

  return prenomsTitulaire;
}

function getDatesNaissancesTitulaires(titulaires: any) {
  const datesNaissancesTitulaires: string[] = [];
  if (titulaires) {
    titulaires.forEach((t: any) => {
      datesNaissancesTitulaires.push(
        getDateStringFromDateCompose({
          jour: t.jourNaissance,
          mois: t.moisNaissance,
          annee: t.anneeNaissance
        })
      );
    });
  }
  return datesNaissancesTitulaires;
}

function getObservations(observations: string[]) {
  let observationsTitulaire: string[] = [];

  if (observations) {
    observations.forEach((o: any) => {
      observationsTitulaire.push(o.split(SEPARATOR_NUMERO_ELEMENT)[1]);
    });
  }

  return observationsTitulaire;
}
