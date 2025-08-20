import { EPrepositionLieu } from "../enum/EPrepositionLieu";

export interface ILocalisation {
  typeLieu?: "France" | "Étranger" | "Inconnu" | "";
  ville?: string;
  arrondissement?: string;
  departement?: string;
  etatProvince?: string;
  region?: string;
  pays?: string;
  adresse?: string;
  preposition?: keyof typeof EPrepositionLieu;
}
