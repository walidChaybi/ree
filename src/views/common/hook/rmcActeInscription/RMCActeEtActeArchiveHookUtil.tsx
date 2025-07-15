import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";

export interface IRMCActeApiHookResultat {
  dataRMCActe: ResultatRMCActe[];
  dataTableauRMCActe?: IParamsTableau;
  ficheIdentifiant?: string;
  opEnCours?: boolean;
}
