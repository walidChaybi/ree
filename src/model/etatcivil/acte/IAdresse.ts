import { EPrepositionLieu } from "./projetActe/transcription/EvenementProjetActeTranscrit";

export interface IAdresse {
  voie?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
  preposition?: keyof typeof EPrepositionLieu;
}
