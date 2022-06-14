import { Provenance } from "../../../../../model/requete/enum/Provenance";
import { Qualite } from "../../../../../model/requete/enum/Qualite";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { TypeCanal } from "../../../../../model/requete/enum/TypeCanal";
import { TypeRequete } from "../../../../../model/requete/enum/TypeRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { supprimeProprietesVides } from "../../../../common/util/supprimeProprietesVides";
import { getValeurOuVide, SNP } from "../../../../common/util/Utils";
import {
  CreationRequeteRDCSC,
  SaisieRequeteRDCSC,
  UpdateRequeteRDCSC
} from "../modelForm/ISaisirRDCSCPageModel";
import { Adresse, Identite } from "../modelForm/ISaisirRequetePageModel";
import { limitesTitulaires } from "../SaisirRDCSCPage";
import { getPrenoms } from "./mappingCommun";

export function mappingFormulaireRDCSCVersRequeteDelivrance(
  requeteRDCSC: CreationRequeteRDCSC | UpdateRequeteRDCSC,
  nbTitulaires?: number
): IRequeteDelivrance {
  const requete = {
    type: TypeRequete.DELIVRANCE.nom,
    sousType: SousTypeDelivrance.RDCSC.nom,
    canal: TypeCanal.COURRIER.nom,
    provenance: Provenance.COURRIER.nom,
    documentDemande: requeteRDCSC.saisie.document,
    titulaires: [
      getTitulaireRequete(requeteRDCSC.saisie.titulaires.titulaire1),
      nbTitulaires === limitesTitulaires.MAX
        ? getTitulaireRequete(
            requeteRDCSC.saisie.titulaires.titulaire2,
            limitesTitulaires.MAX
          )
        : {}
    ],
    requerant: getRequerant(requeteRDCSC.saisie)
  } as any as IRequeteDelivrance;
  return supprimeProprietesVides(requete);
}

function getTitulaireRequete(titulaire: Identite, position = 1) {
  return titulaire
    ? {
        position,
        nomNaissance: titulaire.noms?.nomNaissance
          ? titulaire.noms.nomNaissance
          : SNP,
        nomUsage: titulaire.noms?.nomUsage,
        prenoms: getPrenoms(titulaire.prenoms),
        jourNaissance: parseInt(titulaire.naissance.dateEvenement.jour, 10),
        moisNaissance: parseInt(titulaire.naissance.dateEvenement.mois, 10),
        anneeNaissance: parseInt(titulaire.naissance.dateEvenement.annee, 10),
        villeNaissance: titulaire.naissance.villeEvenement,
        paysNaissance: titulaire.naissance.paysEvenement,
        sexe: titulaire.sexe,
        nationalite: titulaire.nationalite,
        parentsTitulaire: []
      }
    : {};
}

const Requerant = {
  MANDATAIRE: "MANDATAIRE",
  INSTITUTIONNEL: "INSTITUTIONNEL",
  PARTICULIER: "PARTICULIER",
  TITULAIRE1: "TITULAIRE1",
  TITULAIRE2: "TITULAIRE2"
};

export const getRequerant = (saisie: SaisieRequeteRDCSC) => {
  const {
    requerant,
    adresse,
    titulaires: { titulaire1, titulaire2 }
  } = saisie;

  switch (requerant.typeRequerant) {
    case Requerant.MANDATAIRE:
      return getMandataire(saisie);
    case Requerant.INSTITUTIONNEL:
      return getInstitutionnel(saisie);
    case Requerant.PARTICULIER:
      return getParticulier(saisie);
    case Requerant.TITULAIRE1:
      return getTitulaire({
        adresse,
        titulaire: titulaire1
      });
    case Requerant.TITULAIRE2:
      return getTitulaire({
        adresse,
        titulaire: titulaire2
      });
    default:
      return {};
  }
};

const getMandataire = ({ requerant, adresse }: SaisieRequeteRDCSC) => {
  return {
    nomFamille: requerant.mandataire.nom ? requerant.mandataire.nom : SNP,
    prenom: getValeurOuVide(requerant.mandataire.prenom),
    courriel: adresse.adresseCourriel,
    telephone: adresse.numeroTelephone,
    adresse: getAdresse(adresse),
    qualite: Qualite.MANDATAIRE_HABILITE.nom,
    detailQualiteMandataireHabilite: {
      type: requerant.mandataire.type,
      nature: requerant.mandataire.nature,
      raisonSociale: requerant.mandataire.raisonSociale
    }
  };
};

const getInstitutionnel = ({ requerant, adresse }: SaisieRequeteRDCSC) => {
  return {
    nomFamille: requerant.institutionnel.nom
      ? requerant.institutionnel.nom
      : SNP,
    prenom: getValeurOuVide(requerant.institutionnel.prenom),
    courriel: adresse.adresseCourriel,
    telephone: adresse.numeroTelephone,
    adresse: getAdresse(adresse),
    qualite: Qualite.INSTITUTIONNEL.nom,
    detailQualiteInstitutionnel: {
      type: requerant.institutionnel.type,
      nature: requerant.institutionnel.nature,
      nomInstitution: requerant.institutionnel.nomInstitution
    }
  };
};

const getParticulier = ({ requerant, adresse }: SaisieRequeteRDCSC) => {
  return {
    nomFamille: requerant.particulier.nomNaissance
      ? requerant.particulier.nomNaissance
      : SNP,
    prenom: getValeurOuVide(requerant.particulier.prenom),
    courriel: adresse.adresseCourriel,
    telephone: adresse.numeroTelephone,
    adresse: getAdresse(adresse),
    qualite: Qualite.PARTICULIER.nom,
    detailQualiteParticulier: {
      nomUsage: requerant.particulier.nomUsage
    }
  };
};

const getTitulaire = ({
  titulaire,
  adresse
}: {
  titulaire: Identite;
  adresse: Adresse;
}) => {
  return {
    nomFamille: titulaire.noms?.nomNaissance,
    prenom: titulaire.prenoms.prenom1,
    courriel: adresse.adresseCourriel,
    telephone: adresse.numeroTelephone,
    adresse: getAdresse(adresse),
    qualite: Qualite.PARTICULIER.nom
  };
};

export const getAdresse = (adresse: Adresse) => {
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
};
