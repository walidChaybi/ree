import { useEffect, useState } from "react";
import { updateRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { logError } from "../../../common/util/LogManager";
import { UpdateRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

export interface IUpdateRequeteDelivranceRDCSCResultat {
  requete: IRequeteDelivrance;
  brouillon?: boolean;
  refus?: boolean;
}

export function useUpdateRequeteDelivranceRDCSC(
  requeteRDCSC?: UpdateRequeteRDCSC
): IUpdateRequeteDelivranceRDCSCResultat | undefined {
  const [resultat, setResultat] = useState<
    IUpdateRequeteDelivranceRDCSCResultat | undefined
  >();
  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mappingFormulaireRDCSCVersRequeteDelivrance(requeteRDCSC);

      updateRequeteDelivrance({
        idRequete: requeteRDCSC.idRequete,
        requete,
        refus: requeteRDCSC.refus,
        brouillon: requeteRDCSC.brouillon
      })
        .then((result: any) => {
          setResultat({
            requete: result.body.data,
            brouillon: requeteRDCSC.brouillon,
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
  }, [requeteRDCSC]);
  return resultat;
}
