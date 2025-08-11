import { getActeRecomposerApresSignature } from "@api/appels/etatcivilApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useActeRecomposerApresSignatureApiHook(idActe?: string) {
  const [resultat, setResultat] = useState<Blob>();

  useEffect(() => {
    if (idActe) {
      getActeRecomposerApresSignature(idActe)
        .then((pdf: any) => {
          if (pdf.body.size === 0) {
            AfficherMessage.erreur("La visualisation de l'acte n'est pas disponible", { fermetureAuto: true });
          }
          setResultat(pdf.body);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de récupérer l'acte recomposé", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [idActe]);

  return resultat;
}
