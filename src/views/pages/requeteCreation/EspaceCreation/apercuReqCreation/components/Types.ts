export type IdentiteType = {
  noms: {
    naissance: string;
    actuel?: string;
    francisation?: string;
    identification?: string;
  };
  prenoms: {
    naissance: string[];
    francisation?: string[];
  };
  genre: string;
};

export type NationaliteType = {
  id: string;
  nationalite: string;
};

export type DateCoordonneesType = {
  date?: string;
  villeNaissance?: string;
  arrondissementNaissance?: string;
  regionNaissance?: string;
  paysNaissance?: string;
  anneeNaissance?: number;
  moisNaissance?: number;
  jourNaissance?: number;
  codePostalNaissance?: string;
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
