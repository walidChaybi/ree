import { StatutRequete } from "@model/requete/enum/StatutRequete";
import PendingActions from "@mui/icons-material/PendingActions";
import Update from "@mui/icons-material/Update";
import React, { useMemo } from "react";

interface IIconeStatutProps {
  statut?: string;
}

const IconeStatut: React.FC<IIconeStatutProps> = ({ statut }) => {
  const icone = useMemo(() => {
    switch (statut) {
      case StatutRequete.EN_TRAITEMENT.libelle:
        return <Update className="ml-1 inline-block h-5 w-5" />;
      case StatutRequete.A_SIGNER.libelle:
        return <PendingActions className="ml-1 inline-block h-5 w-5" />;
      default:
        return <></>;
    }
  }, [statut]);

  return icone;
};

export default IconeStatut;
