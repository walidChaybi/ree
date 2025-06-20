import { useEffect } from "react";

export function useTitreDeLaFenetre(titre: string) {
  useEffect(() => {
    const titrePrecedent = document.title;
    document.title = titre;
    return () => {
      document.title = titrePrecedent;
    };
  }, [titre]);
}
