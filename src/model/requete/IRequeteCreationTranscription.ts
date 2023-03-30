import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { NatureActeTranscription } from "./NatureActeTranscription";

export interface IRequeteCreationTranscription
  extends IRequeteCreationEtablissement {
  natureActeTranscrit?: NatureActeTranscription;
}

