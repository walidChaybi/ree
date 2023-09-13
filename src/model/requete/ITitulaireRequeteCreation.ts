import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { SANS_NOM_CONNU, SANS_PRENOM_CONNU, SNP, SPC } from "@util/Utils";
import { QualiteFamille } from "./enum/QualiteFamille";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { IDomiciliation } from "./IDomiciliation";
import { IEnfantTitulaireActeTranscritDresse } from "./IEnfantTitulaireActeTranscritDresse";
import { IEvenementUnion } from "./IEvenementUnion";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { IRetenueSdanf } from "./IRetenueSdanf";
import { ISuiviDossier } from "./ISuiviDossier";
import { ITitulaireRequete, TitulaireRequete } from "./ITitulaireRequete";

export interface ITitulaireRequeteCreation extends ITitulaireRequete {
  villeEtrangereNaissance?: string;
  arrondissementNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  domiciliation?: IDomiciliation;
  prenomsDemande?: IPrenomOrdonnes[];
  nomDemandeFrancisation?: string;
  nomDemandeIdentification?: string;
  nomActuel?: string;
  nombreEnfantMineur?: number;
  typeObjetTitulaire?: TypeObjetTitulaire;
  qualite?: QualiteFamille;
  courriel?: string;
  telephone?: string;
  deces?: DateCoordonneesType;
  parent2Enfant?: ITitulaireRequete;
  valideEffetCollectif?: string;
  demandeEffetCollectif?: boolean;
  residence?: string;
  numeroDossierNational?: string;
  domiciliationEnfant?: string;
  evenementUnions?: IEvenementUnion[];
  retenueSdanf?: IRetenueSdanf;
  enfantTitulaireActeTranscritDresse?: IEnfantTitulaireActeTranscritDresse;
  nomSouhaite?: string;
  suiviDossiers?: ISuiviDossier[];
}

const RECONNAISSANCE = "RECONNAISSANCE";
const MARIAGE = "MARIAGE";

export const TitulaireRequeteCreation = {
  getSexe(titulaire?: ITitulaireRequeteCreation): string {
    return titulaire && titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe).libelle
      : "";
  },
  getEvenementUnionTypeReconnaissance(
    titulaire?: ITitulaireRequeteCreation
  ): IEvenementUnion | undefined {
    const evenementUnions = titulaire?.evenementUnions;

    return evenementUnions
      ? evenementUnions?.find(
          evenementUnion => evenementUnion.type === RECONNAISSANCE
        )
      : undefined;
  },
  getEvenementUnionTypeMariage(
    titulaire?: ITitulaireRequeteCreation
  ): IEvenementUnion | undefined {
    const evenementUnions = titulaire?.evenementUnions;

    return evenementUnions
      ? evenementUnions?.find(evenementUnion => evenementUnion.type === MARIAGE)
      : undefined;
  },
  getTableauDeNationalites(titulaire?: ITitulaireRequete): string[] {
    const nationalites: string[] = [];
    titulaire?.nationalites?.forEach((nationalite: INationalite) => {
      nationalites.push(nationalite.nationalite);
    });

    return nationalites;
  },
  getParentsTries(
    titulaires?: ITitulaireRequeteCreation[]
  ): ITitulaireRequeteCreation[] | undefined {
    return titulaires
      ?.filter(
        titulaire =>
          titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
          titulaire.qualite === QualiteFamille.PARENT
      )
      .sort((a, b) => a.position - b.position);
  },
  getParentsTriesParSexe(
    titulaires?: ITitulaireRequeteCreation[]
  ): ITitulaireRequeteCreation[] | undefined {
    return titulaires
      ?.filter(
        titulaire =>
          titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
          titulaire.qualite === QualiteFamille.PARENT
      )
      .sort((a, b) => a.position - b.position)
      .sort(a => {
        if (a.sexe === Sexe.MASCULIN.libelle) {
          return -1;
        } else {
          return 1;
        }
      });
  },
  getTitulairesTries(
    titulaires?: ITitulaireRequeteCreation[]
  ): ITitulaireRequeteCreation[] | undefined {
    return titulaires
      ?.filter(
        titulaire =>
          titulaire.typeObjetTitulaire ===
          TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE
      )
      .sort((a, b) => a.position - b.position);
  },
  getNomNaissanceOuSNP(titulaire?: ITitulaireRequeteCreation): string {
    let nomNaissanceFormate;
    if (titulaire?.nomNaissance) {
      if (titulaire?.nomNaissance === SNP) {
        nomNaissanceFormate = SANS_NOM_CONNU;
      } else {
        nomNaissanceFormate = titulaire?.nomNaissance;
      }
    } else {
      nomNaissanceFormate = "";
    }
    return nomNaissanceFormate;
  },
  getPrenomsOuSPC(titulaire: ITitulaireRequeteCreation): string {
    const prenoms = TitulaireRequete.getTableauDePrenoms(titulaire);
    let lignePrenomsFormates;
    if (prenoms) {
      if (prenoms?.[0] === SPC) {
        lignePrenomsFormates = SANS_PRENOM_CONNU;
      } else {
        lignePrenomsFormates = prenoms.join(", ");
      }
    } else {
      lignePrenomsFormates = "";
    }

    return lignePrenomsFormates;
  },
  getTitulaireByPosition({
    titulaires,
    position
  }: {
    titulaires?: ITitulaireRequeteCreation[];
    position: number;
  }): ITitulaireRequeteCreation | undefined {
    return titulaires
      ? titulaires.find(titulaire => {
          return titulaire.position === position;
        })
      : undefined;
  }
};
