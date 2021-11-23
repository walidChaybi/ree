import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "../../../../common/hook/v2/requete/PrendreEnChargeAleatoirementHook";
import WithHabilitation from "../../../../common/util/habilitation/WithHabilitation";
import messageManager from "../../../../common/util/messageManager";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../apercuRequete/commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";

export const BoutonPrendreEnChargeAleatoirement: React.FC = (props: any) => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsDelivrance, setParamsDelivrance] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const requeteAleatoireResultat:
    | IRequeteAleatoireResultat
    | undefined = useGetRequeteAleatoire(
    TypeRequete.DELIVRANCE,
    prendreEnCharge
  );

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requeteDelivrance) {
        setParamsDelivrance({
          requete: requeteAleatoireResultat.requeteDelivrance,
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          urlCourante: receUrl.getUrlCourante(history)
        });
      } else if (!requeteAleatoireResultat.requeteDelivrance) {
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
      visible={operationEnCours}
    >
      {getLibelle("Prendre en charge requête suivante")}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(
  BoutonPrendreEnChargeAleatoirement,
  "BoutonPrendreEnChargeAleatoirement"
);
