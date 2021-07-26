import { useEffect, useState } from "react";
import { getPieceJustificativeById } from "../../../../api/appels/requeteApi";
import { IPieceJustificativeV2 } from "../../../../model/requete/v2/IPieceJustificativeV2";
import { logError } from "../../util/LogManager";

export function useGetPieceJustificativeApi(
  id?: string
): IPieceJustificativeV2 | undefined {
  const [PieceJustificative, setPieceJustificative] =
    useState<IPieceJustificativeV2 | undefined>();
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
