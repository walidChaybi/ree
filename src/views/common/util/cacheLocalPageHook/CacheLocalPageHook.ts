import { useState } from "react";

interface ICacheLocalPage<CLE, VALEUR> {
  cacheLocalPage: {
    get: (cle?: CLE) => VALEUR | undefined;
    set: (cle: CLE, valeur: VALEUR) => void;
  };
}

export function useCacheLocalPage<CLE, VALEUR>(
  fctTransformationCleEnString: (paramPourCalculerLaCle?: CLE) => string
): ICacheLocalPage<CLE, VALEUR> {
  const [cacheLocalPage, setCacheLocalPage] = useState(
    new Map<string, VALEUR>()
  );

  function get(cle?: CLE): VALEUR | undefined {
    return cacheLocalPage.get(fctTransformationCleEnString(cle));
  }

  function set(cle: CLE, valeur: VALEUR) {
    cacheLocalPage.set(fctTransformationCleEnString(cle), valeur);
    setCacheLocalPage(new Map(cacheLocalPage));
  }

  return {
    cacheLocalPage: {
      get,
      set
    }
  };
}
