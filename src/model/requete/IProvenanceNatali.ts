import { ProvenanceNaturalisation } from "./enum/ProvenanceNaturalisation";
import { TagPriorisation } from "./enum/TagPriorisation";
import { IAgentSdanf } from "./IAgentSdanf";
import { IEchange } from "./IEchange";

export interface IProvenanceNatali {
  id: string;
  numeroDossierNational: string;
  statutNatali: string;
  provenanceNaturalisation: ProvenanceNaturalisation;
  numeroDossierLocal: string;
  dateDepot: number;
  datePriseEnChargeSdanf: number;
  decisionSdanf: string;
  tagPriorisation: TagPriorisation;
  agentSdanf?: IAgentSdanf;
  echanges: IEchange[];
}
