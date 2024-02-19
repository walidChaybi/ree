import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface ITitulaireRequeteMiseAJour {
  position: number;
  nomNaissance: string;
  anneeNaissance?: number;
  moisNaissance?: number;
  jourNaissance?: number;
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  arrondissementNaissance?: string;
  paysNaissance?: string;
  sexe: string;
  prenoms: IPrenomOrdonnes[];
}
