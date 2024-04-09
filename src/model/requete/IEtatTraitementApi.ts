import { IErreurTraitementApi } from "@api/IErreurTraitementApi";

export interface IEtatTraitementApi {
  termine: boolean;
  erreur?: IErreurTraitementApi;
}
