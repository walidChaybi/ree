import { EPrepositionLieu } from "../enum/EPrepositionLieu";

export interface IAdresse {
  voie?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
  prepositionLieu?: keyof typeof EPrepositionLieu;
}
