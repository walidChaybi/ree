import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingRequeteDelivrance } from "../../../../common/hook/requete/DetailRequeteHook";
import { CreationRequeteRDC } from "../modelForm/ISaisirRDCPageModel";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";

export interface ICreationRequeteDelivranceRDCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export function useCreationRequeteDelivranceRDC(
  requeteRDC?: CreationRequeteRDC
): ICreationRequeteDelivranceRDCResultat | undefined {
  const [resultat, setResultat] = useState<
    ICreationRequeteDelivranceRDCResultat | undefined
  >();
  useEffect(() => {
    if (requeteRDC?.saisie) {
      const requete = mappingFormulaireRDCVersRequeteDelivrance(requeteRDC);

      creationRequeteDelivrance({
        requete,
        futurStatut: requeteRDC.futurStatut,
        refus: requeteRDC.refus
      })
        .then((result: any) => {
          setResultat({
            requete: mappingRequeteDelivrance(result.body.data),
            futurStatut: requeteRDC.futurStatut,
            refus: requeteRDC.refus
          });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la création de la requête",
            error
          });
        });
    }
  }, [requeteRDC]);
  return resultat;
}
