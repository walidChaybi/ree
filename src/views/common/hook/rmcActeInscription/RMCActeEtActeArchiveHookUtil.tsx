import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";

export interface IRMCActeApiHookResultat {
  dataRMCActe?: IResultatRMCActe[];
  dataTableauRMCActe?: IParamsTableau;
  ficheIdentifiant?: string;
  errors?: any[];
}

export const RESULTAT_NON_DEFINIT: IRMCActeApiHookResultat = {};
