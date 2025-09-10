import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { INumeroRcRcaPacs } from "@model/form/commun/NumeroRcRcaPacsForm";

export interface IRMCInscription {
  numeroInscription: INumeroRcRcaPacs;
  typeRepertoire: keyof typeof ETypePacsRcRca | "";
  natureInscription: string;
  etInscriptionsSuivantes: boolean;
}

export interface IRMCInscriptionDto {
  numeroInscription?: string;
  typeRepertoire?: keyof typeof ETypePacsRcRca;
  natureInscription?: string;
  etInscriptionsSuivantes?: boolean;
}
