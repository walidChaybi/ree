import { Option } from "@util/Type";

export interface IFiltresServiceRequeteInformationFormValues {
  sousType: string;
  objet: string;
  agent: Option | null;
  service: Option | null;
  typeRequerant: string;
  statut: string;
}
