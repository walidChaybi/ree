import { useEffect, useState } from "react";
import { creationRequeteDelivrance } from "../../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { logError } from "../../../../common/util/LogManager";
import { mappingRequeteDelivrance } from "../../detailRequete/hook/DetailRequeteHook";
import { CreationRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

export interface ICreationRequeteDelivranceRDCSCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export function useCreationRequeteDelivranceRDCSC(
  requeteRDCSC?: CreationRequeteRDCSC
): ICreationRequeteDelivranceRDCSCResultat | undefined {
  const [resultat, setResultat] = useState<
    ICreationRequeteDelivranceRDCSCResultat | undefined
  >();
  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mappingFormulaireRDCSCVersRequeteDelivrance(requeteRDCSC);
      creationRequeteDelivrance({
        requete,
        futurStatut: requeteRDCSC.futurStatut,
        refus: requeteRDCSC.refus
      })
        .then((result: any) => {
          setResultat({
            requete: mappingRequeteDelivrance(result.body.data),
            futurStatut: requeteRDCSC.futurStatut,
            refus: requeteRDCSC.refus
          });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la création de la requête",
            error
          });
        });
    }
  }, [requeteRDCSC]);
  return resultat;
}
