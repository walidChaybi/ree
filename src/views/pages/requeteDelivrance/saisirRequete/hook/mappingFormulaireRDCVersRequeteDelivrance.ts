import { ISaisieAdresse, ISaisieIdentite } from "@model/form/delivrance/ISaisirRequetePageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IPieceJustificative, mapPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import DateUtils from "@util/DateUtils";
import { DEUX, SNP, UN, auMoinsUneProprieteEstRenseigne, getValeurOuVide } from "@util/Utils";
import { nettoyerAttributsDto } from "../../../../../dto/commun/dtoUtils";
import { CreationRequeteRDC, SaisieRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";
import { getPrenomsTableauStringVersPrenomsOrdonnes } from "./mappingCommun";

export function mappingFormulaireRDCVersRequeteDelivrance(requeteRDC: CreationRequeteRDC): IRequeteDelivrance {
  const requete = {
    type: TypeRequete.DELIVRANCE.nom,
    sousType: SousTypeDelivrance.RDC.nom,
    canal: TypeCanal.COURRIER.nom,
    provenance: Provenance.COURRIER.nom,
    documentDemande: requeteRDC.saisie.requete.documentDemande,
    motif: requeteRDC.saisie.requete.motif,
    nombreExemplairesDemandes: requeteRDC.saisie.requete.nbExemplaire,
    evenement: getEvenement(requeteRDC.saisie),
    mandant: getMandant(requeteRDC.saisie),
    titulaires: getTitulairesRequete(requeteRDC.saisie),
    requerant: getRequerant(requeteRDC.saisie),
    lienRequerant: getLienRequerant(requeteRDC.saisie),
    piecesJustificatives: getPiecesJustificativesAGarder(requeteRDC.saisie)
  } as any as IRequeteDelivrance;

  return nettoyerAttributsDto(requete);
}

// Renvoie des PJs déjà intégrées (sans contenu base64String) afin de gérer les suppressions
function getPiecesJustificativesAGarder(saisie: SaisieRequeteRDC) {
  const piecesJustificatives: IPieceJustificative[] = [];
  saisie?.piecesJointes?.filter(pj => !pj.base64File.base64String).forEach(pj => piecesJustificatives.push(mapPieceJustificative(pj)));
  return piecesJustificatives;
}

function getEvenement(saisie: SaisieRequeteRDC) {
  // Si Acte de type NAISSANCE alors l'événement de la requête utilise les infos du titulaire 1
  if (NatureActeRequete.NAISSANCE === NatureActeRequete.getEnumFor(saisie.requete.natureActe)) {
    const titulaire1 = saisie.titulaire1;
    return {
      natureActe: saisie.requete.natureActe,
      jour: titulaire1.naissance.dateEvenement.jour,
      mois: titulaire1.naissance.dateEvenement.mois,
      annee: titulaire1.naissance.dateEvenement.annee,
      ville: titulaire1.naissance.villeEvenement,
      pays: titulaire1.naissance.paysEvenement
    };
  }

  const evenement = saisie.evenement;
  return {
    natureActe: saisie.requete.natureActe,
    jour: evenement.dateEvenement.jour,
    mois: evenement.dateEvenement.mois,
    annee: evenement.dateEvenement.annee,
    ville: evenement.villeEvenement,
    pays: evenement.paysEvenement
  };
}

function getTitulairesRequete(saisie: SaisieRequeteRDC) {
  const newTitulaires = [];
  const titulaire1 = saisie.titulaire1;
  const titulaire2 = saisie.titulaire2;
  const natureActe = NatureActeRequete.getEnumFor(saisie.requete.natureActe);

  function titulaire2estVide(personne: ISaisieIdentite) {
    return !personne.noms.nomNaissance && !personne.prenoms.prenom1 && DateUtils.estDateVide(personne.naissance.dateEvenement);
  }

  newTitulaires.push(getTitulaire(titulaire1, 1));

  if (NatureActeRequete.MARIAGE === natureActe && !titulaire2estVide(titulaire2)) {
    newTitulaires.push(getTitulaire(titulaire2, DEUX));
  }
  return newTitulaires;
}

function getTitulaire(titulaire: ISaisieIdentite, position: number) {
  return {
    position,
    nomNaissance: titulaire.noms?.nomNaissance ? titulaire.noms.nomNaissance : SNP,
    nomUsage: titulaire.noms?.nomUsage,
    prenoms: getPrenomsTableauStringVersPrenomsOrdonnes(titulaire.prenoms),
    jourNaissance: titulaire.naissance.dateEvenement.jour,
    moisNaissance: titulaire.naissance.dateEvenement.mois,
    anneeNaissance: titulaire.naissance.dateEvenement.annee,
    villeNaissance: titulaire.naissance.villeEvenement,
    paysNaissance: titulaire.naissance.paysEvenement,
    sexe: titulaire.sexe,
    nationalite: titulaire.nationalite,
    parentsTitulaire: getFiliation(titulaire)
  };
}

function getFiliation(titulaire: ISaisieIdentite) {
  const parents = [];
  if (auMoinsUneProprieteEstRenseigne(titulaire.parent1)) {
    parents.push({
      position: UN,
      nomNaissance: titulaire.parent1.nomNaissance ? titulaire.parent1.nomNaissance : SNP,
      prenoms: getPrenomsTableauStringVersPrenomsOrdonnes(titulaire.parent1.prenoms)
    });
  }
  if (auMoinsUneProprieteEstRenseigne(titulaire.parent2)) {
    parents.push({
      position: DEUX,
      nomNaissance: titulaire.parent2.nomNaissance ? titulaire.parent2.nomNaissance : SNP,
      prenoms: getPrenomsTableauStringVersPrenomsOrdonnes(titulaire.parent2.prenoms)
    });
  }
  return parents;
}

function getMandant(saisie: SaisieRequeteRDC) {
  if (saisie.requerant.typeRequerant === "MANDATAIRE") {
    return {
      typeMandant: saisie.mandant.typeMandant,
      nom: saisie.mandant.nom,
      prenom: saisie.mandant.prenom,
      raisonSociale: saisie.mandant.raisonSociale,
      lienMandant: saisie.lienTitulaire.lien,
      natureLien: saisie.lienTitulaire.natureLien
    };
  }
  return null;
}

function getRequerant(saisie: SaisieRequeteRDC) {
  if (saisie.requerant.typeRequerant === "TITULAIRE1") {
    return getRequerantTitulaire(saisie.titulaire1, saisie.adresse);
  } else if (saisie.requerant.typeRequerant === "TITULAIRE2") {
    return getRequerantTitulaire(saisie.titulaire2, saisie.adresse);
  } else if (saisie.requerant.typeRequerant === "MANDATAIRE") {
    return getMandataire(saisie);
  } else if (saisie.requerant.typeRequerant === "INSTITUTIONNEL") {
    return getInstitutionnel(saisie);
  } else if (saisie.requerant.typeRequerant === "PARTICULIER") {
    return getParticulier(saisie);
  } else if (saisie.requerant.typeRequerant === "AUTRE_PROFESSIONNEL") {
    return getAutreProfessionnel(saisie);
  } else {
    return {};
  }
}

function getMandataire(saisie: SaisieRequeteRDC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.mandataire.nom,
    prenom: getValeurOuVide(requerant.mandataire.prenom),
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.MANDATAIRE_HABILITE.nom,
    detailQualiteMandataireHabilite: {
      type: requerant.mandataire.type,
      nature: requerant.mandataire.nature,
      raisonSociale: requerant.mandataire.raisonSociale
    }
  };
}

