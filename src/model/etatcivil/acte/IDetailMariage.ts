import { ExistenceContratMariage } from "../enum/ExistenceContratMariage";

export interface IDetailMariage {
  existenceContrat?: ExistenceContratMariage;
  contrat?: string;
}
