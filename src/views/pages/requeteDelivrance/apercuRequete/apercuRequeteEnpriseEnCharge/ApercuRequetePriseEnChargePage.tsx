import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle } from "@util/Utils";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { ApercuRequetePriseEnChargePartieDroite } from "./contenu/ApercuRequetePriseEnChargePartieDroite";

export interface DataRMCAuto {
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const location = useLocation();
  const [dataHistory] = useState<DataRMCAuto>(location.state as DataRMCAuto);

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu de la requête en prise en charge")}
      setRequeteCallback={setRequeteCallback}
    >
      {requete && (
        <div className="ApercuRequetePriseEnCharge">
          <ApercuRequetePriseEnChargePartieDroite
            detailRequete={requete}
            dataHistory={dataHistory}
          />
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
