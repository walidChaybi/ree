import { Option } from "@util/Type";

export interface IFiltresServiceRequeteInformationFormValues {
  sousType: string;
  objet: string;
  agent: Option | null;
  service: Option | null;
  typeRequerant: string;
  statut: string;
}

export interface IFiltreServiceRequeteInformationDto {
  sousType: string;
  objet: string;
  idAgent: string | null;
  idService: string | null;
  typeRequerant?: string;
  statuts: string[] | null;
}
