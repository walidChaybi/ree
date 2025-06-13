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
  texteEnonciations: string | null;
  typeActeEtranger: keyof typeof ETypeActeEtranger;
  infoTypeActe?: string | null;
  cadreNaissance: string | null;
  jourEnregistrement?: string | null;
  moisEnregistrement?: string | null;
  anneeEnregistrement?: string | null;
  adresseEnregistrement: IAdresse | null;
  redacteur: string | null;
  reference: string | null;
  complement: string | null;
  mentions: string | null;
}
