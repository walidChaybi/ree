import { TypeCodeCouleur } from "../enum/TypeAlerte";

export interface IAlerte {
  id?: string;
  idActe?: string;
  alerte?: string;
  type?: string;
  famille?: string;
  pocopa?: string;
  annee?: string;
  support1?: string;
  support2?: string;
  numeroActe?: string;
  numeroBisTerActe?: string;
  description?: string;
  complementDescription?: string;
  trigrammeUtilisateur?: string;
  dateCreation?: number;
  dateCreationStr?: string;
  codeCouleur?: TypeCodeCouleur;
}
