import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { autorisePrendreEnChargeDelivrance } from "@util/RequetesUtils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useContext, useState } from "react";
import { RECEContextData } from "../../../../../../contexts/RECEContextProvider";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "../../../../../common/hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: IRequeteDelivrance;
  disabled?: boolean;
}

export const BoutonPrendreEnCharge: React.FC<BoutonPrendreEnChargeProps> = props => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  const [params, setParams] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete),
      libelleAction: EStatutRequete.PRISE_EN_CHARGE,
      statutRequete: "PRISE_EN_CHARGE",
      typeRequete: "DELIVRANCE"
    });
  };

  useCreationActionMiseAjourStatutEtRedirectionHook(params);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      class="BoutonPrendreEnCharge"
      estDesactive={!autorisePrendreEnChargeDelivrance(utilisateurConnecte, props.requete) || props.disabled}
    >
      {"Prendre en charge"}
    </BoutonOperationEnCours>
  );
};

const mapRequeteRmcAuto = (requete: IRequeteDelivrance): IRequeteTableauDelivrance => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  return mappingRequeteDelivranceToRequeteTableau(requete);
};
