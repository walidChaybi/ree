import {
  MiseAjourStatutCreationParams,
  useMiseAjourStatutCreation
} from "@hook/requete/creation/MiseAJourStatutCreationApiHook";
import {
  IPrendreEnChargeRequeteSuivanteResultat,
  usePrendreEnChargeRequeteSuivanteApiHook
} from "@hook/requete/PrendreEnChargeRequeteSuivanteApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface BoutonPrendreEnChargeRequeteSuivanteProps {
  typeRequete: TypeRequete;
  disabled?: boolean;
}

export const BoutonPrendreEnChargeRequeteSuivanteCreation: React.FC<
  BoutonPrendreEnChargeRequeteSuivanteProps
> = props => {
  const history = useHistory();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [miseAJourStatutCreationParams, setMiseAJourStatutCreationParams] =
    useState<MiseAjourStatutCreationParams | undefined>();
  const requeteSuivanteAPrendreEnCharge:
    | IPrendreEnChargeRequeteSuivanteResultat
    | undefined = usePrendreEnChargeRequeteSuivanteApiHook(
    props.typeRequete,
    prendreEnCharge
  );

  useEffect(() => {
    if (requeteSuivanteAPrendreEnCharge) {
      if (requeteSuivanteAPrendreEnCharge.requete) {
        setMiseAJourStatutCreationParams({
          idRequete: requeteSuivanteAPrendreEnCharge.requete.idRequete,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          callback: redirectApercuRequete
        });
      } else if (!requeteSuivanteAPrendreEnCharge.requete) {
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
  }, [requeteSuivanteAPrendreEnCharge]);

  useMiseAjourStatutCreation(miseAJourStatutCreationParams);

  const redirectApercuRequete = useCallback(() => {
    if (requeteSuivanteAPrendreEnCharge) {
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          requeteSuivanteAPrendreEnCharge.requete.idRequete
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteSuivanteAPrendreEnCharge]);

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
  BoutonPrendreEnChargeRequeteSuivanteCreation,
  "BoutonPrendreEnChargePlusAncienneCreation"
);
