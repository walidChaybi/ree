import { useEffect, useState } from "react";
import { creationRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { logError } from "../../../common/util/LogManager";
import { CreationRequeteRDC } from "../modelForm/ISaisirRDCPageModel";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";

export interface ICreationRequeteDelivranceRDCResultat {
  idRequete: string;
  brouillon?: boolean;
  refus?: boolean;
}

export interface ICreationRequeteDelivranceRDCResultat {
  idRequete: string;
  brouillon?: boolean;
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
        refus: requeteRDC.refus,
        brouillon: requeteRDC.brouillon
      })
        .then((result: any) => {
          setResultat({
            idRequete: result.body.data.id,
            brouillon: requeteRDC.brouillon,
            refus: requeteRDC.refus
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
  }, [requeteRDC]);
  return resultat;
}
