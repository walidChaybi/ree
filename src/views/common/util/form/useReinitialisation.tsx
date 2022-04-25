import { useState } from "react";
import { Generateur } from "../generateur/Generateur";

export const useReinitialisationComposant = () => {
  const [cleReinitialisation, setCleReinitialisation] = useState(
    Generateur.genereCleUnique()
  );

  return {
    cleReinitialisation,
    reinitialisation: () => {
      setCleReinitialisation(Generateur.genereCleUnique);
    }
  };
};
