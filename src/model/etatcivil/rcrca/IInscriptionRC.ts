import DateUtils from "@util/DateUtils";
import { ETypeInscriptionRc } from "../enum/ETypeInscriptionRc";
import { INatureRc, NatureRc } from "../enum/NatureRc";
import { INatureRca } from "../enum/NatureRca";
import { IFicheRcDto } from "./FicheRcRca";

export interface IInscriptionRc {
  idInscription: string;
  nature: INatureRc | INatureRca;
  typeInscription?: ETypeInscriptionRc;
  dateInscription: Date;
}

export const mappingInscriptionsRCDepuisFicheRcDto = (ficheRC: IFicheRcDto[]): IInscriptionRc[] => {
  return ficheRC.map(
    (RC): IInscriptionRc => ({
      idInscription: RC.id,
      nature: NatureRc.depuisId(RC.nature.id) as INatureRc,
      typeInscription: ETypeInscriptionRc[RC.typeInscription],
      dateInscription: DateUtils.getDateDepuisDateArrayDto(RC.dateInscription)
    })
  );
};
