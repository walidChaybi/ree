export type TInfoPageRECE<T extends string> = {
  url: T;
  titre: string;
  niveauNavigation?: 1 | 2;
};

export const creerInfoPageRECE: <T extends string>(params: TInfoPageRECE<T>) => TInfoPageRECE<T> = params => params;
