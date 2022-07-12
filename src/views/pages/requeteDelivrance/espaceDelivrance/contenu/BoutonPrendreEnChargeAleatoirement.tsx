import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/enum/TypeRequete";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "../../../../common/hook/requete/PrendreEnChargeAleatoirementHook";
import WithHabilitation from "../../../../common/util/habilitation/WithHabilitation";
import messageManager from "../../../../common/util/messageManager";
import { getLibelle } from "../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
import { receUrl } from "../../../../router/ReceUrls";

export const BoutonPrendreEnChargeAleatoirement: React.FC = (props: any) => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsDelivrance, setParamsDelivrance] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const requeteAleatoireResultat: IRequeteAleatoireResultat | undefined =
    useGetRequeteAleatoire(TypeRequete.DELIVRANCE, prendreEnCharge);

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requete) {
        setParamsDelivrance({
          requete: requeteAleatoireResultat.requete,
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          urlCourante: receUrl.getUrlCourante(history)
        });
      } else if (!requeteAleatoireResultat.requete) {
        messageManager.showInfoAndClose(
          getLibelle(
            "Il n'existe plus de requête disponibles à la prise en charge"
          )
        );
      }
      setPrendreEnCharge(false);
      setOperationEnCours(false);
    }
  }, [requeteAleatoireResultat, history]);

  useCreationActionMiseAjourStatutEtRmcAuto(paramsDelivrance);

  const onClickPrendreEnCharge = () => {
    setPrendreEnCharge(true);
    setOperationEnCours(true);
  };

  return (
    <BoutonOperationEnCours
      onClick={onClickPrendreEnCharge}
      estDesactive={props.disabled}
      toileDeFondVisible={operationEnCours}
    >
      {getLibelle("Prendre en charge requête suivante")}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(
  BoutonPrendreEnChargeAleatoirement,
  "BoutonPrendreEnChargeAleatoirement"
);
