import { IRMCRequete } from "./IRMCRequete";

export interface ICriteresRMCRequete {
  valeurs: IRMCRequete;
  range?: string;
  onErreur?: () => void;
}
