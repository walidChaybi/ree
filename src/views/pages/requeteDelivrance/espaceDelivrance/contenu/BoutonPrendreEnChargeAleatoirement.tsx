import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  IRequeteAleatoireResultat,
  useGetRequeteAleatoire
} from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { receUrl } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
            "Il n'existe plus de requêtes disponibles à la prise en charge"
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
