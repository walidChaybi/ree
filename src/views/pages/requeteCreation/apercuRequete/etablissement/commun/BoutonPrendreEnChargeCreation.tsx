import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/scss/BoutonPrendreEnCharge.scss";
import { getUrlPrecedente } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
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
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mappingUneRequeteTableauCreation(props.requete, false, utilisateurs, services),
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
        {getLibelle("Prendre en charge")}
      </BoutonDoubleSubmit>
    </>
  );
};
