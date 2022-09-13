import {
  MiseAjourStatutCreationParams,
  useMiseAjourStatutCreation
} from "@hook/requete/creation/MiseAJourStatutCreationApiHook";
import {
  IRequetePlusAncienneResultat,
  useGetRequetePlusAncienne
} from "@hook/requete/PrendreEnChargePlusAncienneApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/routeUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface BoutonPrendreEnChargePlusAncienneCreationProps {
  typeRequete: TypeRequete;
  disabled?: boolean;
}

export const BoutonPrendreEnChargePlusAncienneCreation: React.FC<
  BoutonPrendreEnChargePlusAncienneCreationProps
> = props => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [miseAJourStatutCreationParams, setMiseAJourStatutCreationParams] =
    useState<MiseAjourStatutCreationParams | undefined>();
  const requetePlusAncienneResultat: IRequetePlusAncienneResultat | undefined =
    useGetRequetePlusAncienne(props.typeRequete, prendreEnCharge);

  useEffect(() => {
    if (requetePlusAncienneResultat) {
      if (requetePlusAncienneResultat.requete) {
        setMiseAJourStatutCreationParams({
          idRequete: requetePlusAncienneResultat.requete.idRequete,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          callback: redirectApercuRequete
        });
      } else if (!requetePlusAncienneResultat.requete) {
        messageManager.showInfoAndClose(
          getLibelle(
            "Il n'existe plus de requêtes disponibles à la prise en charge"
          )
        );
      }
      setPrendreEnCharge(false);
      setOperationEnCours(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requetePlusAncienneResultat]);

  useMiseAjourStatutCreation(miseAJourStatutCreationParams);

  const redirectApercuRequete = useCallback(() => {
    if (requetePlusAncienneResultat) {
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          requetePlusAncienneResultat.requete.idRequete
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requetePlusAncienneResultat]);

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
  BoutonPrendreEnChargePlusAncienneCreation,
  "BoutonPrendreEnChargePlusAncienneCreation"
);
