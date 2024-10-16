export type TTraitementApi<TParamTraitment extends object | undefined = undefined, TReponseSucces = unknown> = {
  Lancer: (
    terminerTraitement: () => void,
    parametres?: TParamTraitment,
    apresSucces?: (reponse?: TReponseSucces) => void,
    apresErreur?: (messageErreur: string) => void
  ) => {
    lancer: (parametres?: TParamTraitment, apresSucces?: (reponse?: TReponseSucces) => void, apresErreur?: (messageErreur: string) => void) => void;
  };
};
