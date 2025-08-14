import { usePrendreEnChargeRequeteSuivanteApiHook } from "@hook/requete/PrendreEnChargeRequeteSuivanteApiHook";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER } from "../../../../router/infoPages/InfoPagesEspaceEtablissement";
import AfficherMessage from "../../../../utils/AfficherMessage";

interface BoutonPrendreEnChargeRequeteSuivanteProps {
  typeRequete: TypeRequete;
  disabled?: boolean;
}

const BoutonPrendreEnChargeRequeteSuivanteCreation: React.FC<BoutonPrendreEnChargeRequeteSuivanteProps> = props => {
  const navigate = useNavigate();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const { idRequete: idRequetePriseEnCharge, erreur: erreurRequetePriseEnCharge } = usePrendreEnChargeRequeteSuivanteApiHook(
    props.typeRequete,
    prendreEnCharge
  );

  useEffect(() => {
    setPrendreEnCharge(false);
    if (idRequetePriseEnCharge) {
      navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.url, { idRequeteParam: idRequetePriseEnCharge }));
    } else if (erreurRequetePriseEnCharge) {
      AfficherMessage.avertissement("Il n'existe plus de requête à prendre en charge", { fermetureAuto: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequetePriseEnCharge, erreurRequetePriseEnCharge]);

  const onClickPrendreEnCharge = () => {
    setPrendreEnCharge(true);
  };

  return (
    <BoutonOperationEnCours
      onClick={onClickPrendreEnCharge}
      estDesactive={props.disabled}
      toileDeFondVisible={prendreEnCharge}
    >
      {"Prendre en charge requête suivante"}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(BoutonPrendreEnChargeRequeteSuivanteCreation, "BoutonPrendreEnChargePlusAncienneCreation");
