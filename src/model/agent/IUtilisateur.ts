import { IHabilitation } from "../Habilitation";
import { IEntite } from "./IEntiteRattachement";

export interface IUtilisateur {
  actif?: boolean;
  dateDebut?: number;
  dateFin?: number;
  dateMaj?: number;
  entiteRattachement?: IEntite[];
  fonctionAgent?: {
    idFonctionAgent: string;
    libelleFonction: string;
    utilisateur: any;
  };
  habilitations?: IHabilitation[];
  idArobas?: string;
  idUtilisateur: string;
  identifiantArobas?: string;
  listeTitre?: string;
  mel?: string;
  nom: string;
  origineMaj?: string;
  prenom: string;
  signatureManuscrite?: string;
  trigramme?: string;
}
