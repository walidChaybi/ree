import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { DocumentPJ, IDocumentPJ } from "./IDocumentPj";
import { IMandant } from "./IMandant";
import { IPersonneSauvegardee } from "./IPersonneSauvegardee";
import { IProvenanceNatali } from "./IProvenanceNatali";
import { IProvenanceServicePublic } from "./IProvenanceServicePublic";
import { IRequete } from "./IRequete";
import { ITitulaireRequeteCreation } from "./ITitulaireRequeteCreation";
import { NatureActeTranscription } from "./NatureActeTranscription";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IRequeteCreationEtablissement extends IRequete {
  titulaires?: ITitulaireRequeteCreation[];
  piecesJustificatives?: IPieceJustificativeCreation[];
  sousType: SousTypeCreation;
  dossierSignale?: boolean;
  documentsPj?: IDocumentPJ[];
  provenanceNatali?: IProvenanceNatali;
  provenanceRECE?: {
    id: string;
    numeroFonctionnel: string;
  };
  provenanceServicePublic?: IProvenanceServicePublic;
  commentaire?: string;
  demandeIdentification?: boolean;
  demandeFrancisation?: boolean;
  provenance?: Provenance;
  numeroFonctionnel?: string;
  numeroAncien?: string;
  mandant?: IMandant;
  nature?: string;
  campagne?: string;
  numeroDossierMetier?: string;
  natureActeTranscrit?: NatureActeTranscription;
  personnesSauvegardees: IPersonneSauvegardee[];
}

export const RequeteCreationEtablissement = {
  getPieceJustificative(
    requete: IRequeteCreationEtablissement | undefined,
    idDocumentPJ: string | undefined,
    idPieceJustificative: string
  ): IPieceJustificativeCreation | undefined {
    return DocumentPJ.getPieceJustificative(
      requete?.documentsPj,
      idDocumentPJ,
      idPieceJustificative
    );
  }
};
