import { Provenance } from "./enum/Provenance";
import { IProvenancePlanete } from "./IProvenancePlanete";
import { IProvenanceRece } from "./IProvenanceRece";
import { IProvenanceServicePublic } from "./IProvenanceServicePublic";

export interface IProvenanceRequete {
  provenance: Provenance;
  provenanceRece?: IProvenanceRece;
  provenancePlanete?: IProvenancePlanete;
  provenanceServicePublic?: IProvenanceServicePublic;
}
