import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "../../../common/hook/requete/PrendreEnChargeAleatoirementApiHook";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import messageManager from "../../../common/util/messageManager";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getLibelle } from "../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID } from "../../../router/ReceUrls";

export const BoutonPrendreEnChargeAleatoirementInformation: React.FC = (
  props: any
) => {
  const history = useHistory();

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [paramsInformation, setParamsInformation] = useState<
    CreationActionMiseAjourStatutHookParams | undefined
  >();
  const requeteAleatoireResultat: IRequeteAleatoireResultat | undefined =
    useGetRequeteAleatoire(TypeRequete.INFORMATION, prendreEnCharge);

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requete) {
        setParamsInformation({
          requete: requeteAleatoireResultat.requete,
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          callback: redirectApercuRequeteInfo
        });
      } else if (!requeteAleatoireResultat.requete) {
        messageManager.showInfoAndClose(
          getLibelle(
            "Il n'existe plus de requêtes disponibles à la prise en charge"
          )
        );
      }
      setOperationEnCours(false);
      setPrendreEnCharge(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteAleatoireResultat, history]);

  useCreationActionMiseAjourStatut(paramsInformation);

  const redirectApercuRequeteInfo = useCallback(() => {
    if (requeteAleatoireResultat?.requete) {
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          requeteAleatoireResultat.requete.idRequete
        )
      );
    }
  }, [history, requeteAleatoireResultat]);

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
  BoutonPrendreEnChargeAleatoirementInformation,
  "BoutonPrendreEnChargeAleatoirementInformation"
);
