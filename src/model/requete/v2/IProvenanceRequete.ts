import { IProvenanceServicePublic } from "./IProvenanceServicePublic";
import { IProvenancePlanete } from "./IProvenancePlanete";
import { IProvenanceRece } from "./IProvenanceRece";
import { Provenance } from "./enum/Provenance";

export interface IProvenanceRequete {
  provenance: Provenance;
  provenanceRece: IProvenanceRece;
  provenancePlanete: IProvenancePlanete;
  provenanceServicePublic: IProvenanceServicePublic;
}
