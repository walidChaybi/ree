import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import LiensRECE from "../../../../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT,
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER
} from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import { INFO_PAGE_APERCU_REQUETE_INFORMATION } from "../../../../../router/infoPages/InfoPagesEspaceInformation";
import { GestionnaireARetraiterDansSaga } from "../../migration/GestionnaireARetraiterDansSaga";

interface ProtectionApercuProps {
  statut?: StatutRequete;
  type?: TypeRequete;
  sousType?: SousTypeRequete;
  forcePass?: boolean;
}

export const ProtectionApercu: React.FC<React.PropsWithChildren<ProtectionApercuProps>> = ({
  children,
  statut,
  type,
  sousType,
  forcePass
}) => {
  const location = useLocation();

  const estBonStatut: boolean = useMemo(() => {
    if (
      // @ts-ignore
      window.protectionOff ||
      LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION, location.pathname) ||
      forcePass
    ) {
      return true;
    } else {
      return checkURL(location.pathname, statut, type, sousType);
    }
  }, [statut, type, sousType, location, forcePass]);

  return estBonStatut ? <>{children}</> : <p>{"Le statut de la requête ne permet pas de la consulter sur cette page"}</p>;
};

const checkURL = (nomChemin: string, statut?: StatutRequete, type?: TypeRequete, sousType?: SousTypeRequete) => {
  switch (type) {
    case TypeRequete.DELIVRANCE:
      return checkURLDelivrance(nomChemin, statut, sousType);
    case TypeRequete.INFORMATION:
      return checkURLInformation(nomChemin);
    default:
      return true;
  }
};

const checkURLDelivrance = (pathname: string, statut?: StatutRequete, sousType?: SousTypeRequete) => {
  switch (statut) {
    case StatutRequete.BROUILLON:
      return LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER, pathname);
    case StatutRequete.PRISE_EN_CHARGE:
      return (
        LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE, pathname) ||
        LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER, pathname)
      );
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      return LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION, pathname);
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
    case StatutRequete.TRANSMISE_A_VALIDEUR:
      return (
        LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT, pathname) ||
        LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION, pathname)
      );
    default:
      if (sousType && GestionnaireARetraiterDansSaga.estARetraiterSagaStatutSousType(statut, sousType)) {
        return LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT, pathname);
      }

      return false;
  }
};

const checkURLInformation = (pathname: string) => LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_INFORMATION, pathname);
