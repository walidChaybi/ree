import { EStatutActe } from "@model/etatcivil/enum/EStatutActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeActe } from "@model/etatcivil/enum/TypeActe";
import { IMention } from "../../mention/IMention";
import { IAnalyseMarginaleProjetActeTranscritDto } from "./AnalyseMarginaleProjetActeTranscrit";
import { IDeclarantProjetActeTranscritDto } from "./DeclarantProjetActeTranscrit";
import { IEvenementProjetActeTranscritDto } from "./EvenementProjetActeTranscrit";
import { IFormuleFinaleDto } from "./FormuleFinale";
import { IActeEtrangerDto } from "./IActeEtrangerDto";
import { ITitulaireProjetActeTranscritDto } from "./TitulaireProjetActeTranscrit";

export interface IProjetActeTranscritFormDto {
  //FIXSOFIANE
  idRequete?: string | null;
  id?: string;
  titulaires: ITitulaireProjetActeTranscritDto[];
  evenement?: IEvenementProjetActeTranscritDto | null;
  nature?: keyof typeof ENatureActe | null;
  numero?: string | null;
  dateDerniereMaj?: Date | null;
  dateDerniereDelivrance?: Date | null;
  dateCreation?: Date | null;
  visibiliteArchiviste?: string | null;
  analyseMarginales: IAnalyseMarginaleProjetActeTranscritDto[];
  type?: ETypeActe | null;
  statut?: keyof typeof EStatutActe;
  dateStatut?: Date | null;
  dateInitialisationprojet?: Date | null;
  dateStatutCourant?: Date | null;
  modeCreation?: string | null;
  formuleFinale: IFormuleFinaleDto | null;
  acteEtranger: IActeEtrangerDto | null;
  declarant: IDeclarantProjetActeTranscritDto | null;
  nomOec?: string | null;
  prenomOec?: string | null;
  mentions: IMention[];
}
