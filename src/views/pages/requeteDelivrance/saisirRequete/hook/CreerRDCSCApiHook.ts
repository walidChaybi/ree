import { creationRequeteDelivrance } from "@api/appels/requeteApi";
import { CreationRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { mappingRequeteDelivrance } from "@views/common/hook/requete/DetailRequeteHook";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

interface ICreationRequeteDelivranceRDCSCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export const useCreationRequeteDelivranceRDCSC = (
  requeteRDCSC?: CreationRequeteRDCSC,
  nbTitulaires?: number
): ICreationRequeteDelivranceRDCSCResultat | undefined => {
  const [resultat, setResultat] = useState<ICreationRequeteDelivranceRDCSCResultat | undefined>();

  const { utilisateurs } = useContext(RECEContextData);
  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mappingFormulaireRDCSCVersRequeteDelivrance(requeteRDCSC, nbTitulaires);
      creationRequeteDelivrance({
        requete,
        futurStatut: requeteRDCSC.futurStatut,
        refus: requeteRDCSC.refus
      })
        .then((result: any) => {
          setResultat({
            requete: mappingRequeteDelivrance(result.body.data, utilisateurs),
            futurStatut: requeteRDCSC.futurStatut,
            refus: requeteRDCSC.refus
          });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de la création de la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDCSC]);
  return resultat;
};
