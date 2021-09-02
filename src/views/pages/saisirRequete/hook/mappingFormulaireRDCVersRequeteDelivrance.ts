import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TypeNatureActe } from "../../../../model/requete/v2/enum/TypeNatureActe";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { supprimeProprietesVides } from "../../../common/util/supprimeProprietesVides";
import {
  CreationRequeteRDC,
  SaisieRequeteRDC
} from "../modelForm/ISaisirRDCPageModel";
import {
  Adresse,
  Identite,
  LienTitulaire
} from "../modelForm/ISaisirRequetePageModel";

const SNP = "SNP";

export function mappingFormulaireRDCVersRequeteDelivrance(
  requeteRDC: CreationRequeteRDC
): IRequeteDelivrance {
  const requete = ({
    type: TypeRequete.DELIVRANCE.nom,
    sousType: SousTypeDelivrance.RDC.nom,
    canal: TypeCanal.COURRIER.nom,
    provenance: Provenance.COURRIER.nom,
    documentDemande: DocumentDelivrance.getKeyForNom(
      requeteRDC.saisie.requete.documentDemande
    ),
    motif: requeteRDC.saisie.requete.motif,
    nbExemplaireImpression: requeteRDC.saisie.requete.nbExemplaire,
    evenement: getEvenement(requeteRDC.saisie),
    mandant: getMandant(requeteRDC.saisie),
    titulaires: getTitulairesRequete(requeteRDC.saisie),
    requerant: getRequerant(requeteRDC.saisie),
    lienRequerant: getLienRequerant(requeteRDC.saisie)
  } as any) as IRequeteDelivrance;

  return supprimeProprietesVides(requete);
}

function getEvenement(saisie: SaisieRequeteRDC) {
  // Si Acte de type NAISSANCE alors l'événement de la requête utilise les infos du titulaire 1
  if (
    TypeNatureActe.NAISSANCE ===
    TypeNatureActe.getEnumFor(saisie.requete.natureActe)
  ) {
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
  const natureActe = TypeNatureActe.getEnumFor(saisie.requete.natureActe);

  newTitulaires.push(getTitulaire(titulaire1, 1));
  if (TypeNatureActe.MARIAGE === natureActe) {
    newTitulaires.push(getTitulaire(titulaire2, 2));
  }
  return newTitulaires;
}

function getTitulaire(titulaire: Identite, position: number) {
  return {
    position,
    nomNaissance: titulaire.nomFamille ? titulaire.nomFamille : SNP,
    nomUsage: titulaire.nomUsage,
    prenoms: getPrenoms(titulaire.prenoms),
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

function getFiliation(titulaire: Identite) {
  if (titulaire.parent1 !== undefined && titulaire.parent2 !== undefined) {
    const parents = [];
    parents.push({
      position: 1,
      nomNaissance: titulaire.parent1.nomFamille
        ? titulaire.parent1.nomFamille
        : SNP,
      prenoms: getPrenoms(titulaire.parent1.prenoms)
    });
    parents.push({
      position: 2,
      nomNaissance: titulaire.parent2.nomFamille
        ? titulaire.parent2.nomFamille
        : SNP,
      prenoms: getPrenoms(titulaire.parent2.prenoms)
    });
    return parents;
  }
  return null;
}

function getPrenoms(prenoms: any): IPrenomOrdonnes[] {
  const prenomsInteresse = [] as IPrenomOrdonnes[];
  if (prenoms.prenom1 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom1, numeroOrdre: 1 });
  }
  if (prenoms.prenom2 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom2, numeroOrdre: 2 });
  }
  if (prenoms.prenom3 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom3, numeroOrdre: 3 });
  }
  return prenomsInteresse;
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
    return getRequerantTitulaire(
      saisie.titulaire1,
      saisie.adresse,
      saisie.lienTitulaire
    );
  } else if (saisie.requerant.typeRequerant === "TITULAIRE2") {
    return getRequerantTitulaire(
      saisie.titulaire2,
      saisie.adresse,
      saisie.lienTitulaire
    );
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
    nomFamille: requerant.mandataire.nom ? requerant.mandataire.nom : SNP,
    prenom: requerant.mandataire.prenom,
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
    nomFamille: requerant.institutionnel.nom
      ? requerant.institutionnel.nom
      : SNP,
    prenom: requerant.institutionnel.prenom,
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
    nomFamille: requerant.particulier.nomFamille
      ? requerant.particulier.nomFamille
      : SNP,
    prenom: requerant.particulier.prenom,
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.PARTICULIER.nom,
    detailQualiteParticulier: {
      nomUsage: requerant.particulier.nomUsage
    }
  };
}

function getRequerantTitulaire(
  titulaire: Identite,
  adresse: Adresse,
  lienTitulaire: LienTitulaire
) {
  return {
    nomFamille: titulaire.nomFamille,
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
    nomFamille: requerant.autreProfessionnel.nom
      ? requerant.autreProfessionnel.nom
      : SNP,
    prenom: requerant.autreProfessionnel.prenom,
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
  if (
    saisie.requerant.typeRequerant !== "INSTITUTIONNEL" &&
    saisie.requerant.typeRequerant !== "AUTRE_PROFESSIONNEL"
  ) {
    return {
      typeLienRequerant: saisie.lienTitulaire.lien,
      natureLien: saisie.lienTitulaire.natureLien
    };
  }
  return null;
}

function getAdresse(adresse: Adresse) {
  return adresse
    ? {
        ligne2: adresse.voie,
        ligne5: adresse.lieuDit,
        ligne3: adresse.complementDestinataire,
        ligne4: adresse.complementPointGeo,
        codePostal: adresse.codePostal,
        ville: adresse.commune,
        pays: adresse.pays
      }
    : {};
}
