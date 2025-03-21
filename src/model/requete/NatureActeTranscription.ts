export type Option = { cle: string; libelle: string };

export enum ENatureActeTranscrit {
  NAISSANCE_MINEUR = "NAISSANCE_MINEUR",
  NAISSANCE_MAJEUR = "NAISSANCE_MAJEUR",
  MARIAGE_AVEC_CCAM = "MARIAGE_AVEC_CCAM",
  MARIAGE_SANS_CCAM = "MARIAGE_SANS_CCAM",
  DECES = "DECES",
  RECONNAISSANCE = "RECONNAISSANCE",
  ENFANT_SANS_VIE = "ENFANT_SANS_VIE"
}

export const LIBELLES_ACTES: Record<ENatureActeTranscrit, { court: string; long: string }> = {
  [ENatureActeTranscrit.NAISSANCE_MINEUR]: {
    court: "Naissance mineur",
    long: "Acte de naissance d'une personne mineure"
  },
  [ENatureActeTranscrit.NAISSANCE_MAJEUR]: {
    court: "Naissance majeur",
    long: "Acte de naissance d'une personne majeure"
  },
  [ENatureActeTranscrit.MARIAGE_AVEC_CCAM]: {
    court: "Mariage avec CCAM",
    long: "Acte de mariage avec CCAM"
  },
  [ENatureActeTranscrit.MARIAGE_SANS_CCAM]: {
    court: "Mariage sans CCAM",
    long: "Acte de mariage sans CCAM"
  },
  [ENatureActeTranscrit.DECES]: {
    court: "Décès",
    long: "Acte de décès"
  },
  [ENatureActeTranscrit.RECONNAISSANCE]: {
    court: "Reconnaissance",
    long: "Acte de reconnaissance"
  },
  [ENatureActeTranscrit.ENFANT_SANS_VIE]: {
    court: "Enfant sans vie",
    long: "Acte pour enfant sans vie"
  }
};

export const NatureActeTranscription = {
  getLibelle: (natureActe: ENatureActeTranscrit, court: boolean = false): string =>
    LIBELLES_ACTES[natureActe]?.[court ? "court" : "long"] ?? ""
} as const;
