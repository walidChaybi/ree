import { useEffect, useState } from "react";
import { updateRequeteDelivrance } from "../../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { logError } from "../../../../common/util/LogManager";
import { mappingRequeteDelivrance } from "../../detailRequete/hook/DetailRequeteHook";
import { UpdateRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

export interface IUpdateRequeteDelivranceRDCSCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export function useUpdateRequeteDelivranceRDCSC(
  requeteRDCSC?: UpdateRequeteRDCSC,
  nbTitulaires?: number
): IUpdateRequeteDelivranceRDCSCResultat | undefined {
  const [resultat, setResultat] = useState<
    IUpdateRequeteDelivranceRDCSCResultat | undefined
  >();
  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mappingFormulaireRDCSCVersRequeteDelivrance(
        requeteRDCSC,
        nbTitulaires
      );
      updateRequeteDelivrance({
        idRequete: requeteRDCSC.idRequete,
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
              "Une erreur est survenu lors de la mise à jour de la requête",
            error
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDCSC]);
  return resultat;
}
