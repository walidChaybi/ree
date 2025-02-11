import { Sexe } from "@model/etatcivil/enum/Sexe";

export type IdentiteType = {
  noms: {
    naissance?: string;
    actuel?: string;
    francisation?: string;
    identification?: string;
    usage?: string;
  };
  prenoms: {
    naissance: string[];
    francisation?: string[];
  };
  genre?: Sexe;
};
