import { usePrendreEnChargeRequeteSuivanteApiHook } from "@hook/requete/PrendreEnChargeRequeteSuivanteApiHook";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
      navigate(getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID, idRequetePriseEnCharge));
    } else if (erreurRequetePriseEnCharge) {
      messageManager.showWarningAndClose("Il n'existe plus de requête à prendre en charge");
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
