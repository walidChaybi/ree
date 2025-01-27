import { IRequeteConsulaire } from "./IRequeteConsulaire";
import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { IRequeteCreationTranscription } from "./IRequeteCreationTranscription";

export type IRequeteCreation = IRequeteCreationTranscription | IRequeteCreationEtablissement | IRequeteConsulaire;
