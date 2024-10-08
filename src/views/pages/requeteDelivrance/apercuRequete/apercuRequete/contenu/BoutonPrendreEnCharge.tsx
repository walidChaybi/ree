import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { autorisePrendreEnChargeDelivrance } from "@util/RequetesUtils";
import { getLibelle } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: IRequeteDelivrance;
  disabled?: boolean;
}

export const BoutonPrendreEnCharge: React.FC<
  BoutonPrendreEnChargeProps
> = props => {
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const [params, setParams] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete),
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      urlCourante: getUrlWithParam(location.pathname, props.requete.id),
      typeRequete: TypeRequete.DELIVRANCE
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      class="BoutonPrendreEnCharge"
      estDesactive={
        !autorisePrendreEnChargeDelivrance(
          utilisateurConnecte,
          props.requete
        ) || props.disabled
      }
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
