import { ICorpsText } from "../../ICorpsText";
import { IMention } from "../../mention/IMention";
import { IActeEtrangerDto } from "./IActeEtrangerDto";
import { IAnalyseMarginaleDto } from "./IAnalyseMarginaleDto";
import { IDeclarantDto } from "./IDeclarantDto";
import { IEvenementCompletDto } from "./IEvenementDto";
import { IFormuleFinaleDto } from "./IFormuleFinaleDto";
import { StatutActeDto } from "./IStatutActeDto";
import { ITitulaireDto } from "./ITitulaireDto";
import { TypeActeDto } from "./ITypeActeDto";

export interface IProjetActeTranscritDto {
  idRequete?: string | null;
  idActe?: string | null;
  titulaires: ITitulaireDto[] | null;
  evenement?: IEvenementCompletDto | null;
  nature?: string | null;
  numero?: string | null;
  dateDerniereMaj?: Date | null;
  dateDerniereDelivrance?: Date | null;
  dateCreation?: Date | null;
  visibiliteArchiviste?: string | null;
  analyseMarginales?: IAnalyseMarginaleDto[] | null;
  type?: TypeActeDto | null;
  statut?: StatutActeDto | null;
  dateStatut?: Date | null;
  dateInitialisationprojet?: Date | null;
  dateStatutCourant?: Date | null;
  modeCreation?: string | null;
  formuleFinale: IFormuleFinaleDto | null;
  acteEtranger: IActeEtrangerDto | null;
  declarant: IDeclarantDto | null;
  nomOec?: string | null;
  prenomOec?: string | null;
  mentions: IMention[] | null;
  corpsTexte?: ICorpsText;
}
