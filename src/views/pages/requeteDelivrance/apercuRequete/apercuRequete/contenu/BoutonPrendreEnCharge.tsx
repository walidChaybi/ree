import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../../model/requete/v2/IRequeteTableauDelivrance";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../../../common/hook/v2/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { autorisePrendreEnChargeDelivrance } from "../../../../../common/util/RequetesUtils";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../../../common/widget/Text";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: IRequeteDelivrance;
}

export const BoutonPrendreEnCharge: React.FC<BoutonPrendreEnChargeProps> = props => {
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete),
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      urlCourante: getUrlWithParam(history.location.pathname, props.requete.id)
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  useEffect(() => {
    if (autorisePrendreEnChargeDelivrance(props.requete)) {
      setEstDisabled(false);
    }
  }, [props.requete]);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      class="BoutonPrendreEnCharge"
      estDesactive={estDisabled}
    >
      {getLibelle("Prendre en charge")}
    </BoutonOperationEnCours>
  );
};

const mapRequeteRmcAuto = (
  requete: IRequeteDelivrance
): IRequeteTableauDelivrance => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  return mappingRequeteDelivranceToRequeteTableau(requete);
};
