import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { QualiteFamille } from "./enum/QualiteFamille";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { IDomiciliation } from "./IDomiciliation";
import { IEnfantTitulaireActeTranscritDresse } from "./IEnfantTitulaireActeTranscritDresse";
import { IEvenementUnion } from "./IEvenementUnion";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { IRetenueSdanf } from "./IRetenueSdanf";
import { ITitulaireRequete } from "./ITitulaireRequete";

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
  }
};
