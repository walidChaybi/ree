/* istanbul ignore file */

import {
  enMajuscule,
  formatNom,
  formatPrenom
} from "../../../views/common/util/Utils";
import { Qualite } from "./enum/Qualite";
import { IAdresseRequerant } from "./IAdresseRequerant";
import { ILienRequerant } from "./ILienRequerant";
import { IQualiteRequerant } from "./IQualiteRequerant";
import { ITitulaireRequete, TitulaireRequete } from "./ITitulaireRequete";

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
  }
};
