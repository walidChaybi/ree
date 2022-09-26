import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface IRetenueSdanf {
  nomNaissance?: string;
  nomUsage?: string;
  nomActuel?: string;
  nomDemandeFrancisation?: string;
  nomDemandeIdentification?: string;
  jourNaissance?: number;
  moisNaissance?: number;
  anneeNaissance?: number;
  codePostalNaissance?: string;
  villeNaissance?: string;
  villeEtrangereNaissance?: string;
  arrondissementNaissance?: string;
  regionNaissance?: string;
  paysNaissance?: string;
  prenomsRetenu?: IPrenomOrdonnes[];
}
