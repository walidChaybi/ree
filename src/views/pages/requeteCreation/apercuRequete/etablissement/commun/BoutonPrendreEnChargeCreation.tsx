import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/scss/BoutonPrendreEnCharge.scss";
import { getUrlPrecedente } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

interface BoutonPrendreEnChargeCreationProps {
  requete?: IRequeteCreationEtablissement;
  disabled?: boolean;
  onClick?: () => void;
}

export const BoutonPrendreEnChargeCreation: React.FC<
  BoutonPrendreEnChargeCreationProps
> = props => {
  const location = useLocation();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [params, setParams] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setOperationEnCours(true);
    setParams({
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mappingUneRequeteTableauCreation(props.requete, false),
      urlCourante: getUrlPrecedente(location.pathname),
      typeRequete: TypeRequete.CREATION,
      handleTraitementTermine: () => {
        if (props.onClick) {
          props.onClick();
          setOperationEnCours(false);
        }
      }
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <BoutonDoubleSubmit
        onClick={setActionEtUpdateStatut}
        className="BoutonPrendreEnChargeCreation"
        disabled={props.disabled}
      >
        {getLibelle("Prendre en charge")}
      </BoutonDoubleSubmit>
    </>
  );
};