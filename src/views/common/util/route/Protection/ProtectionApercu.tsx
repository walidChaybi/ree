import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeRequete } from "../../../../../model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/enum/TypeRequete";
import {
  PATH_APERCU_COURRIER,
  PATH_APERCU_REQ_DEL,
  PATH_APERCU_REQ_INFO,
  PATH_APERCU_REQ_PRISE,
  PATH_APERCU_REQ_TRAITEMENT,
  PATH_SAISIR_RDCSC,
  receUrl
} from "../../../../router/ReceUrls";
import { getLibelle } from "../../../util/Utils";
import { MigratorV1V2 } from "../../migration/MigratorV1V2";
import { Protection } from "./Protection";

interface ProtectionApercuProps {
  statut?: StatutRequete;
  type?: TypeRequete;
  sousType?: SousTypeRequete;
}

export const ProtectionApercu: React.FC<ProtectionApercuProps> = ({
  children,
  statut,
  type,
  sousType
}) => {
  const history = useHistory();
  const [estBonStatut, setEstBonStatut] = useState<boolean>(true);

  useEffect(() => {
    if (
      // @ts-ignore
      window.protectionOff ||
      receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_DEL + "/")
    ) {
      setEstBonStatut(true);
    } else {
      setEstBonStatut(checkURL(history, statut, type, sousType));
    }
  }, [statut, type, sousType, history]);

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

export function checkURL(
  history: any,
  statut?: StatutRequete,
  type?: TypeRequete,
  sousType?: SousTypeRequete
) {
  switch (type) {
    case TypeRequete.DELIVRANCE:
      return checkURLDelivrance(history, statut, sousType);
    case TypeRequete.INFORMATION:
      return checkURLInformation(history, statut);
    default:
      return true;
  }
}

function checkURLDelivrance(
  history: any,
  statut?: StatutRequete,
  sousType?: SousTypeRequete
) {
  switch (statut) {
    case StatutRequete.BROUILLON:
      return receUrl.getUrlCourante(history).includes(PATH_SAISIR_RDCSC);
    case StatutRequete.PRISE_EN_CHARGE:
      return (
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_PRISE) ||
        receUrl.getUrlCourante(history).includes(PATH_APERCU_COURRIER)
      );
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      return receUrl
        .getUrlCourante(history)
        .includes(PATH_APERCU_REQ_DEL + "/");
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
      return (
        receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_TRAITEMENT) ||
        receUrl.getUrlCourante(history).includes(PATH_APERCU_COURRIER)
      );
    default:
      if (
        sousType &&
        MigratorV1V2.estARetraiterSagaStatutSousType(statut, sousType)
      ) {
        return receUrl
          .getUrlCourante(history)
          .includes(PATH_APERCU_REQ_TRAITEMENT);
      }

      return false;
  }
}

function checkURLInformation(history: any, statut?: StatutRequete) {
  switch (statut) {
    case StatutRequete.PRISE_EN_CHARGE:
    case StatutRequete.TRANSFEREE:
    case StatutRequete.REJET:
    case StatutRequete.TRAITE_REPONDU:
      return receUrl.getUrlCourante(history).includes(PATH_APERCU_REQ_INFO);
    default:
      return false;
  }
}
