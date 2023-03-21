import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { IRequeteCreationTranscription } from "./IRequeteCreationTranscription";

export type IRequeteCreation =
  | IRequeteCreationTranscription
  | IRequeteCreationEtablissement;
