import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { autorisePrendreEnChargeDelivrance } from "../../../common/util/RequetesUtils";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../common/widget/Text";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: TRequete;
}

export const BoutonPrendreEnCharge: React.FC<BoutonPrendreEnChargeProps> = props => {
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete as IRequeteDelivrance),
      dataRequetes: [],
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      urlCourante: getUrlWithParam(history.location.pathname, props.requete.id)
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  useEffect(() => {
    if (
      autorisePrendreEnChargeDelivrance(props.requete as IRequeteDelivrance)
    ) {
      setEstDisabled(false);
    }
  }, [props.requete]);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      class="BoutonPriseEnCharge"
      estDesactive={estDisabled}
    >
      {getLibelle("Prendre en charge")}
    </BoutonOperationEnCours>
  );
};

const mapRequeteRmcAuto = (requete: IRequeteDelivrance): IRequeteTableau => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  return mappingRequeteDelivranceToRequeteTableau(requete);
};
