import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React, { useState } from "react";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { ApercuRequetePriseEnChargePartieDroite } from "./contenu/ApercuRequetePriseEnChargePartieDroite";

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const [requete, setRequete] = useState<IRequeteDelivrance | null>(null);

  return (
    <ApercuRequeteTemplate
      title={"Aperçu de la requête en prise en charge"}
      setRequete={setRequete}
    >
      {requete && (
        <div className="ApercuRequetePriseEnCharge">
          <ApercuRequetePriseEnChargePartieDroite detailRequete={requete} />
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
