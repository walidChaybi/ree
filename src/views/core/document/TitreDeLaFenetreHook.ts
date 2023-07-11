import { getLibelle } from "@util/Utils";
import { useEffect } from "react";

export function useTitreDeLaFenetre(titre: string) {
  useEffect(() => {
    const titrePrecedent = document.title;
    document.title = getLibelle(titre);
    return () => {
      document.title = titrePrecedent;
    };
  }, [titre]);
}
