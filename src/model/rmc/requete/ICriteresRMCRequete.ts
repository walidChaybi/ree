import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCRequeteForm } from "./IRMCRequete";

export interface ICriteresRMCRequete {
  valeurs: IRMCRequeteForm<keyof typeof ETypeRequete | "">;
  range?: string;
  onErreur?: () => void;
}
