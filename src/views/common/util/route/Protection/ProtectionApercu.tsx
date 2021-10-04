import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import {
  PATH_APERCU_REQ,
  PATH_APERCU_REQ_COURRIER,
  PATH_APERCU_REQ_PRISE,
  PATH_APERCU_REQ_TRAITEMENT,
  PATH_SAISIR_RDCSC,
  receUrl
} from "../../../../router/ReceUrls";
import { getLibelle } from "../../../widget/Text";
import { Protection } from "./Protection";

interface ProtectionApercuProps {
  statut?: StatutRequete;
}

export const ProtectionApercu: React.FC<ProtectionApercuProps> = ({
  children,
  statut
}) => {
  const history = useHistory();
  const [estBonStatut, setEstBonStatut] = useState<boolean>(true);

  useEffect(() => {
    if (
      // @ts-ignore
      window.protectionOff ||
      receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ + "/")
    ) {
      setEstBonStatut(true);
    } else {
      checkURLEnFonctionDuStatut(statut, setEstBonStatut, history);
    }
  }, [statut, history]);

  return (
    <Protection
      message={getLibelle(
        "Le statut de la requête ne permet pas de la consulter sur cette page"
      )}
      peutAfficher={estBonStatut}
    >
      {children}
    </Protection>
  );
};
function checkURLEnFonctionDuStatut(
  statut: StatutRequete | undefined,
  setEstBonStatut: React.Dispatch<React.SetStateAction<boolean>>,
  history: any
) {
  switch (statut) {
    case StatutRequete.BROUILLON:
      setEstBonStatut(
        receUrl.getUrlCourante(history).includes(PATH_SAISIR_RDCSC)
      );
      break;
    case StatutRequete.PRISE_EN_CHARGE:
      setEstBonStatut(
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_PRISE) ||
          receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_COURRIER)
      );
      break;
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      setEstBonStatut(
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ + "/")
      );
      break;
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
      setEstBonStatut(
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_TRAITEMENT) ||
          receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_COURRIER)
      );
      break;
    default:
      setEstBonStatut(true);
  }
}
