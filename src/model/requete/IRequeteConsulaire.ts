import { IRequeteCreationTranscription } from "./IRequeteCreationTranscription";
import { ITitulaireRequeteCreation } from "./ITitulaireRequeteCreation";

export interface IRequeteConsulaire extends IRequeteCreationTranscription {
  numeroDossier: string;
  dateDerniereAction: string;
  statut: string;
  nomCompletRequerant: string;
  titulaires: ITitulaireRequeteCreation[];
  natureActe: string;
}
