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
  genre?: string; //TODO: seul différence avec IdentiteType de Creation/Types
};
