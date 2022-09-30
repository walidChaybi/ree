import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/scss/BoutonPrendreEnCharge.scss";
import { getUrlPrecedente } from "@util/route/routeUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useState } from "react";
import { useHistory } from "react-router";

interface BoutonPrendreEnChargeCreationProps {
  requete: IRequeteCreation;
  disabled?: boolean;
}

export const BoutonPrendreEnChargeCreation: React.FC<
  BoutonPrendreEnChargeCreationProps
> = props => {
  const history = useHistory();
  const [params, setParams] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mapRequeteCreation(props.requete),
      urlCourante: getUrlPrecedente(history.location.pathname),
      typeRequete: TypeRequete.CREATION
    });
  };
  useCreationActionMiseAjourStatutEtRmcAuto(params);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      class="BoutonPrendreEnChargeCreation"
      estDesactive={props.disabled}
    >
      {getLibelle("Prendre en charge")}
    </BoutonOperationEnCours>
  );
};

const mapRequeteCreation = (
  requete: IRequeteCreation
): IRequeteTableauCreation => {
  //TODO: Vrai mapping "mappingRequeteCreationToRequeteTableau()" à faire ici quand ce sera nécessaire
  return { idRequete: requete.id } as IRequeteTableauCreation;
};
