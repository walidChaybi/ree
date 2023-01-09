import { Sexe } from "@model/etatcivil/enum/Sexe";

export type IdentiteType = {
  noms: {
    naissance: string;
    actuel?: string;
    francisation?: string;
    identification?: string;
    usage?: string;
  };
  prenoms: {
    naissance: string[];
    francisation?: string[];
  };
  genre: Sexe;
};

export type NationaliteType = {
  id: string;
  nationalite: string;
};

export type DateCoordonneesType = {
  date?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
  annee?: number;
  mois?: number;
  jour?: number;
  codePostal?: string;
};

export type DomiciliationType = {
  lignes: (string | undefined)[];
  codePostal?: string;
  ville?: string;
  lieuVilleEtranger?: string;
  arrondissement?: string;
  regionDeptEtat?: string;
  pays?: string;
};
