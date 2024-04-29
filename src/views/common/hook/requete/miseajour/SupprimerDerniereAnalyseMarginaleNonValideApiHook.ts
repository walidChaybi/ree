import { deleteDerniereAnalyseMarginaleNonValide } from "@api/appels/etatcivilApi";
import { IEtatTraitementApi } from "@model/requete/IEtatTraitementApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useSupprimerDerniereAnalyseMarginaleNonValideApiHook(
  idActe: string | undefined
) {
  const [resultat, setResultat] = useState<IEtatTraitementApi>();

  useEffect(() => {
    if (idActe) {
      deleteDerniereAnalyseMarginaleNonValide(idActe)
        .then(reponse => {
          setResultat({ termine: true });
        })
        .catch(error => {
          setResultat({ termine: true, erreur: error });
          logError({
            error,
            messageUtilisateur:
              "Impossible de supprimer la dernière analyse marginale non valide"
          });
        });
    }
  }, [idActe]);
  return resultat;
}

