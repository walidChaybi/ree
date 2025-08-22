import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { IRequeteAleatoireResultat, useGetRequeteAleatoire } from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AfficherMessage from "../../../../../utils/AfficherMessage";

const BoutonPrendreEnChargeAleatoirement: React.FC = (props: any) => {
  const location = useLocation();

  const [prendreEnCharge, setPrendreEnCharge] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsDelivrance, setParamsDelivrance] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const requeteAleatoireResultat: IRequeteAleatoireResultat | undefined = useGetRequeteAleatoire(TypeRequete.DELIVRANCE, prendreEnCharge);

  useEffect(() => {
    if (requeteAleatoireResultat) {
      if (requeteAleatoireResultat.requete) {
        setParamsDelivrance({
          requete: requeteAleatoireResultat.requete,
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          urlCourante: location.pathname,
          typeRequete: "DELIVRANCE"
        });
      } else if (!requeteAleatoireResultat.requete) {
        AfficherMessage.info("Il n'existe plus de requêtes disponibles à la prise en charge", { fermetureAuto: true });
      }
      setPrendreEnCharge(false);
      setOperationEnCours(false);
    }
  }, [requeteAleatoireResultat, location]);

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsDelivrance);

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

export default WithHabilitation(BoutonPrendreEnChargeAleatoirement, "BoutonPrendreEnChargeAleatoirement");
