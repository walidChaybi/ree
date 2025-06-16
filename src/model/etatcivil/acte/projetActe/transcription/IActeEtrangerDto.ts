import { IAdresse } from "../../IAdresse";

export interface IActeEtrangerDto {
  texteEnonciations: string | null;
  typeActeEtranger: string | null;
  infoTypeActe?: string | null;
  cadreNaissance: string | null;
  jourEnregistrement?: string | null;
  moisEnregistrement?: string | null;
  anneeEnregistrement?: string | null;
  adresseEnregistrement: IAdresse | null;
  redacteur: string | null;
  reference: string | null;
  complement: string | null;
  mentions: string | null;
}
