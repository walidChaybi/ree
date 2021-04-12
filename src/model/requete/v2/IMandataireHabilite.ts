import { TypeMandataireReq } from "./enum/TypeMandataireReq";

export interface IMandataireHabilite {
  type: TypeMandataireReq;
  raisonSociale?: string;
  nature?: string;
  CRPCEN?: string;
}
