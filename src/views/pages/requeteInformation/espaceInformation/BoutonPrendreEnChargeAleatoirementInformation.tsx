import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IRequeteAleatoireResultat, useGetRequeteAleatoire } from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const BoutonPrendreEnChargeAleatoirementInformation: React.FC = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [paramsInformation, setParamsInformation] = useState<ICreationActionMiseAjourStatutHookParams | undefined>();
  const requeteAleatoireResultat: IRequeteAleatoireResultat | undefined = useGetRequeteAleatoire(TypeRequete.INFORMATION, prendreEnCharge);

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requete) {
        setParamsInformation({
          requete: requeteAleatoireResultat.requete,
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          callback: redirectApercuRequeteInfo
        });
      } else if (!requeteAleatoireResultat.requete) {
        messageManager.showInfoAndClose("Il n'existe plus de requêtes disponibles à la prise en charge");
      }
      setOperationEnCours(false);
      setPrendreEnCharge(false);
    }
  }, [requeteAleatoireResultat, location]);

  useCreationActionMiseAjourStatut(paramsInformation);

  const redirectApercuRequeteInfo = useCallback(() => {
    if (requeteAleatoireResultat?.requete) {
      navigate(getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, requeteAleatoireResultat.requete.idRequete));
    }
  }, [navigate, requeteAleatoireResultat]);

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
      {"Prendre en charge requête suivante"}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(BoutonPrendreEnChargeAleatoirementInformation, "BoutonPrendreEnChargeAleatoirementInformation");
