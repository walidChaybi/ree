import { IRequete } from "./IRequete";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { MotifDelivrance } from "./enum/MotifDelivrance";
import { IProvenanceRequete } from "./IProvenanceRequete";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { IEvenementReqDelivrance } from "./IEvenementReqDelivrance";

export interface IRequeteDelivrance extends IRequete {
  sousType: SousTypeDelivrance;
  documentDemande: DocumentDelivrance;
  nbExemplaireImpression?: number;
  provenanceRequete: IProvenanceRequete;
  evenement?: IEvenementReqDelivrance;
  motif?: MotifDelivrance;
  complementMotif?: string;
}
