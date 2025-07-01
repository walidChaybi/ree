import { EPrepositionLieu } from "../enum/EPreposition";

export interface ILocalisation {
  typeLieu?: "France" | "Étranger" | "Inconnu" | "";
  ville?: string;
  arrondissement?: string;
  departement?: string;
  etatProvince?: string;
  pays?: string;
  adresse?: string;
  preposition?: keyof typeof EPrepositionLieu;
}
