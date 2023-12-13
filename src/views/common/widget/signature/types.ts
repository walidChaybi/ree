import { ModeSignature } from "./../../../../model/requete/ModeSignature";

export type DetailSignature = DetailSignatureCommun &
  (DetailToCallAppSousType | DetailToWebextSousType);
export type DetailSignatureToCallApp = DetailSignatureCommun &
  DetailToCallAppSousType;
export type DetailSignatureToWebext = DetailSignatureCommun &
  DetailToWebextSousType;

type DetailSignatureCommun = {
  direction: "to-call-app" | "to-webextension";
  document: string;
};

type DetailToWebextSousType = {
  direction: "to-webextension";
  function: "SIGN";
  pin: string;
  mode: ModeSignature;
  infos: IDetailInfos[];
  erreurSimulee: string | null;
};

type DetailToCallAppSousType = {
  direction: "to-call-app";
  erreur: ITypeErreurSignature | null;
  infosSignature: IInfosCarteSignature;
};

export interface IInfosCarteSignature {
  manufacturerIDCarte: string;
  noSerieCarte: string;
  noSerieCertificat: string;
  issuerCertificat: string;
  algoSignature: string;
  modelCarte: string;
  nomDansCertificat: string;
  notAfterCertificat: string;
  notBeforeCertificat: string;
  flagsCarte: string;
}

export interface IDetailInfos {
  cle: string;
  valeur: string;
}

export interface ITypeErreurSignature {
  code: string;
  libelle: string;
  detail: string;
}
