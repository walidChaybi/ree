import { ITypeRegistre } from "./TypeRegistre";

export interface IRegistre {
  id: string;
  famille: string;
  pocopa: string;
  type?: ITypeRegistre;
  annee: string;
  support1: string;
  support2: string;
  numeroDernierActe: string;
  pvOuverture: string;
  dateOuverture: Date;
  pvFermeture: string;
  dateFermeture?: Date;
  decret2017: boolean;
}
