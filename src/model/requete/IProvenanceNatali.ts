import { ProvenanceNaturalisation } from "./enum/ProvenanceNaturalisation";
import { TagPriorisation } from "./enum/TagPriorisation";
import { IAgentSdanf } from "./IAgentSdanf";

export interface IProvenanceNatali {
  id: string;
  numeroDossierNational: string;
  statutNatali: string;
  provenanceNaturalisation: ProvenanceNaturalisation;
  numeroDossierLocal: string;
  dateDepot: number;
  dataPriseEnChargeSdanf: number;
  decisionSdanf: string;
  tagPriorisation: TagPriorisation;
  agentSdanf: IAgentSdanf;
}
