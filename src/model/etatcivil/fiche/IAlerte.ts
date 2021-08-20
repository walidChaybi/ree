import { TypeCodeCouleur } from "../enum/TypeAlerte";

export interface IAlerte {
  idActe?: string;
  alerte?: string;
  type?: string;
  famille?: string;
  pocopa?: string;
  annee?: string;
  support1?: string;
  support2?: string;
  numeroActe?: string;
  numeroBisTer?: string;
  description?: string;
  complementDescription?: string;
  trigramme?: string;
  dateCreation?: number;
  dateCreationStr?: string;
  codeCouleur?: TypeCodeCouleur;
  registre?: string;
}
