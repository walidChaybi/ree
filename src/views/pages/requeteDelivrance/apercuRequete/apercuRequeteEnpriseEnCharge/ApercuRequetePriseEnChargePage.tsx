import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getLibelle } from "../../../../common/widget/Text";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { ApercuRequetePriseEnChargePartieDroite } from "./contenu/ApercuRequetePriseEnChargePartieDroite";

export interface DataRMCAuto {
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const history = useHistory();
  const [dataHistory] = useState<DataRMCAuto>(
    history?.location?.state as DataRMCAuto
  );

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
