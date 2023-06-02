import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { DocumentDelivrance } from "./enum/DocumentDelivrance";
import { MotifDelivrance } from "./enum/MotifDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";
import { StatutRequete } from "./enum/StatutRequete";
import { Action } from "./IActions";
import { DocumentReponse, IDocumentReponse } from "./IDocumentReponse";
import { IMandant } from "./IMandant";
import { IProvenanceRequete } from "./IProvenanceRequete";
import { IRequete } from "./IRequete";
import { IPieceJustificative } from "./pieceJointe/IPieceJustificative";

export interface IRequeteDelivrance extends IRequete {
  sousType: SousTypeDelivrance;
  documentDemande: DocumentDelivrance;
  nbExemplaireImpression?: number;
  provenanceRequete: IProvenanceRequete;
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
  },

  getDocumentsASigner(requete: IRequeteDelivrance) {
    return requete.documentsReponses?.filter(el =>
      DocumentDelivrance.estExtraitCopieAsigner(el.typeDocument)
    );
  },

  possedeUnDocumentPlurilingue(requete: IRequeteDelivrance): boolean {
    return (
      DocumentReponse.getExtraitPlurilingue(requete?.documentsReponses) != null
    );
  },

  getExtraitsCopies(requete: IRequeteDelivrance): IDocumentReponse[] {
    return requete.documentsReponses.filter(documentReponse =>
      DocumentDelivrance.estExtraitCopieViaUUID(documentReponse.typeDocument)
    );
  },

  getCourrier(requete: IRequeteDelivrance): IDocumentReponse | undefined {
    return requete.documentsReponses.find(el =>
      DocumentDelivrance.estCourrierDelivranceEC(el.typeDocument)
    );
  },

  /** La requete possede une action "A Revoir" en dernier ou juste avant une action "A Signer" */
  estARevoir(requete?: IRequeteDelivrance): boolean {
    return Action.estARevoir(
      Action.getActionAvantActionsASigner(requete?.actions)
    );
  }
};
