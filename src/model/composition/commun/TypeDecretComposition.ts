import { IDecret } from "../../etatcivil/commun/IDecret";

export type TypeLibelleDecretComposition = { decret: string };

export const formatLibellesDecrets = (decrets: IDecret[]): TypeLibelleDecretComposition[] => {
  return decrets
    .map(d => d.libelle)
    .map(libelleDecret => ({
      decret: libelleDecret
    }));
};
