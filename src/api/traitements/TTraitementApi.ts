export type TAppelTraitement<TParamTraitment extends object | undefined = undefined, TReponseSucces = unknown> = {
  parametres?: TParamTraitment;
  apresSucces?: (reponse: TReponseSucces) => void;
  apresErreur?: (messageErreur?: string) => void;
  finalement?: () => void;
};

export interface IErreurTraitement {
  enEchec: boolean;
  message?: string;
}

export type TTraitementApi<TParamTraitment extends object | undefined = undefined, TReponseSucces = unknown> = {
  Lancer: (terminerTraitement: () => void) => {
    lancer: (parametres: TParamTraitment) => void;
    erreurTraitement: IErreurTraitement;
    reponseTraitement: TReponseSucces;
  };
};

export const TRAITEMENT_SANS_ERREUR: IErreurTraitement = { enEchec: false };
export const TRAITEMENT_SANS_REPONSE: unknown = {};
