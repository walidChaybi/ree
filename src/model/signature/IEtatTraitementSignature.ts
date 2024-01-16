import { IErreurTraitementApi } from "@api/IErreurTraitementApi";

export interface IEtatTraitementSignature {
  termine: boolean;
  erreur?: IErreurTraitementApi;
}
