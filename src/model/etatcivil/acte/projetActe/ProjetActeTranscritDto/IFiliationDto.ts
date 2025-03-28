import { LienParente } from "@model/etatcivil/enum/LienParente";
import { IAdresseCompleteDto } from "./IAdresseDto";
import { IEvenementCompletDto } from "./IEvenementDto";

export interface IFiliationDto {
  lienParente: LienParente;
  ordre: number | null;
  nom: string | null;
  sexe: string | null;
  naissance: IEvenementCompletDto | null;
  age: number | null;
  sansProfession: boolean | null;
  profession: string | null;
  domicile: IAdresseCompleteDto | null;
  prenoms: string[] | null;
  domicileCommun: boolean | null;
}
