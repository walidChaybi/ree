import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { MotifDelivrance } from "./enum/MotifDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { StatutRequete } from "./enum/StatutRequete";
import { DocumentReponse, IDocumentReponse } from "./IDocumentReponse";
import { IEvenementReqDelivrance } from "./IEvenementReqDelivrance";
import { IMandant } from "./IMandant";
import { IProvenanceRequete } from "./IProvenanceRequete";
import { IRequete } from "./IRequete";
import { IPieceJustificative } from "./pieceJointe/IPieceJustificative";

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
  piecesJustificatives: IPieceJustificative[];
  idSagaDila?: number;
  mandant?: IMandant;
}

export const RequeteDelivrance = {
  getDocumentsDeDelivrance(requete: IRequeteDelivrance) {
    return DocumentReponse.getDocumentsDeDelivrance(requete.documentsReponses);
  },

  estAuStatut(requete: IRequeteDelivrance, statut: StatutRequete): boolean {
    return requete.statutCourant.statut === statut;
  },

  estAuStatutASigner(requete: IRequeteDelivrance) {
    return this.estAuStatut(requete, StatutRequete.A_SIGNER);
  },

  getDocumentReponseCopieIntegrale(requete?: IRequeteDelivrance) {
    return DocumentReponse.getCopieIntegrale(requete?.documentsReponses);
  }
};
