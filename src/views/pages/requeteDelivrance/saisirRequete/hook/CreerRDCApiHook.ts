import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { CreationRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { ICreationOuMiseAJourRDCResultat } from "./SoumissionFormulaireRDCHook";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";

type ICreationRequeteDelivranceRDCResultat = ICreationOuMiseAJourRDCResultat;

export function useCreationRequeteDelivranceRDC(requeteRDC?: CreationRequeteRDC): ICreationRequeteDelivranceRDCResultat | undefined {
  const [resultat, setResultat] = useState<ICreationRequeteDelivranceRDCResultat | undefined>();

  const { utilisateurs } = useContext(RECEContextData);

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
            requete: mappingRequeteDelivrance(result.body.data, utilisateurs),
            futurStatut: requeteRDC.futurStatut,
            refus: requeteRDC.refus
          });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de la création de la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [requeteRDC]);
  return resultat;
}
