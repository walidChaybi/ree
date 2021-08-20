import React, { useEffect, useState } from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { mapAlertesActeFromDataFiche } from "../../../common/util/AlertesActeUtils";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import { BoutonAjouterAlertes } from "../../../common/widget/alertes/BoutonAjouterAlertes";
import { ListeAlertes } from "../../../common/widget/alertes/ListeAlertes";
import { IDataFicheApi } from "../hook/FichePageApiHook";
import "./scss/BandeauAlertesActe.scss";

export interface BandeauAlertesActeProps {
  dataFiche: IDataFicheApi;
  ajouterAlerte: boolean;
}

export const BandeauAlertesActe: React.FC<BandeauAlertesActeProps> = ({
  dataFiche,
  ajouterAlerte
}) => {
  const [alertes, setAlertes] = useState<IAlerte[]>([]);

  useEffect(() => {
    setAlertes(mapAlertesActeFromDataFiche(dataFiche));
  }, [dataFiche]);

  return (
    <div className="BandeauAlertesActe">
      {ajouterAlerte === true && <BoutonAjouterAlertes />}
      {alertes?.length > 0 && (
        <ListeAlertes alertes={alertes} displayReference={false} />
      )}
    </div>
  );
};

export default WithHabilitation(BandeauAlertesActe, "AlerteActe");
