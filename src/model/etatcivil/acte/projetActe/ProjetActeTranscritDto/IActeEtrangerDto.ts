import { IAdresseCompleteDto } from "./IAdresseDto";

export interface IActeEtrangerDto {
  texteEnonciations: string | null;
  typeActeEtranger: string | null;
  typeActe?: string | null;
  cadreNaissance: string | null;
  jourEnregistrement?: string | null;
  moisEnregistrement?: string | null;
  anneeEnregistrement?: string | null;
  adresseEnregistrement: IAdresseCompleteDto | null;
  redacteur: string | null;
  reference: string | null;
  complement: string | null;
  mentions: string | null;
}
