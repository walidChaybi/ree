import { TypeFamille } from "../enum/TypeFamille";

export interface ITypeRegistre {
  id: string;
  famille: TypeFamille;
  pocopa: string;
  paysPocopa: string;
  dateRattachement: Date;
  dateTransfertScec: Date;
  gereScec: boolean;
  estOuvert: boolean;
}

export interface ITypeRegistreDto {
  pocopa: string;
  id: string;
}
