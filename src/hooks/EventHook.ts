import { Dispatch, SetStateAction, useEffect, useState } from "react";

export enum EEvent {
  MODIFIER_MENTION = "event-hook:modifier-mention",
  ENREGISTRER_MENTION = "event-hook:enregistrer-mention"
}

export const useEventState = <T = unknown>(nomEvent: EEvent, valeurInitiale: T) => {
  const [valeur, setValeur] = useState<T>(valeurInitiale);

  useEffect(() => {
    const changerValeur = ((event: CustomEvent<T>) => setValeur(event.detail)) as EventListener;

    document.addEventListener(nomEvent, changerValeur);

    return () => {
      document.removeEventListener(nomEvent, changerValeur);
    };
  }, []);

  return [valeur, setValeur] as [T, Dispatch<SetStateAction<T>>];
};

export const useEventDispatch = <T = unknown>(nomEvent: EEvent) => {
  const envoyer = (nouvelleValeur: T) => document.dispatchEvent(new CustomEvent<T>(nomEvent, { detail: nouvelleValeur }));

  return { envoyer };
};
