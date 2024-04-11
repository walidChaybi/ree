import { IErreurTraitementApi } from "@api/IErreurTraitementApi";

export interface IModifierStatutRequeteApresSignature {
  codeReponse: number;
  erreur?: IErreurTraitementApi;
}
