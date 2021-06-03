import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { MotifDelivrance } from "./enum/MotifDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { DocumentReponse, IDocumentReponse } from "./IDocumentReponse";
import { IEvenementReqDelivrance } from "./IEvenementReqDelivrance";
import { IProvenanceRequete } from "./IProvenanceRequete";
import { IRequete } from "./IRequete";

export interface IRequeteDelivrance extends IRequete {
  sousType: SousTypeDelivrance;
  documentDemande: DocumentDelivrance;
  nbExemplaireImpression?: number;
  provenanceRequete: IProvenanceRequete;
  evenement?: IEvenementReqDelivrance;
  motif?: MotifDelivrance;
  complementMotif?: string;
  documentsReponses: IDocumentReponse[];
}

export const RequeteDelivrance = {
  getDocumentsDeDelivrance(requete: IRequeteDelivrance) {
    return DocumentReponse.getDocumentsDeDelivrance(requete.documentsReponses);
  }
};
