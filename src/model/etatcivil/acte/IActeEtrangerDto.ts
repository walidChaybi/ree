import { IAdresse } from "./IAdresse";

export enum ETypeActeEtranger {
  ACTE_DRESSE = "Acte dressé",
  ACTE_TRANSCRIT = "Acte transcrit",
  ACTE_ENREGISTRE = "Acte enregistré",
  JUGEMENT_DECLARATIF = "Jugement déclaratif",
  JUGEMENT_SUPPLETIF = "Jugement supplétif",
  AUTRE = "Autre"
}

export interface IActeEtrangerDto {
  texteEnonciations?: string;
  typeActeEtranger: keyof typeof ETypeActeEtranger;
  infoTypeActe?: string;
  cadreNaissance?: string;
  jourEnregistrement?: string;
  moisEnregistrement?: string;
  anneeEnregistrement?: string;
  adresseEnregistrement: IAdresse;
  redacteur?: string;
  reference?: string;
  complement?: string;
  mentions?: string;
}