function getInstitutionnel(saisie: SaisieRequeteRDC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.institutionnel.nom,
    prenom: getValeurOuVide(requerant.institutionnel.prenom),
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.INSTITUTIONNEL.nom,
    detailQualiteInstitutionnel: {
      type: requerant.institutionnel.type,
      nature: requerant.institutionnel.nature,
      nomInstitution: requerant.institutionnel.nomInstitution
    }
  };
}

function getParticulier(saisie: SaisieRequeteRDC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.particulier.nomNaissance ? requerant.particulier.nomNaissance : SNP,
    prenom: getValeurOuVide(requerant.particulier.prenom),
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.PARTICULIER.nom,
    detailQualiteParticulier: {
      nomUsage: requerant.particulier.nomUsage
    }
  };
}

function getRequerantTitulaire(titulaire: ISaisieIdentite, adresse: ISaisieAdresse) {
  return {
    nomFamille: titulaire.noms?.nomNaissance,
    prenom: titulaire.prenoms.prenom1,
    courriel: adresse.adresseCourriel,
    telephone: adresse.numeroTelephone,
    adresse: getAdresse(adresse),
    qualite: Qualite.PARTICULIER.nom
  };
}

function getAutreProfessionnel(saisie: SaisieRequeteRDC) {
  const requerant = saisie.requerant;

  return {
    nomFamille: requerant.autreProfessionnel.nom,
    prenom: getValeurOuVide(requerant.autreProfessionnel.prenom),
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.AUTRE_PROFESSIONNEL.nom,
    detailQualiteAutreProfessionnel: {
      nature: requerant.autreProfessionnel.nature,
      raisonSociale: requerant.autreProfessionnel.raisonSociale
    }
  };
}

function getLienRequerant(saisie: SaisieRequeteRDC) {
  if (saisie.requerant.typeRequerant !== "INSTITUTIONNEL" && saisie.requerant.typeRequerant !== "AUTRE_PROFESSIONNEL") {
    return {
      typeLienRequerant: saisie.lienTitulaire.lien,
      natureLien: saisie.lienTitulaire.natureLien
    };
  }
  return null;
}

function getAdresse(adresse: ISaisieAdresse) {
  return adresse
    ? {
        ligne2: adresse.complementDestinataire,
        ligne3: adresse.complementPointGeo,
        ligne4: adresse.voie,
        ligne5: adresse.lieuDit,
        codePostal: adresse.codePostal,
        ville: adresse.commune,
        pays: adresse.pays
      }
    : {};
}
