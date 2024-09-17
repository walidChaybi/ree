import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  PATH_APERCU_REQ_DEL,
  PATH_APERCU_REQ_INFO,
  PATH_APERCU_REQ_PRISE,
  PATH_APERCU_REQ_TRAITEMENT,
  PATH_EDITION,
  PATH_MODIFIER_RDCSC,
  PATH_SAISIR_RDCSC
} from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GestionnaireARetraiterDansSaga } from "../../migration/GestionnaireARetraiterDansSaga";
import { Protection } from "./Protection";

interface ProtectionApercuProps {
  statut?: StatutRequete;
  type?: TypeRequete;
  sousType?: SousTypeRequete;
  forcePass?: boolean;
}

export const ProtectionApercu: React.FC<
  React.PropsWithChildren<ProtectionApercuProps>
> = ({ children, statut, type, sousType, forcePass }) => {
  const location = useLocation();
  const [estBonStatut, setEstBonStatut] = useState<boolean>(true);

  useEffect(() => {
    if (
      // @ts-ignore
      window.protectionOff ||
      location.pathname.includes(`${PATH_APERCU_REQ_DEL}/`) ||
      forcePass
    ) {
      setEstBonStatut(true);
    } else {
      setEstBonStatut(checkURL(location.pathname, statut, type, sousType));
    }
  }, [statut, type, sousType, location, forcePass]);

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
  nomChemin: string,
  statut?: StatutRequete,
  type?: TypeRequete,
  sousType?: SousTypeRequete
) {
  switch (type) {
    case TypeRequete.DELIVRANCE:
      return checkURLDelivrance(nomChemin, statut, sousType);
    case TypeRequete.INFORMATION:
      return checkURLInformation(nomChemin);
    default:
      return true;
  }
}

function checkURLDelivrance(
  pathname: string,
  statut?: StatutRequete,
  sousType?: SousTypeRequete
) {
  switch (statut) {
    case StatutRequete.BROUILLON:
      return pathname.includes(PATH_SAISIR_RDCSC);
    case StatutRequete.PRISE_EN_CHARGE:
      return (
        pathname.includes(PATH_APERCU_REQ_PRISE) ||
        pathname.includes(PATH_MODIFIER_RDCSC)
      );
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      return pathname.includes(`${PATH_APERCU_REQ_DEL}/`);
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
    case StatutRequete.TRANSMISE_A_VALIDEUR:
      return (
        pathname.includes(PATH_APERCU_REQ_TRAITEMENT) ||
        pathname.includes(PATH_EDITION)
      );
    default:
      if (
        sousType &&
        GestionnaireARetraiterDansSaga.estARetraiterSagaStatutSousType(
          statut,
          sousType
        )
      ) {
        return pathname.includes(PATH_APERCU_REQ_TRAITEMENT);
      }

      return false;
  }
}

function checkURLInformation(pathname: string) {
  return pathname.includes(PATH_APERCU_REQ_INFO);
}
