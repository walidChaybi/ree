import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import WithHabilitation from "../../../../common/util/habilitation/WithHabilitation";
import messageManager from "../../../../common/util/messageManager";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../apercuRequete/commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "../hook/PrendreEnChargeAleatoirementHook";

export const BoutonPrendreEnChargeAleatoirement: React.FC = (props: any) => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [params, setParams] =
    useState<CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined>();
  const requeteAleatoireResultat: IRequeteAleatoireResultat | undefined =
    useGetRequeteAleatoire(prendreEnCharge);

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requete) {
        setParams({
          requete: requeteAleatoireResultat.requete,
          dataRequetes: [],
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

  useCreationActionMiseAjourStatutEtRmcAuto(params);

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
      {getLibelle("Prendre en charge")}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(
  BoutonPrendreEnChargeAleatoirement,
  "BoutonPrendreEnChargeAleatoirement"
);
