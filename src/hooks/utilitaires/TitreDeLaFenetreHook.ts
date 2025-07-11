import { useEffect } from "react";

export const useTitreDeLaFenetre = (titre: string) => {
  useEffect(() => {
    if (!titre) return;

    const titrePrecedent = document.title;
    document.title = titre;

    return () => {
      document.title = titrePrecedent;
    };
  }, [titre]);
};
