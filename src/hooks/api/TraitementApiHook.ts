import { TTraitementApi } from "@api/traitements/TTraitementApi";
import { useState } from "react";

const useTraitementApi = <TParam extends object | undefined, TReponseSucces>(
  traitement: TTraitementApi<TParam, TReponseSucces>
) => {
  const [traitementEnCours, setTraitementEnCours] = useState(false);
  const { lancer } = traitement.Lancer(() => setTraitementEnCours(false));

  const lancerTraitement = (
    parametres?: TParam,
    apresSucces?: (reponse: TReponseSucces) => void,
    apresErreur?: (messageErreur: string) => void
  ): void => {
    if (traitementEnCours) {
      return;
    }

    setTraitementEnCours(true);

    lancer(parametres, apresSucces, apresErreur);
  };

  return {
    lancerTraitement: lancerTraitement,
    traitementEnCours: traitementEnCours
  };
};

export default useTraitementApi;
