import { getActeRecomposerApresSignature } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";

export function useActeRecomposerApresSignatureApiHook(idActe: string) {
  const [resultat, setResultat] = useState<Blob>();

  useEffect(() => {
    if (idActe) {
      getActeRecomposerApresSignature(idActe)
        .then((pdf: any) => {
          if (pdf.body.size === 0) {
            logError({
              messageUtilisateur: getLibelle(
                "La visualisation de l'acte n'est pas disponible"
              )
            });
          }
          setResultat(pdf.body);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible de récupérer l'acte recomposé"
          });
        });
    }
  }, [idActe]);

  return resultat;
}
