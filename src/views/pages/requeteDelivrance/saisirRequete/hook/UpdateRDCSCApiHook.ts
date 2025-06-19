import { updateRequeteDelivrance } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { UpdateRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { useContext, useEffect, useState } from "react";
import { mappingFormulaireRDCSCVersRequeteDelivrance } from "./mappingFormulaireRDCSCVersRequeteDelivrance";

interface IUpdateRequeteDelivranceRDCSCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  libelleAction?: string;
  refus?: boolean;
}

export function useUpdateRequeteDelivranceRDCSC(
  requeteRDCSC?: UpdateRequeteRDCSC,
  nbTitulaires?: number
): IUpdateRequeteDelivranceRDCSCResultat | undefined {
  const [resultat, setResultat] = useState<IUpdateRequeteDelivranceRDCSCResultat | undefined>();

  const { utilisateurs } = useContext(RECEContextData);

  useEffect(() => {
    if (requeteRDCSC?.saisie) {
      const requete = mappingFormulaireRDCSCVersRequeteDelivrance(requeteRDCSC, nbTitulaires);
      updateRequeteDelivrance({
        idRequete: requeteRDCSC.idRequete,
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
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Une erreur est survenue lors de la mise à jour de la requête",
            error
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDCSC]);
  return resultat;
}
