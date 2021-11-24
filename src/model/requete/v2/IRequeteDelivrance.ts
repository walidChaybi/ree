import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { MotifDelivrance } from "./enum/MotifDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { DocumentReponse, IDocumentReponse } from "./IDocumentReponse";
import { IEvenementReqDelivrance } from "./IEvenementReqDelivrance";
import { IMandant } from "./IMandant";
import { IPieceJustificativeV2 } from "./IPieceJustificativeV2";
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
  choixDelivrance?: ChoixDelivrance;
  piecesJustificatives: IPieceJustificativeV2[];
  idSagaDila?: number;
  mandant?: IMandant;
}

export const RequeteDelivrance = {
  getDocumentsDeDelivrance(requete: IRequeteDelivrance) {
    return DocumentReponse.getDocumentsDeDelivrance(requete.documentsReponses);
  }
};
