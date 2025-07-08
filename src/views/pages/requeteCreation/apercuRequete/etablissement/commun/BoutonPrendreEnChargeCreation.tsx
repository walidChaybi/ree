import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/scss/BoutonPrendreEnCharge.scss";
import { getUrlPrecedente } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router";

interface BoutonPrendreEnChargeCreationProps {
  requete?: IRequeteCreationEtablissement;
  disabled?: boolean;
  onClick?: () => void;
}

export const BoutonPrendreEnChargeCreation: React.FC<BoutonPrendreEnChargeCreationProps> = props => {
  const location = useLocation();
  const { utilisateurs, services, decrets } = useContext(RECEContextData);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [params, setParams] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();

  const setActionEtUpdateStatut = () => {
    setOperationEnCours(true);
    setParams({
      libelleAction: EStatutRequete.PRISE_EN_CHARGE,
      statutRequete: "PRISE_EN_CHARGE",
      requete: mappingUneRequeteTableauCreation(props.requete, false, utilisateurs, services),
      urlCourante: getUrlPrecedente(location.pathname),
      typeRequete: "CREATION",
      handleTraitementTermine: () => {
        if (props.onClick) {
          props.onClick();
          setOperationEnCours(false);
        }
      }
    });
  };

  useCreationActionMiseAjourStatutEtRedirectionHook(params);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !utilisateurs || !services || !decrets}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <BoutonDoubleSubmit
        onClick={setActionEtUpdateStatut}
        className="BoutonPrendreEnChargeCreation"
        disabled={props.disabled}
      >
        {"Prendre en charge"}
      </BoutonDoubleSubmit>
    </>
  );
};
