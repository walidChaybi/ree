import {
  MiseAjourStatutCreationParams,
  useMiseAjourStatutCreation
} from "@hook/requete/creation/MiseAJourStatutCreationApiHook";
import { usePrendreEnChargeRequeteSuivanteApiHook } from "@hook/requete/PrendreEnChargeRequeteSuivanteApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BoutonPrendreEnChargeRequeteSuivanteProps {
  typeRequete: TypeRequete;
  disabled?: boolean;
}

export const BoutonPrendreEnChargeRequeteSuivanteCreation: React.FC<
  BoutonPrendreEnChargeRequeteSuivanteProps
> = props => {
  const navigate = useNavigate();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [miseAJourStatutCreationParams, setMiseAJourStatutCreationParams] =
    useState<MiseAjourStatutCreationParams | undefined>();
  const requeteSuivanteAPrendreEnCharge =
    usePrendreEnChargeRequeteSuivanteApiHook(
      props.typeRequete,
      prendreEnCharge
    );

  useEffect(() => {
    if (requeteSuivanteAPrendreEnCharge?.requete) {
      setMiseAJourStatutCreationParams({
        idRequete: requeteSuivanteAPrendreEnCharge.requete.idRequete,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        callback: redirectApercuRequete
      });
    }
    setPrendreEnCharge(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteSuivanteAPrendreEnCharge]);

  useMiseAjourStatutCreation(miseAJourStatutCreationParams);

  const redirectApercuRequete = useCallback(() => {
    if (requeteSuivanteAPrendreEnCharge) {
      navigate(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          requeteSuivanteAPrendreEnCharge.requete?.idRequete
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteSuivanteAPrendreEnCharge]);

  const onClickPrendreEnCharge = () => {
    setPrendreEnCharge(true);
  };

  return (
    <BoutonOperationEnCours
      onClick={onClickPrendreEnCharge}
      estDesactive={props.disabled}
      toileDeFondVisible={prendreEnCharge}
    >
      {getLibelle("Prendre en charge requête suivante")}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(
  BoutonPrendreEnChargeRequeteSuivanteCreation,
  "BoutonPrendreEnChargePlusAncienneCreation"
);
