import { useEffect, useState } from "react";
import { creationRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { logError } from "../../../common/util/LogManager";
import { CreationRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

export interface ICreationRequeteDelivranceRDCSCResultat {
  idRequete: string;
  brouillon?: boolean;
  refus?: boolean;
}

export interface ICreationRequeteDelivranceRDCSCResultat {
  idRequete: string;
  brouillon?: boolean;
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
        refus: requeteRDCSC.refus,
        brouillon: requeteRDCSC.brouillon
      })
        .then((result: any) => {
          setResultat({
            idRequete: result.body.data.id,
            brouillon: requeteRDCSC.brouillon,
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
