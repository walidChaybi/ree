import { updateRequeteDelivrance } from "@api/appels/requeteApi";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { UpdateRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";

export interface IUpdateRequeteDelivranceRDCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export function useUpdateRequeteDelivranceRDC(
  requeteRDC?: UpdateRequeteRDC
): IUpdateRequeteDelivranceRDCResultat | undefined {
  const [resultat, setResultat] = useState<
    IUpdateRequeteDelivranceRDCResultat | undefined
  >();

  useEffect(() => {
    if (requeteRDC?.saisie) {
      const { idRequete, futurStatut, refus } = requeteRDC;

      updateRequeteDelivrance({
        idRequete,
        requete: mappingFormulaireRDCVersRequeteDelivrance(requeteRDC),
        futurStatut,
        refus
      })
        .then((result: any) => {
          setResultat({
            requete: mappingRequeteDelivrance(result.body.data),
            futurStatut,
            refus
          });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la mise à jour de la requête",
            error
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDC]);
  return resultat;
}
