import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import React, { useEffect, useState } from "react";
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
import { Protection } from "./Protection";

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
  const [estBonStatut, setEstBonStatut] = useState<boolean>(true);

  useEffect(() => {
    if (
      // @ts-ignore
      window.protectionOff ||
      location.pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url, { idRequeteParam: "" })) ||
      forcePass
    ) {
      setEstBonStatut(true);
    } else {
      setEstBonStatut(checkURL(location.pathname, statut, type, sousType));
    }
  }, [statut, type, sousType, location, forcePass]);

  return (
    <Protection
      message={"Le statut de la requête ne permet pas de la consulter sur cette page"}
      peutAfficher={estBonStatut}
    >
      {children}
    </Protection>
  );
};

export function checkURL(nomChemin: string, statut?: StatutRequete, type?: TypeRequete, sousType?: SousTypeRequete) {
  switch (type) {
    case TypeRequete.DELIVRANCE:
      return checkURLDelivrance(nomChemin, statut, sousType);
    case TypeRequete.INFORMATION:
      return checkURLInformation(nomChemin);
    default:
      return true;
  }
}

function checkURLDelivrance(pathname: string, statut?: StatutRequete, sousType?: SousTypeRequete) {
  switch (statut) {
    case StatutRequete.BROUILLON:
      return pathname.includes(
        LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, { idRequeteParam: "" })
      );
    case StatutRequete.PRISE_EN_CHARGE:
      return (
        pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, { idRequeteParam: "" })) ||
        pathname.includes(
          LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, { idRequeteParam: "" })
        )
      );
    case StatutRequete.TRANSFEREE:
    case StatutRequete.A_TRAITER:
      return pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url, { idRequeteParam: "" }));
    case StatutRequete.A_VALIDER:
    case StatutRequete.A_SIGNER:
    case StatutRequete.TRANSMISE_A_VALIDEUR:
      return (
        pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: "" })) ||
        pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, { idRequeteParam: "" }))
      );
    default:
      if (sousType && GestionnaireARetraiterDansSaga.estARetraiterSagaStatutSousType(statut, sousType)) {
        return pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: "" }));
      }

      return false;
  }
}

function checkURLInformation(pathname: string) {
  return pathname.includes(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_INFORMATION.url, { idRequeteParam: "" }));
}
