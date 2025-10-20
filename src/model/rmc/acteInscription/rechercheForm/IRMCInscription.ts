import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { INumeroRcRcaPacs } from "@model/form/commun/NumeroRcRcaPacsForm";

export interface IRMCInscription {
  numeroInscription: INumeroRcRcaPacs;
  typeRepertoire: keyof typeof ETypeRcRcaPacs | "";
  natureInscription: string;
  etInscriptionsSuivantes: boolean;
}

export interface IRMCInscriptionDto {
  numeroInscription?: string;
  typeRepertoire?: keyof typeof ETypeRcRcaPacs;
  natureInscription?: string;
  etInscriptionsSuivantes?: boolean;
}
