import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useDelai = <T,>(defaut: T, delai: number = 300): [T, Dispatch<SetStateAction<T>>] => {
  const [valeur, setValeur] = useState<T>(defaut);
  const [valeurDelai, setValeurDelai] = useState<T>(defaut);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValeurDelai(valeur);
    }, delai);

    return () => {
      clearTimeout(timer);
    };
  }, [valeur, delai]);

  return [valeurDelai, setValeur];
};
