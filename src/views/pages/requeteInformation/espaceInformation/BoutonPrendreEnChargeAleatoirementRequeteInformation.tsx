import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "../../../common/hook/v2/requete/PrendreEnChargeAleatoirementHook";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import messageManager from "../../../common/util/messageManager";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../common/widget/Text";
import {
  receUrl,
  URL_MES_REQUETES_INFORMATION_APERCU_ID
} from "../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../apercuRequete/commun/hook/CreationActionMiseAjourStatutHook";

export const BoutonPrendreEnChargeAleatoirementRequeteInformation: React.FC = (
  props: any
) => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsInformation, setParamsInformation] = useState<
    CreationActionMiseAjourStatutHookParams | undefined
  >();
  const requeteAleatoireResultat:
    | IRequeteAleatoireResultat
    | undefined = useGetRequeteAleatoire(
    TypeRequete.INFORMATION,
    prendreEnCharge
  );

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requeteInformation) {
        setParamsInformation({
          requete: requeteAleatoireResultat.requeteInformation,
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          urlCourante: receUrl.getUrlCourante(history),
          callback: redirectApercuRequeteInfo
        });
      } else if (!requeteAleatoireResultat.requeteInformation) {
        messageManager.showInfoAndClose(
          getLibelle(
            "Il n'existe plus de requête disponibles à la prise en charge"
          )
        );
      }
      setPrendreEnCharge(false);
      setOperationEnCours(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteAleatoireResultat, history]);

  useCreationActionMiseAjourStatut(paramsInformation);

  const redirectApercuRequeteInfo = useCallback(() => {
    if (requeteAleatoireResultat?.requeteInformation) {
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_INFORMATION_APERCU_ID,
          requeteAleatoireResultat.requeteInformation.idRequete
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
      visible={operationEnCours}
    >
      {getLibelle("Prendre en charge requête suivante")}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(
  BoutonPrendreEnChargeAleatoirementRequeteInformation,
  "BoutonPrendreEnChargeAleatoirementRequeteInformation"
);
