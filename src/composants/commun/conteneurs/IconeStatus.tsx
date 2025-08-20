import { StatutRequete } from "@model/requete/enum/StatutRequete";
import React, { useMemo } from "react";
import { MdOutlineCreate, MdPendingActions, MdUpdate } from "react-icons/md";

interface IIconeStatutProps {
  statut?: string;
}

const IconeStatut: React.FC<IIconeStatutProps> = ({ statut }) => {
  const icone = useMemo(() => {
    switch (statut) {
      case StatutRequete.EN_TRAITEMENT.libelle:
        return (
          <MdUpdate
            className="ml-1 h-5 w-5"
            aria-hidden
          />
        );
      case StatutRequete.A_SIGNER.libelle:
        return (
          <MdOutlineCreate
            className="ml-1 h-5 w-5"
            aria-hidden
          />
        );
      case StatutRequete.PRISE_EN_CHARGE.libelle:
        return (
          <MdPendingActions
            className="ml-1 h-5 w-5"
            aria-hidden
          />
        );
      default:
        return <></>;
    }
  }, [statut]);

  return icone;
};

export default IconeStatut;
