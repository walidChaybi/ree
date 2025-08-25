import { updateRequeteDelivrance } from "@api/appels/requeteApi";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { UpdateRequeteRDC } from "@model/form/delivrance/ISaisirRDCPageForm";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { ICreationOuMiseAJourRDCResultat } from "./SoumissionFormulaireRDCHook";
import { mappingFormulaireRDCVersRequeteDelivrance } from "./mappingFormulaireRDCVersRequeteDelivrance";

type IUpdateRequeteDelivranceRDCResultat = ICreationOuMiseAJourRDCResultat;

export function useUpdateRequeteDelivranceRDC(requeteRDC?: UpdateRequeteRDC): IUpdateRequeteDelivranceRDCResultat | undefined {
  const [resultat, setResultat] = useState<IUpdateRequeteDelivranceRDCResultat | undefined>();

  const { utilisateurs } = useContext(RECEContextData);

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
            requete: mappingRequeteDelivrance(result.body.data, utilisateurs),
            futurStatut,
            refus
          });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de la mise à jour de la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDC]);
  return resultat;
}
