import { TEnumAvecDeuxLibelles } from "@model/commun/EnumAvecDeuxLibelles";

export enum ENatureActeTranscrit {
  NAISSANCE_MINEUR = "NAISSANCE_MINEUR",
  NAISSANCE_MAJEUR = "NAISSANCE_MAJEUR",
  MARIAGE_AVEC_CCAM = "MARIAGE_AVEC_CCAM",
  MARIAGE_SANS_CCAM = "MARIAGE_SANS_CCAM",
  DECES = "DECES",
  RECONNAISSANCE = "RECONNAISSANCE",
  ENFANT_SANS_VIE = "ENFANT_SANS_VIE"
}

export const ELibelleNatureActeTranscrit: TEnumAvecDeuxLibelles<ENatureActeTranscrit> = {
  NAISSANCE_MINEUR: {
    court: "Naissance mineur",
    long: "Acte de naissance d'une personne mineure"
  },
  NAISSANCE_MAJEUR: {
    court: "Naissance majeur",
    long: "Acte de naissance d'une personne majeure"
  },
  MARIAGE_AVEC_CCAM: {
    court: "Mariage avec CCAM",
    long: "Acte de mariage avec CCAM"
  },
  MARIAGE_SANS_CCAM: {
    court: "Mariage sans CCAM",
    long: "Acte de mariage sans CCAM"
  },
  DECES: {
    court: "Décès",
    long: "Acte de décès"
  },
  RECONNAISSANCE: {
    court: "Reconnaissance",
    long: "Acte de reconnaissance"
  },
  ENFANT_SANS_VIE: {
    court: "Enfant sans vie",
    long: "Acte pour enfant sans vie"
  }
} as const;
