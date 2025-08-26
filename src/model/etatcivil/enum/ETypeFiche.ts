import { IFicheActe } from "../acte/IFicheActe";
import { FichePacs } from "../pacs/FichePacs";
import { FicheRcRca } from "../rcrca/FicheRcRca";

export enum ETypeFiche {
  RC = "RC",
  RCA = "RCA",
  PACS = "PACS",
  ACTE = "ACTE"
}

export type TFiche = FicheRcRca | FichePacs | IFicheActe;

/* v8 ignore start */
export const estIFicheActe = (data: TFiche): data is IFicheActe => {
  return "titulaires" in data;
};
/* v8 ignore stop */
