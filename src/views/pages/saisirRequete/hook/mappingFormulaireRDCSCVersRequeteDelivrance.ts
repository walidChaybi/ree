import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import { supprimeProprietesVides } from "../../../common/util/supprimeProprietesVides";
import { getValeurOuVide } from "../../../common/util/Utils";
import {
  CreationRequeteRDCSC,
  SaisieRequeteRDCSC
} from "../modelForm/ISaisirRDCSCPageModel";
import { Adresse, Identite } from "../modelForm/ISaisirRequetePageModel";
import { getPrenoms } from "./mappingCommun";

const SNP = "SNP";

export function mappingFormulaireRDCSCVersRequeteDelivrance(
  requeteRDCSC: CreationRequeteRDCSC
): IRequeteDelivrance {
  const requete = ({
    type: TypeRequete.DELIVRANCE.nom,
    sousType: SousTypeDelivrance.RDCSC.nom,
    canal: TypeCanal.COURRIER.nom,
    provenance: Provenance.COURRIER.nom,
    documentDemande: requeteRDCSC.saisie.document,
    titulaires: [getInteresseRequete(requeteRDCSC.saisie.interesse)],
    requerant: getRequerant(requeteRDCSC.saisie),
    piecesJustificatives: getPiecesJustificatives(
      requeteRDCSC.saisie.piecesJointes
    )
  } as any) as IRequeteDelivrance;

  return supprimeProprietesVides(requete);
}

function getInteresseRequete(interesse: Identite) {
  return interesse
    ? {
        position: 1,
        nomNaissance: interesse.nomFamille ? interesse.nomFamille : SNP,
        nomUsage: interesse.nomUsage,
        prenoms: getPrenoms(interesse.prenoms),
        jourNaissance: parseInt(interesse.naissance.dateEvenement.jour, 10),
        moisNaissance: parseInt(interesse.naissance.dateEvenement.mois, 10),
        anneeNaissance: parseInt(interesse.naissance.dateEvenement.annee, 10),
        villeNaissance: interesse.naissance.villeEvenement,
        paysNaissance: interesse.naissance.paysEvenement,
        sexe: interesse.sexe,
        nationalite: interesse.nationalite,
        parentsTitulaire: []
      }
    : {};
}

export function getRequerant(saisie: SaisieRequeteRDCSC) {
  if (saisie.requerant.typeRequerant === "MANDATAIRE") {
    return getMandataire(saisie);
  } else if (saisie.requerant.typeRequerant === "INSTITUTIONNEL") {
    return getInstitutionnel(saisie);
  } else if (saisie.requerant.typeRequerant === "PARTICULIER") {
    return getParticulier(saisie);
  } else if (saisie.requerant.typeRequerant === "INTERESSE") {
    return getInteresse(saisie);
  } else {
    return {};
  }
}

function getMandataire(saisie: SaisieRequeteRDCSC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.mandataire.nom ? requerant.mandataire.nom : SNP,
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

function getInstitutionnel(saisie: SaisieRequeteRDCSC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.institutionnel.nom
      ? requerant.institutionnel.nom
      : SNP,
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

function getParticulier(saisie: SaisieRequeteRDCSC) {
  const requerant = saisie.requerant;
  return {
    nomFamille: requerant.particulier.nomFamille
      ? requerant.particulier.nomFamille
      : SNP,
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

function getInteresse(saisie: SaisieRequeteRDCSC) {
  return {
    nomFamille: saisie.interesse.nomFamille,
    prenom: saisie.interesse.prenoms.prenom1,
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.PARTICULIER.nom
  };
}

function getAdresse(adresse: Adresse) {
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

function getPiecesJustificatives(
  nouvellesPiecesJointes: any
): IPieceJustificative[] {
  return nouvellesPiecesJointes
    ? nouvellesPiecesJointes.map(
        (pj: any) =>
          (({
            nom: pj.base64File.fileName,
            typePieceJustificative: pj.type?.value,
            contenu: pj.base64File.base64String,
            mimeType: pj.base64File.mimeType,
            taille: pj.base64File.taille,
            extension: pj.base64File.extension,
            referenceSwift: getValeurOuVide(pj.base64File.identifiantSwift),
            conteneurSwift: getValeurOuVide(pj.base64File.conteneurSwift)
          } as any) as IPieceJustificative)
      )
    : [];
}
