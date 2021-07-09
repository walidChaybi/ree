import { useEffect, useState } from "react";
import { updateRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { logError } from "../../../common/util/LogManager";
import messageManager from "../../../common/util/messageManager";
import { getLibelle } from "../../../common/widget/Text";
import { UpdateRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";
import { mapRequeteDelivrance } from "./SaisirRDCSCApiHook";

export interface IUpdateRequeteDelivranceRDCSCResultat {
  idRequete: string;
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
      const requete = mapRequeteDelivrance(requeteRDCSC);

      updateRequeteDelivrance({
        idRequete: requeteRDCSC.idRequete,
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
          messageManager.showSuccessAndClose(
            getLibelle("La requête a bien été enregistrée")
          );
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
