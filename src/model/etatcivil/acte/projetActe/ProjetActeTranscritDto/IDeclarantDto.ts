import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IAdresseCompleteDto } from "./IAdresseDto";

export interface IDeclarantDto {
  identiteDeclarant: string | null;
  nom: string | null;
  prenoms: IPrenomOrdonneDto[] | null;
  sexe: string | null;
  age: number | null;
  qualite: string | null;
  profession: string | null;
  sansProfession: boolean | null;
  adresseDomicile: IAdresseCompleteDto | null;
  complementDeclarant: string | null;
}
