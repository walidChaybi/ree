import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const BoutonPrendreEnChargeAleatoirementInformation: React.FC = (
  props: any
) => {
  const history = useHistory();

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [paramsInformation, setParamsInformation] = useState<
    ICreationActionMiseAjourStatutHookParams | undefined
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
