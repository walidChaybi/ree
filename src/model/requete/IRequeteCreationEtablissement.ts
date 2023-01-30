import { Provenance } from "./enum/Provenance";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { IDocumentPJ } from "./IDocumentPj";
import { IMandant } from "./IMandant";
import { IProvenanceNatali } from "./IProvenanceNatali";
import { IProvenanceServicePublic } from "./IProvenanceServicePublic";
import { IRequete } from "./IRequete";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IRequeteCreationEtablissement extends IRequete {
  piecesJustificatives: IPieceJustificativeCreation[];
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
  numeroAncien?: string;
  mandant?: IMandant;
  nature?: string;
  campagne?: string;
}

export const RequeteCreationEtablissement = {
  getDocumentsPJtriesParPriorites(
    requete: IRequeteCreationEtablissement
  ): IDocumentPJ[] {
    return requete.documentsPj
      ? requete.documentsPj.sort(
          (documentPj1, documentPj2) =>
            documentPj1.categorie.ordre - documentPj2.categorie.ordre
        )
      : [];
  }
};
