import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/scss/BoutonPrendreEnCharge.scss";
import { getUrlPrecedente } from "@util/route/routeUtil";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useState } from "react";
import { useHistory } from "react-router";

interface BoutonPrendreEnChargeCreationProps {
  requete: IRequeteCreationEtablissement;
  disabled?: boolean;
  onClick?: () => void;
}

export const BoutonPrendreEnChargeCreation: React.FC<
  BoutonPrendreEnChargeCreationProps
> = props => {
  const history = useHistory();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [params, setParams] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setOperationEnCours(true);
    setParams({
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mapRequeteCreation(props.requete),
      urlCourante: getUrlPrecedente(history.location.pathname),
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
      <Bouton
        onClick={setActionEtUpdateStatut}
        className="BoutonPrendreEnChargeCreation"
        disabled={props.disabled}
      >
        {getLibelle("Prendre en charge")}
      </Bouton>
    </>
  );
};

const mapRequeteCreation = (
  requete: IRequeteCreationEtablissement
): IRequeteTableauCreation => {
  //TODO: Vrai mapping "mappingRequeteCreationToRequeteTableau()" à faire ici quand ce sera nécessaire
  return { idRequete: requete.id } as IRequeteTableauCreation;
};
