import {
  enMajuscule,
  formatNom,
  formatPrenom,
  getValeurOuVide,
  SNP
} from "../../views/common/util/Utils";
import { getAdresse } from "../../views/pages/requeteDelivrance/saisirRequete/hook/mappingFormulaireRDCSCVersRequeteDelivrance";
import { Qualite } from "./enum/Qualite";
import { TypeInstitutionnel } from "./enum/TypeInstitutionnel";
import { TypeLienRequerant } from "./enum/TypeLienRequerant";
import { TypeMandataireReq } from "./enum/TypeMandataireReq";
import { IAdresseRequerant } from "./IAdresseRequerant";
import { IAutreProfessionnel } from "./IAutreProfessionnel";
import { IInstitutionnel } from "./IInstitutionnel";
import { ILienRequerant } from "./ILienRequerant";
import { IMandataireHabilite } from "./IMandataireHabilite";
import { IParticulier } from "./IParticulier";
import { IQualiteRequerant } from "./IQualiteRequerant";
import { ITitulaireRequete, TitulaireRequete } from "./ITitulaireRequete";
import { IUtilisateurRece } from "./IUtilisateurRece";

export interface IRequerant {
  id: string;
  dateCreation: Date;
  nomFamille?: string;
  prenom?: string;
  courriel?: string;
  telephone?: string;
  adresse?: IAdresseRequerant;
  qualiteRequerant: IQualiteRequerant;
  lienRequerant?: ILienRequerant;
}

