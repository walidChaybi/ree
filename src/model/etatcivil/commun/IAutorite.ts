import { TypeAutorite } from "../TypeAutorite";

export interface IAutorite {
  type?: TypeAutorite;
  numeroDepartement: string;
  libelleDepartement: string;
  ville: string;
  region: string;
  pays: string;
  arrondissement: string;
  nomNotaire: string;
  prenomNotaire: string;
  numeroCrpcen: string;
  titreOnac?: string;
}
