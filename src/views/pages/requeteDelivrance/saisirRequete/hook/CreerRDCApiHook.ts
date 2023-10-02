import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { CreationRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";
import { ICreationOuMiseAJourRDCResultat } from "./SoumissionFormulaireRDCHook";

type ICreationRequeteDelivranceRDCResultat = ICreationOuMiseAJourRDCResultat;

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
