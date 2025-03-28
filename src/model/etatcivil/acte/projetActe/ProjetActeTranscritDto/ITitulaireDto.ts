import { IdentiteReconnaissance } from "@model/etatcivil/enum/IdentiteReconnaissance";
import { IAdresseCompleteDto } from "./IAdresseDto";
import { IEvenementCompletDto } from "./IEvenementDto";
import { IFiliationDto } from "./IFiliationDto";
export interface ITitulaireDto {
  nomActeEtranger: string | null;
  nom: string | null;
  ordre: number | null;
  prenoms: string[] | null;
  sexe: string | null;
  naissance: IEvenementCompletDto | null;
  domicile: IAdresseCompleteDto | null;
  filiations: IFiliationDto[] | null;
  nomPartie1: string | null;
  nomPartie2: string | null;
  pasDePrenom: boolean | null;
  reconnuPar: IdentiteReconnaissance | null;
}
