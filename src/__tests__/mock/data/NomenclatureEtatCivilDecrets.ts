import { DocumentDecret, IDecret } from "@model/etatcivil/commun/IDecret";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";

export const NOMENCLATURE_DECRETS: IDecret[] = [
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408760",
    document: DocumentDecret.ATTESTATION_PACS,
    ordre: 1,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 515-1 du Code civil",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408761",
    document: DocumentDecret.ATTESTATION_PACS,
    ordre: 2,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 6 du décret n°2006-1807 du 23 décembre 2006 modifié",
    principal: true
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408762",
    document: DocumentDecret.CERTIFICAT_INSCRIPTION_RC,
    ordre: 1,
    type: ETypePacsRcRca.RC,
    libelle: "Article 4 du décret 65-422 du 1er juin 1965",
    principal: true
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408763",
    document: DocumentDecret.CERTIFICAT_INSCRIPTION_RCA,
    ordre: 1,
    type: ETypePacsRcRca.RCA,
    libelle: "Article 4-1 du décret 65-422 du 1er juin 1965",
    principal: true
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408764",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 1,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 515-3-1 du Code civil",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408765",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 2,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 1 du décret 2006-1806 du 23 décembre 2006 modifié",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408766",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 3,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 6 du décret 2012-966 du 20 août 2012",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408767",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 4,
    type: ETypePacsRcRca.PACS,
    libelle: "Article 4-2 du décret 65-422 du 1er juin 1965 modifié",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408768",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 1,
    type: ETypePacsRcRca.RC,
    libelle: "Article 4 du décret 65-422 du 1er juin 1965 modifié",
    principal: false
  },
  {
    id: "981109a6-fce7-441e-9a23-0fa39c408769",
    document: DocumentDecret.CERTIFICAT_SITUATION,
    ordre: 1,
    type: ETypePacsRcRca.RCA,
    libelle: "Article 4-1 du décret 65-422 du 1er juin 1965 modifié",
    principal: false
  }
];