export const Requerant = {
  getNomFamille(requerant?: IRequerant): string {
    return requerant ? formatNom(requerant.nomFamille) : "";
  },
  getPrenom(requerant?: IRequerant): string {
    return requerant && requerant.prenom ? formatPrenom(requerant.prenom) : "";
  },
  estInteresse(requerant: IRequerant, titulaire: ITitulaireRequete) {
    return (
      titulaire.nomNaissance === requerant.nomFamille &&
      TitulaireRequete.getPrenom1(titulaire) === requerant.prenom
    );
  },
  isParticulierOuUtilisateur(requerant: IRequerant): requerant is IRequerant {
    return (
      requerant.qualiteRequerant?.qualite === Qualite.PARTICULIER ||
      requerant.qualiteRequerant?.qualite === Qualite.UTILISATEUR_RECE
    );
  },
  isRaisonSociale(requerant: IRequerant): requerant is IRequerant {
    return (
      requerant.qualiteRequerant?.qualite === Qualite.MANDATAIRE_HABILITE ||
      requerant.qualiteRequerant?.qualite === Qualite.INSTITUTIONNEL ||
      requerant.qualiteRequerant?.qualite === Qualite.AUTRE_PROFESSIONNEL
    );
  },
  organiserIdentite(requerant?: IRequerant) {
    // Affichage de l'identité du requérant sur 1 ou 2 lignes selon le type
    let ligne1 = "";
    let ligne2 = "";
    if (requerant) {
      switch (requerant.qualiteRequerant?.qualite) {
        case Qualite.PARTICULIER:
        case Qualite.UTILISATEUR_RECE:
          ligne1 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
            requerant.nomFamille
          )}`;
          break;
        case Qualite.INSTITUTIONNEL:
          if (requerant?.qualiteRequerant.institutionnel?.nomInstitution) {
            ligne1 = `${enMajuscule(
              requerant?.qualiteRequerant.institutionnel?.nomInstitution
            )}`;
            ligne2 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          } else {
            ligne1 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          }
          break;
        case Qualite.MANDATAIRE_HABILITE:
          if (requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale) {
            ligne1 = `${enMajuscule(
              requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale
            )}`;
            ligne2 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          } else {
            ligne1 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          }
          break;
        case Qualite.AUTRE_PROFESSIONNEL:
          if (requerant?.qualiteRequerant.autreProfessionnel?.raisonSociale) {
            ligne1 = `${enMajuscule(
              requerant?.qualiteRequerant.autreProfessionnel?.raisonSociale
            )}`;
            ligne2 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          } else {
            ligne1 = `${enMajuscule(requerant.prenom)} ${enMajuscule(
              requerant.nomFamille
            )}`;
          }
          break;

        default:
          break;
      }
    }
    return { premiereLigne: ligne1, deuxiemeLigne: ligne2 };
  },
  ///////// mapping des requerants pour envoi au serveur //////////
  setRequerant(requeteSaisie: any): IRequerant | undefined {
    if (requeteSaisie.requerant.typeRequerant === "MANDATAIRE") {
      return getRequerantMandataire(requeteSaisie);
    } else if (requeteSaisie.requerant.typeRequerant === "INSTITUTIONNEL") {
      return getRequerantInstitutionnel(requeteSaisie);
    } else if (requeteSaisie.requerant.typeRequerant === "PARTICULIER") {
      return getRequerantParticulier(requeteSaisie);
    } else if (requeteSaisie.requerant.typeRequerant === "INTERESSE") {
      return getRequerantInteresse(requeteSaisie);
    } else {
      return undefined;
    }
  },
  ///////// mapping des requerants venant du serveur //////////
  mappingRequerant(requerant: any): IRequerant {
    return {
      id: requerant.id,
      dateCreation: requerant.dateCreation,
      nomFamille: getValeurOuVide(requerant.nomFamille),
      prenom: getValeurOuVide(requerant.prenom),
      courriel: requerant.courriel,
      telephone: requerant.telephone,
      adresse: requerant.adresse as IAdresseRequerant,
      lienRequerant: requerant.lienRequerant
        ? getLienRequerant(requerant.lienRequerant)
        : undefined,
      qualiteRequerant: getQualiteRequerant(requerant)
    };
  }
};

///////// mapping des requerants venant du serveur //////////
function getLienRequerant(lienRequerant: any): ILienRequerant {
  return {
    id: lienRequerant.id,
    lien: TypeLienRequerant.getEnumFor(lienRequerant.typeLienRequerant),
    natureLien: lienRequerant.nature
  };
}

function getQualiteRequerant(requerant: any): IQualiteRequerant {
  return {
    qualite: Qualite.getEnumFor(requerant.qualite),
    utilisateurRece: requerant.detailQualiteRece as IUtilisateurRece,
    particulier: requerant.detailQualiteParticulier as IParticulier,
    mandataireHabilite: getMandataireHabilite(
      requerant.detailQualiteMandataireHabilite
    ),
    autreProfessionnel: requerant.detailQualiteAutreProfessionnel as IAutreProfessionnel,
    institutionnel: getInstitutionnel(requerant.detailQualiteInstitutionnel)
  };
}

function getMandataireHabilite(mandataire: any): IMandataireHabilite {
  if (mandataire) {
    return {
      type: TypeMandataireReq.getEnumFor(mandataire.type),
      raisonSociale: mandataire.raisonSociale,
      nature: mandataire.nature,
      crpcen: mandataire.crpcen
    };
  }
  return {} as IMandataireHabilite;
}

function getInstitutionnel(institutionnel: any): IInstitutionnel {
  if (institutionnel) {
    return {
      type: TypeInstitutionnel.getEnumFor(institutionnel.type),
      nomInstitution: institutionnel.nomInstitution,
      nature: institutionnel.nature
    };
  }
  return {} as IInstitutionnel;
}

///////// mapping des requerants pour envoi au serveur //////////
function getRequerantMandataire(requeteSaisie: any): IRequerant {
  const requerantSaisi = requeteSaisie.requerant;
  return {
    nomFamille: requerantSaisi.mandataire.nom
      ? requerantSaisi.mandataire.nom
      : SNP,
    prenom: getValeurOuVide(requerantSaisi.mandataire.prenom),
    courriel: requeteSaisie.adresse.adresseCourriel,
    telephone: requeteSaisie.adresse.numeroTelephone,
    adresse: getAdresse(requeteSaisie.adresse),
    qualiteRequerant: {
      qualite: Qualite.MANDATAIRE_HABILITE,
      mandataireHabilite: {
        type: TypeMandataireReq.getEnumFor(requerantSaisi.mandataire.type),
        nature: requerantSaisi.mandataire.nature,
        raisonSociale: requerantSaisi.mandataire.raisonSociale
      }
    }
  } as IRequerant;
}

function getRequerantInstitutionnel(requeteSaisie: any): IRequerant {
  const requerantSaisi = requeteSaisie.requerant;
  return {
    nomFamille: requerantSaisi.institutionnel.nom
      ? requerantSaisi.institutionnel.nom
      : SNP,
    prenom: getValeurOuVide(requerantSaisi.institutionnel.prenom),
    courriel: requeteSaisie.adresse.adresseCourriel,
    telephone: requeteSaisie.adresse.numeroTelephone,
    adresse: getAdresse(requeteSaisie.adresse),
    qualiteRequerant: {
      qualite: Qualite.INSTITUTIONNEL,
      institutionnel: {
        type: TypeInstitutionnel.getEnumFor(requerantSaisi.institutionnel.type),
        nature: requerantSaisi.institutionnel.nature,
        nomInstitution: requerantSaisi.institutionnel.nomInstitution
      }
    }
  } as IRequerant;
}

function getRequerantParticulier(requeteSaisie: any): IRequerant {
  const requerantSaisi = requeteSaisie.requerant;
  return {
    nomFamille: requerantSaisi.particulier.nomNaissance
      ? requerantSaisi.particulier.nomNaissance
      : SNP,
    prenom: getValeurOuVide(requerantSaisi.particulier.prenom),
    courriel: requeteSaisie.adresse.adresseCourriel,
    telephone: requeteSaisie.adresse.numeroTelephone,
    adresse: getAdresse(requeteSaisie.adresse),
    qualiteRequerant: {
      qualite: Qualite.PARTICULIER,
      particulier: {
        nomUsage: requerantSaisi.particulier.nomUsage
      }
    }
  } as IRequerant;
}

function getRequerantInteresse(requeteSaisie: any): IRequerant {
  return {
    nomFamille: requeteSaisie.interesse.nomFamille,
    prenom: requeteSaisie.interesse.prenoms.prenom1,
    courriel: requeteSaisie.adresse.adresseCourriel,
    telephone: requeteSaisie.adresse.numeroTelephone,
    adresse: getAdresse(requeteSaisie.adresse),
    qualiteRequerant: {
      qualite: Qualite.PARTICULIER
    }
  } as IRequerant;
}
