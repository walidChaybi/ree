import { IErreurTraitementApi } from "@api/IErreurTraitementApi";

export interface IComposerDocumentFinalApiHookResultat {
  documentRecomposeASigner: string;
  codeReponse: number;
  erreur?: IErreurTraitementApi;
}
