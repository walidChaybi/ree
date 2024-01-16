import { ModeSignature } from "@model/requete/ModeSignature";
import { IDetailInfos } from "./IDetailInfos";
import { IInfosCarteSignature } from "./IInfosCarteSignature";
import { ITypeErreurSignature } from "./ITypeErreurSignature";

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
  erreursSimulees: string[] | null;
};

type DetailToCallAppSousType = {
  direction: "to-call-app";
  erreur: ITypeErreurSignature | null;
  infosSignature: IInfosCarteSignature;
};
