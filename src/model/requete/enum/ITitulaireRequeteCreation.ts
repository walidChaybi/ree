import { DateCoordonneesType } from "@pages/requeteCreation/apercuRequete/etablissement/composants/Types";
import { IEvenementUnion } from "../IEvenementUnion";
import { IPrenomOrdonnes } from "../IPrenomOrdonnes";
import { IRetenueSdanf } from "../IRetenueSdanf";
import {
  IDomiciliation,
  INationalite,
  ITitulaireRequete
} from "../ITitulaireRequete";
import { TypeObjetTitulaire } from "./TypeObjetTitulaire";

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
  qualite?: string;
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
}
