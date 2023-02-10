export type DomiciliationType = {
  lignes: (string | undefined)[];
  codePostal?: string;
  ville?: string;
  lieuVilleEtranger?: string;
  arrondissement?: string;
  regionDeptEtat?: string;
  pays?: string;
};
