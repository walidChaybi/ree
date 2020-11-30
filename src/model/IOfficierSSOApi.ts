import { IHabilitation } from "./Habilitation";

export interface IOfficierSSOApi {
  idSSO: string;
  nom: string;
  prenom: string;
  trigramme: string;
  mail: string;
  profils: string[];
  telephone: string;
  section: string;
  bureau: string;
  departement: string;
  service: string;
  habilitations: IHabilitation[];
}
