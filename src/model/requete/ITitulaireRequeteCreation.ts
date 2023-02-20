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
}
