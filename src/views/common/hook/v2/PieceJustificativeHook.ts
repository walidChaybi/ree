import { useEffect, useState } from "react";
import { getPieceJustificativeById } from "../../../../api/appels/requeteApi";
import { IPieceJustificative } from "../../types/RequeteType";
import { logError } from "../../util/LogManager";

export function useGetPieceJustificativeApi(
  id?: string
): IPieceJustificative | undefined {
  const [PieceJustificative, setPieceJustificative] =
    useState<IPieceJustificative | undefined>();
  useEffect(() => {
    if (id) {
      getPieceJustificativeById(id)
        .then(result => {
          setPieceJustificative(result.body.data);
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de récupérer le document",
            error
          });
        });
    }
  }, [id]);
  return PieceJustificative;
}
