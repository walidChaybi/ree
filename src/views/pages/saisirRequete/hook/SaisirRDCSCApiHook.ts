import { useEffect, useState } from "react";
import { creationRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import { logError } from "../../../common/util/LogManager";
import messageManager from "../../../common/util/messageManager";
import { supprimeProprietesVides } from "../../../common/util/supprimeProprietesVides";
import { getLibelle } from "../../../common/widget/Text";
import {
  CreationRequeteRDCSC,
  SaisieRequeteRDCSC
} from "../modelForm/ISaisirRDCSCPageModel";
import { Adresse, Identite } from "../modelForm/ISaisirRequetePageModel";

export interface ICreationRequeteDelivranceRDCSCResultat {
  idRequete: string;
  brouillon?: boolean;
  refus?: boolean;
}

export function useCreationRequeteDelivranceRDCSC(
  requeteRDCSC?: CreationRequeteRDCSC
): ICreationRequeteDelivranceRDCSCResultat | undefined {
  const [resultat, setResultat] = useState<
    ICreationRequeteDelivranceRDCSCResultat | undefined
  >();
  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mapRequeteDelivrance(requeteRDCSC);

      creationRequeteDelivrance({
        requete,
        refus: requeteRDCSC.refus,
        brouillon: requeteRDCSC.brouillon
      })
        .then((result: any) => {
          setResultat({
            idRequete: result.body.data.id,
            brouillon: requeteRDCSC.brouillon,
            refus: requeteRDCSC.refus
          });
          messageManager.showSuccessAndClose(
            getLibelle("La requête a bien été enregistrée")
          );
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la création de la requête",
            error
          });
        });
    }
  }, [requeteRDCSC]);
  return resultat;
}

export function mapRequeteDelivrance(
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

const SNP = "SNP";

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

function getRequerant(saisie: SaisieRequeteRDCSC) {
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

function getInstitutionnel(saisie: SaisieRequeteRDCSC) {
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

function getParticulier(saisie: SaisieRequeteRDCSC) {
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

function getInteresse(saisie: SaisieRequeteRDCSC) {
  return {
    nomFamille: saisie.interesse.nomFamille,
    prenom: saisie.interesse.prenoms.prenom1,
    courriel: saisie.adresse.adresseCourriel,
    telephone: saisie.adresse.numeroTelephone,
    adresse: getAdresse(saisie.adresse),
    qualite: Qualite.PARTICULIER.nom,
    detailQualiteParticulier: {
      nomUsage: saisie.interesse.nomUsage
    }
  };
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
            extension: pj.base64File.extension
          } as any) as IPieceJustificative)
      )
    : [];
}
