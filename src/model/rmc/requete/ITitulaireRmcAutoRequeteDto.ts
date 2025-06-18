import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";

export interface ITitulaireRmcAutoRequeteDto {
  nom: string;
  prenoms: IPrenomOrdonneDto[];
}
