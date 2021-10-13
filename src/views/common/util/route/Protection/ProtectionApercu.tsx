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
      setEstBonStatut(checkURLEnFonctionDuStatut(statut, history));
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
export function checkURLEnFonctionDuStatut(
  statut: StatutRequete | undefined,
  history: any
) {
  switch (statut) {
    case StatutRequete.BROUILLON:
      return receUrl.getUrlCourante(history).includes(PATH_SAISIR_RDCSC);
    case StatutRequete.PRISE_EN_CHARGE:
      return (
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_PRISE) ||
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_COURRIER)
      );
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      return receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ + "/");
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
      return (
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_TRAITEMENT) ||
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_COURRIER)
      );
    default:
      return true;
  }
}
