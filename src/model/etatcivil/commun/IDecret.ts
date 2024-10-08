import { TypePacsRcRca } from "../enum/TypePacsRcRca";

export enum DocumentDecret {
  ATTESTATION_PACS = "ATTESTATION_PACS",
  CERTIFICAT_SITUATION = "CERTIFICAT_SITUATION",
  CERTIFICAT_INSCRIPTION_RC = "CERTIFICAT_INSCRIPTION_RC",
  CERTIFICAT_INSCRIPTION_RCA = "CERTIFICAT_INSCRIPTION_RCA"
}

export interface IDecret {
  id: string;
  document: DocumentDecret;
  ordre: number;
  libelle: string;
  principal: boolean;
  type: TypePacsRcRca;
}

export const Decret = {
  getDecrets(decrets: IDecret[], documentDecret: DocumentDecret): IDecret[] {
    return decrets
      .filter(d => d.document === documentDecret)
      .sort((d1, d2) => d1.ordre - d2.ordre);
  },

  getDecretsAttestationPacs(decrets: IDecret[]): IDecret[] {
    return this.getDecrets(decrets, DocumentDecret.ATTESTATION_PACS);
  },

  getLibelleDecretPrincipalAttestationPacs(
    decrets: IDecret[]
  ): string | undefined {
    return decrets
      .filter(d => d.document === DocumentDecret.ATTESTATION_PACS)
      .find(d => d.principal)?.libelle;
  },

  getDecretsCertificatSituationPacs(decrets: IDecret[]): IDecret[] {
    return this.getDecrets(decrets, DocumentDecret.CERTIFICAT_SITUATION).filter(
      d => d.type === TypePacsRcRca.PACS
    );
  },

  getDecretsCertificatSituationRC(decrets: IDecret[]): IDecret[] {
    return this.getDecrets(decrets, DocumentDecret.CERTIFICAT_SITUATION).filter(
      d => d.type === TypePacsRcRca.RC
    );
  },

  getDecretsCertificatSituationRCA(decrets: IDecret[]): IDecret[] {
    return this.getDecrets(decrets, DocumentDecret.CERTIFICAT_SITUATION).filter(
      d => d.type === TypePacsRcRca.RCA
    );
  },

  getDecretInscriptionRC(decrets: IDecret[]): IDecret {
    return this.getDecrets(
      decrets,
      DocumentDecret.CERTIFICAT_INSCRIPTION_RC
    )[0];
  },

  getDecretInscriptionRCA(decrets: IDecret[]): IDecret {
    return this.getDecrets(
      decrets,
      DocumentDecret.CERTIFICAT_INSCRIPTION_RCA
    )[0];
  },

  getEnumTypeDecretFrom(typeDecretStr: string): TypePacsRcRca | undefined {
    let typeDecret: TypePacsRcRca | undefined;
    switch (typeDecretStr) {
      case "RC":
        typeDecret = TypePacsRcRca.RC;
        break;
      case "RCA":
        typeDecret = TypePacsRcRca.RCA;
        break;
      case "PACS":
        typeDecret = TypePacsRcRca.PACS;
        break;
    }

    return typeDecret;
  },

  getEnumDocumentDecretFrom(
    documentDecretStr: string
  ): DocumentDecret | undefined {
    let documentDecret: DocumentDecret | undefined;
    switch (documentDecretStr) {
      case "CERTIFICAT_INSCRIPTION_RC":
        documentDecret = DocumentDecret.CERTIFICAT_INSCRIPTION_RC;
        break;
      case "CERTIFICAT_INSCRIPTION_RCA":
        documentDecret = DocumentDecret.CERTIFICAT_INSCRIPTION_RCA;
        break;
      case "ATTESTATION_PACS":
        documentDecret = DocumentDecret.ATTESTATION_PACS;
        break;
      case "CERTIFICAT_SITUATION":
        documentDecret = DocumentDecret.CERTIFICAT_SITUATION;
        break;
    }

    return documentDecret;
  },

  mapDecrets(decrets: any): IDecret[] {
    return decrets.map(
      (d: any) =>
        ({
          ...d,
          type: Decret.getEnumTypeDecretFrom(d.type),
          document: Decret.getEnumDocumentDecretFrom(d.document)
        } as IDecret)
    );
  }
};


